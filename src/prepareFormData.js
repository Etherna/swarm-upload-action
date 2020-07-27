const fs = require("fs")
const mimetypes = require("mime-types")

/**
 * @param {string[][]} files
 * @param {string} localRoot
 * @param {string} defaultPath
 * @returns {object}
 */
exports.prepareFormData = (files, localRoot, defaultPath) => {
  let formData = {}

  if (defaultPath) {
    const filePath = `${localRoot}/${defaultPath}`
    const contentType = mimetypes.lookup(filePath)
    formData[""] = {
      data: fs.readFileSync(filePath),
      contentType,
    }
  }

  files.forEach(fileInfo => {
    const [fileName, filePath] = fileInfo
    const contentType = mimetypes.lookup(filePath)
    const data = fs.readFileSync(filePath)

    formData[fileName] = {
      data,
      contentType
    }

    if (/\/index\.html$/.test(fileName)) {
      const defaultFileName = fileName.replace(/\/index\.html$/, "/")
      formData[defaultFileName] = {
        data,
        contentType
      }
    }
  })

  return formData
}
