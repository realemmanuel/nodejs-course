import fs from "fs";

// Reading and writing files using the file system "fs" in node.js

// Blocking, synchronous way
const textIn = fs.readFileSync("../txt/input.txt", "utf-8");
console.log(textIn);

const textOut = `This is a short bio of Emmanuel Taiwo: ${textIn}. \n Created on ${Date.now()}`;
fs.writeFileSync("../txt/output.txt", textOut);
console.log("File Written");

// Non-blocking, asynchronous way
// This method can also be refactored to async/await/promises
fs.readFile("../txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error! 💥");
  fs.readFile(`../txt/${data1}.txt`, "utf-8", (err, data2) => {
    if (err) return console.log("Error! 💥");
    console.log(data2);
    fs.readFile("../txt/append.txt", "utf-8", (err, data3) => {
      if (err) return console.log("Error! 💥");
      console.log(data3);

      fs.writeFile(
        "../txt/output.txt",
        `${data2}\n${data3}`,
        "utf-8",
        (err) => {
          if (err) return console.log("Error! 💥");
          console.log("Your file has been written 🙂");
        }
      );
    });
  });
});
