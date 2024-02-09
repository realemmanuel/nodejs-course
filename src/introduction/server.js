import http from "http";
import fs from "fs";

// SERVER

const data = fs.readFileSync("../data/data.json", "utf-8");
const dataObj = JSON.parse(data);

// Creating server using "http"
const server = http.createServer((req, res) => {
  // This is an example of routing
  const pathname = req.url;

  // Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<h1>This is the OVERVIEW page</h1>");
  }
  // Product Page
  else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<h1>This is the PRODUCT page</h1>");
  }
  // API
  else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  }
  // Page Not Found
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "localhost", () => {
  console.log("Server listening on port 8000");
});
