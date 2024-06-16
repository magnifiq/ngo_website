const express = require("express");
const router = express.Router();

const Projects = require("./modelProjects");
const upload = require("../../middleware/upload");

const {
  SERVER_ERROR,
  NOT_FOUND,
  CREATED,
} = require("../../constants/statusCodes");
const { PROJECTS_NOT_FOUND } = require("../../constants/errorMessages");

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.find();
    res.json(projects);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const projects = await Projects.findById(req.params.id);
    if (!projects)
      return res.status(NOT_FOUND).json({ message: PROJECTS_NOT_FOUND });
    res.json(projects);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.post("/", upload, async (req, res) => {
  try {
    const { title, text, creation_date, category } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : "";
    const projects = new Projects({
      title,
      text,
      image_url,
      creation_date,
      category,
    });
    await projects.save();
    res.status(CREATED).json(projects);
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
    const projects = await Projects.findByIdAndUpdate(
      req.params.id,
      { title, text, image_url, creation_date, category },
      { new: true }
    );
    res.json(projects);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Projects.findByIdAndDelete(req.params.id);
    res.json({ message: "Projects deleted" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

module.exports = router;
