const core = require("@actions/core")
const fs = require("fs")
const glob = require("glob")

/**
 * @param {string} localRoot
 * @returns {Promise<string[][]>}
 */
exports.readFiles = localRoot => new Promise((resolve, reject) => {
  core.info(`ℹ️ Reading files for path: ${localRoot}`)

  glob(localRoot + "/**/*", (error, result) => {
    if (error) reject (error)

    let files = []
    result.forEach(path => {
      if (fs.lstatSync(path).isFile()) {
        let file = path.replace(localRoot, "")
        if (file.startsWith("/")) file = file.substr(1, file.length - 1)
        files.push([file, path])
      }
    })

    resolve(files)
  })
})
