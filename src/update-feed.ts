import { BeeClient, Reference } from "@etherna/sdk-js/clients"

type UpdateFeedConfig = {
  bee: BeeClient
  topicName: string
  type: "epoch" | "sequence"
  reference: Reference
  batchId: string
}

export async function updateFeed({ bee, batchId, reference, topicName, type }: UpdateFeedConfig) {
  const feed = bee.feed.makeFeed(topicName, bee.signer!.address, type)
  const feedWriter = bee.feed.makeWriter(feed)

  await feedWriter.upload(reference, {
    batchId,
  })

  return await bee.feed.createRootManifest(feed, {
    batchId,
  })
}
