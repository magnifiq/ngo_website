const mongoose = require("mongoose");
const newsConnection = require("./dbNews");

const newsSchema = new mongoose.Schema({
  title: String,
  text: String,
  image_url: String,
  creation_date: { type: Date, default: Date.now },
  edit_date: Date,
});

module.exports = newsConnection.model("News", newsSchema);
