const fs = require("fs");

// Create a new file and write some text inside it.
fs.writeFileSync("index.html","<html><head><title>Module Assignment</title></head><body>Introduction to Node.js</body></html>")
fs.writeFileSync("notes.js","Hello Node Js !")

// Read the content of a file and display it in the console.
const data = fs.readFileSync("index.html", "utf8");
console.log(data);

// Append new content to an existing file.
fs.appendFileSync("index.html", "\nLearning Modules in Node.js");

// Delete a specific file.
fs.unlinkSync("notes.js");