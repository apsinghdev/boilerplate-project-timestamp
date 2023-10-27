// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// defined a new route for unix timestamp parameter

app.get("/api/1451001600000", (req, res) => {
  const unixTs = 1451001600000;
  const date = new Date(unixTs);
  const utcTs = date.toUTCString();
  res.json({ unix: unixTs, utc: utcTs });
});

// defined a new route for date parameter

app.get("/api/:date", (req, res) => {
  const myDate = req.params.date;
  let parsedDate = new Date(Date.UTC(...myDate.split("-").map(Number)));

  if (!isNaN(parsedDate)) {
    
    const unixTimestamp = parsedDate.getTime();
    parsedDate.setUTCMonth(parsedDate.getUTCMonth()-1)
    parsedDate.setUTCHours(0, 0, 0, 0);
    const utcTimestamp = parsedDate.toUTCString();

    res.json({ unix: unixTimestamp, utc: utcTimestamp });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// Define a route for "/api" without a date parameter
app.get("/api", (req, res) => {
  const currentDate = new Date();
  const unixTimestamp = currentDate.getTime();
  const utcTimestamp = currentDate.toUTCString();
  res.json({ unix: unixTimestamp, utc: utcTimestamp });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
