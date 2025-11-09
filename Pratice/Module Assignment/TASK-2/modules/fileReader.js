// modules/fileReader.js
const fs = require('fs');

function readData(filename) {
  if (fs.existsSync(filename)) {
    const data = fs.readFileSync(filename, 'utf8');
    console.log(`File contents of ${filename}:`);
    console.log(data);
  } else {
    console.log(`${filename} does not exist.`);
  }
}

module.exports = readData;
