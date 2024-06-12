const mongoose = require("mongoose");
require("dotenv").config();

const galleryDbUri = process.env.GALLERY_CONN;

const galleryConnection = mongoose.createConnection(galleryDbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

galleryConnection.on(
  "error",
  console.error.bind(console, "Gallery DB connection error:")
);
galleryConnection.once("open", function () {
  console.log("Connected to Gallery DB");
});

module.exports = galleryConnection;
