const mongoose = require("mongoose");
require("dotenv").config();

const galleryDbUri = process.env.GALLERY_CONN;

function connectToGalleryDB() {
  const galleryConnection = mongoose.createConnection(galleryDbUri);

  galleryConnection.on(
    "error",
    console.error.bind(console, "Gallery DB connection error:")
  );
  galleryConnection.once("open", function () {
    console.log("Connected to Gallery DB");
  });

  return galleryConnection;
}

module.exports = connectToGalleryDB;
