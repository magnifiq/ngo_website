const mongoose = require("mongoose");
require("dotenv").config();

const projectsDbUri = process.env.PROJECTS_CONN;

const projectsConnection = mongoose.createConnection(projectsDbUri);

projectsConnection.on(
  "error",
  console.error.bind(console, "Projects DB connection error:")
);
projectsConnection.once("open", function () {
  console.log("Connected to Projects DB");
});

module.exports = projectsConnection;
