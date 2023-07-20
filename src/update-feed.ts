import { BeeClient, Reference } from "@etherna/api-js/clients"

export async function updateFeed(
  bee: BeeClient,
  name: string,
  reference: Reference,
  batchId: string
) {
  const feed = bee.feed.makeFeed(name, bee.signer!.address, "sequence")
  const feedWriter = bee.feed.makeWriter(feed)

  await feedWriter.upload(reference, {
    batchId,
  })

  return await bee.feed.createRootManifest(feed, {
    batchId,
  })
}
