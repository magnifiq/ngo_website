const mongoose = require("mongoose");
const connectToGalleryDB = require("./dbGallery");

const gallerySchema = new mongoose.Schema({
  title: String,
  text: String,
  category: String,
  images: [{ type: String }],
  creation_date: { type: Date, default: Date.now },
  drive_link: String,
  edit_date: Date,
});

let Gallery;
try {
  const galleryConnection = connectToGalleryDB();
  Gallery = galleryConnection.model("Gallery", gallerySchema);
} catch (error) {
  console.error("Gallery DB connection error:", error);
}

module.exports = Gallery;
