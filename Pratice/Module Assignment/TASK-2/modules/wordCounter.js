// modules/wordCounter.js
function countWords(text) {
  const words = text.trim().split(/\s+/);
  return words.length;
}

module.exports = countWords;
