import { FolderBuilder } from "@etherna/api-js/classes"
import { stat, readFile } from "node:fs/promises"
import { glob } from "glob"
import { lookup } from "mime-types"

export default class WebsiteBuilder extends FolderBuilder {
  async loadFolder(path: string) {
    const files = await glob(path + "/**/*", { nodir: true })
    for (const file of files) {
      const size = (await stat(file)).size
      this.bytesTotal += size
    }
    for (const file of files) {
      const data = await readFile(file)
      const filename = file.split("/").pop()!
      const contentType = lookup(filename) || null
      const relativePath = file.replace(path, "").replace(/^\//, "")
      this.addFile(data, filename, relativePath, contentType)
    }
  }
}
