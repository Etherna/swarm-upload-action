// import { utils } from "ethers"
import type { Bee, Reference } from "@ethersphere/bee-js"
import { privateToAddress } from "./address"

export async function updateFeed(bee: Bee, name: string, reference: Reference, batchId: string, privateKey: string) {
  const topic = bee.makeFeedTopic(name)
  const fixedPrivateKey = privateKey.replace(/^(0x)?/, "0x")
  const feedWriter = bee.makeFeedWriter("sequence", topic, fixedPrivateKey)
  await feedWriter.upload(batchId, reference)
  return await bee.createFeedManifest(batchId, "sequence", topic, privateToAddress(fixedPrivateKey))
}