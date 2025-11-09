// Create a basic HTTP server that returns “Server is Running Successfully”.

const http = require("http");

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Server is Running Successfully");
// });

// server.listen(10000, () => {
//   console.log("Server is Running Successfully");
// });


// Create a server that returns JSON data when accessed from the browser.

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(data));
// });

// server.listen(10000, () => {
//   console.log("Server is Running Successfully");
// });

// const data = {
//     name : "Ghag Deep Pravin",
//     message : "Hello , I am Full Stack Developer"
// }



// const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.method === 'GET') {
    const time = new Date().toString();
    fs.appendFileSync('log.txt', time + '\n');
    res.end('Date and time saved!\n');
  } else {
    res.end('Only GET requests are allowed.\n');
  }
}).listen(10000);

console.log('Server running SuccessFully');
