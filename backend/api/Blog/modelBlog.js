const mongoose = require("mongoose");
const blogConnection = require("./dbBlog");

const categories = [
  "Рівні права і можливості",
  "Жіноче здоров'я",
  "Жінки в політиці",
  "Жінки науковиці та культурні діячки",
  "Материнство",
];

const blogSchema = new mongoose.Schema({
  title: String,
  text: String,
  image_url: String,
  category: { type: String, enum: categories },
  creation_date: { type: Date, default: Date.now },
  edit_date: Date,
});

module.exports = blogConnection.model("Blog", blogSchema);
