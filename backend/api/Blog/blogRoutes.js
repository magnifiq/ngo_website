const express = require("express");
const router = express.Router();

const Blog = require("./modelBlog");
const upload = require("../../middleware/upload");

const {
  SERVER_ERROR,
  NOT_FOUND,
  CREATED,
} = require("../../constants/statusCodes");
const { BLOGS_NOT_FOUND } = require("../../constants/errorMessages");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.get("/categoryCounts", async (req, res) => {
  try {
    const categoryCounts = await Blog.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          count: 1,
        },
      },
    ]);

    res.json(categoryCounts);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const blogs = await Blog.findById(req.params.id);
    if (!blogs) return res.status(NOT_FOUND).json({ message: BLOGS_NOT_FOUND });
    res.json(blogs);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const blogs = await Blog.find({ category: req.params.category }).sort({
      creation_date: -1,
    });
    res.json(blogs);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.post("/", upload, async (req, res) => {
  try {
    const { title, text, creation_date, category } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : "";
    const blogs = new Blog({ title, text, image_url, creation_date, category });

    await blogs.save();

    res.status(CREATED).json(blogs);
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
    const blogs = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, text, image_url, creation_date, category },
      { new: true }
    );
    res.json(blogs);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

module.exports = router;
