const mongoose = require("mongoose");
require("dotenv").config();

const eventsDbUri = process.env.EVENTS_CONN;

const eventsConnection = mongoose.createConnection(eventsDbUri);

eventsConnection.on(
  "error",
  console.error.bind(console, "Events DB connection error:")
);
eventsConnection.once("open", function () {
  console.log("Connected to Events DB");
});

module.exports = eventsConnection;
