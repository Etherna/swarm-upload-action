import Tar from "tar-js"
import { glob } from "glob"
import { readFileSync } from "node:fs"

export async function prepareData(rootFolder: string) {
  const collection = (await glob(rootFolder + "/**/*", { nodir: true })).map(
    (file) => ({
      path: file.replace(rootFolder, "").replace(/^\//, ""),
      data: new Uint8Array(readFileSync(file)),
    })
  )
  const tarData = makeTar(collection)

  return tarData
}

function fixUnicodePath(path: string) {
  const codes = new TextEncoder().encode(path)

  return {
    length: codes.length,
    charCodeAt: (index: number) => codes[index],
  } as string
}

function makeTar(collection: any[]) {
  const tar = new Tar(1)
  for (const entry of collection) {
    const path = fixUnicodePath(entry.path)
    tar.append(path, entry.data)
  }

  return tar.out
}
