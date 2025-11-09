// modules/fileChecker.js
const fs = require('fs');

function fileExists(filename) {
  return fs.existsSync(filename);
}

module.exports = fileExists;
