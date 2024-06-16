const mongoose = require("mongoose");
const projectsConnection = require("./dbProjectsDescription");

const projectsSchema = new mongoose.Schema({
  title: String,
  text: String,
  category: String,
  image_url: String,
  creation_date: { type: Date, default: Date.now },
  edit_date: Date,
});

module.exports = projectsConnection.model("Projects", projectsSchema);
