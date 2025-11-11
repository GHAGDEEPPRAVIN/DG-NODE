const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5000;
const LOG_DIR = path.join(__dirname, "logs");
const LOG_FILE = path.join(LOG_DIR, "server.log");

// Ensure logs folder exists
fs.mkdirSync(LOG_DIR, { recursive: true });

// JSON data for /data route
const data = {
  "address": {
    "geolocation": { "lat": "-37.3159", "long": "81.1496" },
    "city": "kilcoole",
    "street": "new road",
    "number": 7682,
    "zipcode": "12926-3874"
  },
  "id": 1,
  "email": "john@gmail.com",
  "username": "johnd",
  "password": "m38rmF$",
  "name": { "firstname": "john", "lastname": "doe" },
  "phone": "1-570-236-7033",
  "__v": 0
};

// Helper to serve HTML files
function serveFile(res, filePath, statusCode = 200) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
    } else {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.end(content);
    }
  });
}

// Helper to log requests
function logRequest(req) {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) console.error("Error writing log:", err);
  });
}

// Create server
const server = http.createServer((req, res) => {
  logRequest(req); // log each request

  const route = req.url;

  if (route === "/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data, null, 2));
  } else if (route === "/") {
    serveFile(res, path.join(__dirname, "index.html"));
  } else if (route === "/about") {
    serveFile(res, path.join(__dirname, "about.html"));
  } else if (route === "/contact") {
    serveFile(res, path.join(__dirname, "contact.html"));
  } else {
    serveFile(res, path.join(__dirname, "404.html"), 404);
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
