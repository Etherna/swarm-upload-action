const fs = require("fs")
const mimetypes = require("mime-types")

/**
 * @param {string[][]} files
 * @param {string} localRoot
 * @param {string} defaultPath
 * @returns {object}
 */
exports.prepareFormData = (files, localRoot, defaultPath) => {
  let data = {}

  if (defaultPath) {
    const filePath = `${localRoot}/${defaultPath}`
    const contentType = mimetypes.lookup(filePath)
    data[""] = {
      data: fs.readFileSync(filePath),
      contentType,
    }
  }

  files.forEach(fileInfo => {
    const [fileName, filePath] = fileInfo
    const contentType = mimetypes.lookup(filePath)
    const data = fs.readFileSync(filePath)

    data[fileName] = {
      data,
      contentType
    }

    if (/\/index\.html$/.test(fileName)) {
      const defaultFileName = fileName.replace(/\/index\.html$/, "/")
      data[defaultFileName] = {
        data,
        contentType
      }
    }
  })

  return data
}
