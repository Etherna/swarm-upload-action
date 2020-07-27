const core = require("@actions/core")
const { BzzNode } = require("@erebos/swarm-node")

const { readFiles } = require("./readFiles")
const { prepareFormData } = require("./prepareFormData")
const { updateFeed } = require("./updateFeed")

exports.run = async () => {
  const localRoot = core.getInput("localRoot").replace(/\/$/, "")
  const gateway = core.getInput("gateway").replace(/\/$/, "")
  const defaultPath = core.getInput("defaultPath")

  const bzz = new BzzNode({ url: gateway })

  let manifest = null

  /**
   * 1 - Upload folder
   */

  try {
    core.info("Uploading local folder to swarm...")

    // Prepare files to upload
    const files = await readFiles(localRoot)
    const data = prepareFormData(files, localRoot, defaultPath)

    // Upload
    manifest = await bzz.uploadDirectory(data)

    core.info(`✅ App deployed to ${gateway}/bzz:/${manifest}`)
  } catch (error) {
    core.error("❌ Failed to upload to swarm");
    core.setFailed(error.message)
  }

  /**
   * 2 - Updated feed
   */

  const feedTopic = core.getInput("feedTopic")
  const feedName = core.getInput("feedName")
  const feedUserPrivateKey = core.getInput("feedUserPrivateKey")

  const canUpdateFeed = (feedTopic || feedName) && feedUserPrivateKey

  if (!canUpdateFeed) return

  try {
    const feedManifest = await updateFeed(gateway, feedTopic, feedName, feedUserPrivateKey, manifest)

    core.info(`✅ Feed updated. Url: ${gateway}/bzz:/${feedManifest}`)
  } catch (error) {
    core.error("❌ Failed to update feed");
    core.setFailed(error.message)
  }
}