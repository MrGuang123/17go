const fs = require('fs')

module.exports = {
  isExists: fileName => {
    return fs.existsSync(fileName)
  }
}