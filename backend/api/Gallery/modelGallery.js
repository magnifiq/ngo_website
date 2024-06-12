const mongoose = require("mongoose");
const galleryConnection = require("./dbGallery");

const gallerySchema = new mongoose.Schema({
  title: String,
  text: String,
  images: [{ type: String }],
  creation_date: { type: Date, default: Date.now },
  edit_date: Date,
});

module.exports = galleryConnection.model("Gallery", gallerySchema);
