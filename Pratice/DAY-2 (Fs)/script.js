const fs = require("fs")

fs.writeFileSync("index.html","<html><head><title>Intro to Fs</title></head><body><h1>Introduction to the Fs (File System)</h1></body></html>")

fs.readFileSync("index.html", "utf8")