const { BzzNode } = require("@erebos/bzz-node")
const { BzzFeed } = require("@erebos/bzz-feed")
const { pubKeyToAddress } = require("@erebos/keccak256")
const { createKeyPair, sign } = require("@erebos/secp256k1")

/**
 * @param {string} gateway
 * @param {string} topic
 * @param {string} name
 * @param {string} privateKey
 * @param {string} manifest
 * @returns {string}
 */
exports.updateFeed = async (gateway, topic, name, privateKey, manifest) => {
  const keyPair = createKeyPair(privateKey)
  const user = pubKeyToAddress(keyPair.getPublic("array"))
  const signBytes = async bytes => sign(bytes, keyPair)

  const bzz = new BzzNode({ url: gateway })
  const bzzFeed = new BzzFeed({ bzz, signBytes })

  const feed = { topic, name, user }

  const resp = await bzzFeed.setContentHash(feed, manifest)
  const feedManifest = await resp.json()

  return feedManifest
}