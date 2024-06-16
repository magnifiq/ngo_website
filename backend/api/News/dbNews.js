const mongoose = require("mongoose");
require("dotenv").config();

const newsDbUri = process.env.NEWS_CONN;

const newsConnection = mongoose.createConnection(newsDbUri);

newsConnection.on(
  "error",
  console.error.bind(console, "News DB connection error:")
);
newsConnection.once("open", function () {
  console.log("Connected to News DB");
});

module.exports = newsConnection;
