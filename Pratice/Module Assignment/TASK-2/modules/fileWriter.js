// modules/fileWriter.js
const fs = require('fs');

function writeData(filename, data) {
  fs.writeFileSync(filename, data, 'utf8');
  console.log(`Data written to ${filename}`);
}

module.exports = writeData;
