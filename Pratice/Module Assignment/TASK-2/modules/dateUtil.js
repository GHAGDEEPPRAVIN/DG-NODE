// modules/dateUtil.js
function getTodayDate() {
  return new Date().toLocaleDateString();
}

function getCurrentTime() {
  return new Date().toLocaleTimeString();
}

module.exports = { getTodayDate, getCurrentTime };
