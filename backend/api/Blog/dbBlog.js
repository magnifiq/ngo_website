const mongoose = require("mongoose");
require("dotenv").config();

const blogDbUri = process.env.BLOG_CONN;

const blogConnection = mongoose.createConnection(blogDbUri);

blogConnection.on(
  "error",
  console.error.bind(console, "Blog DB connection error:")
);
blogConnection.once("open", function () {
  console.log("Connected to Blog DB");
});

module.exports = blogConnection;
