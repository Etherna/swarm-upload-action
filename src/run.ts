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
  const feedUserPrivateKey = core
    .getInput("feedUserPrivateKey")
    ?.replace(/^(0x)?/, "0x")

  const accessToken = ethernaApiKey
    ? await apikeySignin(ethernaApiKey)
    : undefined

  const axiosInstance = axios.create({
    baseURL: gatewayUrl,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    },
  })
  const bee = new BeeClient(gatewayUrl, {
    axios: axiosInstance,
    signer: feedUserPrivateKey,
  })

  let siteHash = null

  /**
   * 1 - Upload folder
   */

  try {
    core.info("Uploading local folder to swarm...")

    // Upload
    const data = await prepareData(localRoot)
    const response = await axiosInstance.post<{ reference: Reference }>(
      `bzz`,
      data,
      {
        responseType: "json",
        headers: {
          "content-type": "application/x-tar",
          "swarm-collection": "true",
          "swarm-index-document": defaultPath,
          "swarm-error-document": errorPath,
          "swarm-postage-batch-id": batchId,
        },
      }
    )

    siteHash = response.data.reference

    core.info(`✅ App deployed to ${gatewayUrl}/bzz/${siteHash}`)
  } catch (error) {
    core.error("❌ Failed to upload to swarm")
    core.setFailed(error.message)
  }

  /**
   * 2 - Updated feed
   */

  const canUpdateFeed = feedName && feedUserPrivateKey

  if (!canUpdateFeed) return

  try {
    const feedManifest = await updateFeed(bee, feedName, siteHash, batchId)

    core.info(`✅ Feed updated. Url: ${gatewayUrl}/bzz/${feedManifest}`)
  } catch (error) {
    core.error("❌ Failed to update feed")
    core.setFailed(error.message)
  }
}
