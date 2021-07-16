const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const express = require("express");

const app = express();

let csvdata = [];

fs.createReadStream(path.resolve(__dirname, "simple-data.csv"))
  .pipe(csv.parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    console.log(row);
    csvdata.push(row);
  });

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.send(csvdata);
});

app.listen(7888, () => {
  console.log("listening on port 7888");
});
