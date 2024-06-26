const express = require("express");
const router = express.Router();

const News = require("./modelNews");
const upload = require("../../middleware/upload");

const {
  SERVER_ERROR,
  NOT_FOUND,
  CREATED,
} = require("../../constants/statusCodes");
const { NEWS_NOT_FOUND } = require("../../constants/errorMessages");

router.get("/", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.get("/latestNews", async (req, res) => {
  try {
    const news = await News.find().sort({ creation_date: -1 }).limit(10);
    res.json(news);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.get("/latestThreeNews", async (req, res) => {
  try {
    const news = await News.find().sort({ creation_date: -1 }).limit(3);
    res.json(news);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(NOT_FOUND).json({ message: NEWS_NOT_FOUND });
    res.json(news);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.post("/", upload, async (req, res) => {
  try {
    const { title, text, creation_date, category } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : "";
    const news = new News({ title, text, image_url, creation_date, category });
    await news.save();
    res.status(CREATED).json(news);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.put("/:id", upload, async (req, res) => {
  try {
    const { title, text, creation_date, category } = req.body;
    const image_url = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.image_url;
    const news = await News.findByIdAndUpdate(
      req.params.id,
      { title, text, image_url, creation_date, category },
      { new: true }
    );
    res.json(news);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

module.exports = router;
