// modules/logger.js
const fs = require('fs');

function log(message) {
  const logMessage = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync('log.txt', logMessage);
  console.log('Logged:', message);
}

module.exports = log;
