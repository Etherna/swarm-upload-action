import * as core from "@actions/core"
import { Bee } from "@ethersphere/bee-js"

import { updateFeed } from "./update-feed"

export async function run() {
  const localRoot = core.getInput("localRoot").replace(/\/$/, "")
  const gateway = core.getInput("gateway").replace(/\/$/, "")
  const defaultPath = core.getInput("defaultPath")
  const errorPath = core.getInput("errorPath")
  const batchId = core.getInput("batchId")

  const bee = new Bee(gateway)

  let siteHash = null

  /**
   * 1 - Upload folder
   */

  try {
    core.info("Uploading local folder to swarm...")

    // Upload
    const uploadResult = await bee.uploadFilesFromDirectory(batchId, localRoot, {
      indexDocument: defaultPath,
      errorDocument: errorPath,
    })
    siteHash = uploadResult.reference

    core.info(`✅ App deployed to ${gateway}/bzz/${siteHash}`)
  } catch (error) {
    core.error("❌ Failed to upload to swarm");
    core.setFailed(error.message)
  }

  /**
   * 2 - Updated feed
   */

  const feedName = core.getInput("feedName")
  const feedUserPrivateKey = core.getInput("feedUserPrivateKey")

  const canUpdateFeed = feedName && feedUserPrivateKey

  if (!canUpdateFeed) return

  try {
    const feedManifest = await updateFeed(bee, feedName, siteHash, batchId, feedUserPrivateKey)

    core.info(`✅ Feed updated. Url: ${gateway}/bzz/${feedManifest}`)
  } catch (error) {
    core.error("❌ Failed to update feed");
    core.setFailed(error.message)
  }
}