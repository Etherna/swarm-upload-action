import * as core from "@actions/core"
import { BatchId, BeeClient, Reference } from "@etherna/api-js/clients"
import axios from "axios"

import { updateFeed } from "./update-feed"
import apikeySignin from "./apikey-signin"
import { prepareData } from "./prepare"

export async function run() {
  const localRoot = core.getInput("localRoot").replace(/\/$/, "")
  const gatewayUrl = core.getInput("gateway").replace(/\/$/, "")
  const ethernaApiKey = core.getInput("ethernaApiKey")
  const defaultPath = core.getInput("defaultPath")
  const errorPath = core.getInput("errorPath")
  const batchId = core.getInput("batchId") as BatchId
  const feedName = core.getInput("feedName")
  const feedOwnerPrivateKey = core.getInput("feedOwnerPrivateKey")?.replace(/^(0x)?/, "0x")

  const signinResponse = ethernaApiKey ? await apikeySignin(ethernaApiKey) : null

  if (!batchId) {
    core.error("❌ Missing batchId")
    core.setFailed("Missing batchId")
    return
  }
  if (!localRoot) {
    core.error("❌ Missing localRoot")
    core.setFailed("Missing localRoot")
    return
  }
  if (!gatewayUrl) {
    core.error("❌ Missing gateway url")
    core.setFailed("Missing gateway url")
    return
  }
  if (gatewayUrl === "https://gateway.etherna.io" && !ethernaApiKey) {
    core.error("❌ Missing ethernaApiKey")
    core.setFailed("Missing ethernaApiKey")
    return
  }

  if (ethernaApiKey && !signinResponse) {
    core.error("❌ Failed to sign in with apikey")
    core.setFailed("Failed to sign in with apikey")
    return
  }

  const { accessToken, managedPrivateKey } = signinResponse ?? {
    accessToken: undefined,
    managedPrivateKey: undefined,
  }

  const ownerPrivateKey = managedPrivateKey || feedOwnerPrivateKey

  const axiosInstance = axios.create({
    baseURL: gatewayUrl,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
  })
  const bee = new BeeClient(gatewayUrl, {
    axios: axiosInstance,
    signer: ownerPrivateKey,
  })

  let siteHash = null

  /**
   * 1 - Upload folder
   */

  try {
    core.info("Uploading local folder to swarm...")

    // Upload
    const data = await prepareData(localRoot)
    const response = await axiosInstance.post<{ reference: Reference }>(`bzz`, data, {
      responseType: "json",
      headers: {
        "content-type": "application/x-tar",
        "swarm-collection": "true",
        "swarm-index-document": defaultPath,
        "swarm-error-document": errorPath,
        "swarm-postage-batch-id": batchId,
      },
    })

    siteHash = response.data.reference

    core.info(`✅ App deployed to ${gatewayUrl}/bzz/${siteHash}`)
  } catch (error: any) {
    core.error("❌ Failed to upload to swarm")
    core.setFailed(error.message)
  }

  /**
   * 2 - Updated feed
   */

  const canUpdateFeed = feedName && ownerPrivateKey

  if (!canUpdateFeed || !siteHash) return

  try {
    const feedManifest = await updateFeed(bee, feedName, siteHash, batchId)

    core.info(`✅ Feed updated. Url: ${gatewayUrl}/bzz/${feedManifest}`)
  } catch (error: any) {
    core.error("❌ Failed to update feed")
    core.setFailed(error.message)
  }
}
