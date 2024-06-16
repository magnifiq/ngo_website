const mongoose = require("mongoose");
const eventsConnection = require("./dbEvents");

const eventsSchema = new mongoose.Schema({
  title: String,
  text: String,
  category: String,
  image_url: String,
  creation_date: { type: Date, default: Date.now },
  edit_date: Date,
});

module.exports = eventsConnection.model("Events", eventsSchema);
