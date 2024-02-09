import http from "http";
import fs from "fs";

const data = fs.readFileSync("../data/data.json", "utf-8");

const server = http.createServer((req, res) => {
  const pathname = req.url;

  if (pathname === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end("<h1>Welcome To The Home Page</h1>");
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "localhost", () => {
  console.log("listening on port 8000");
});
