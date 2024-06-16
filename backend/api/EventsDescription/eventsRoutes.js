const express = require("express");
const router = express.Router();

const Events = require("./modelEvents");
const upload = require("../../middleware/upload");

const {
  SERVER_ERROR,
  NOT_FOUND,
  CREATED,
} = require("../../constants/statusCodes");
const { EVENTS_NOT_FOUND } = require("../../constants/errorMessages");

router.get("/", async (req, res) => {
  try {
    const events = await Events.find();
    res.json(events);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const events = await Events.findById(req.params.id);
    if (!events)
      return res.status(NOT_FOUND).json({ message: EVENTS_NOT_FOUND });
    res.json(events);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.post("/", upload, async (req, res) => {
  try {
    const { title, text, creation_date, category } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : "";
    const events = new Events({
      title,
      text,
      image_url,
      creation_date,
      category,
    });
    await events.save();
    res.status(CREATED).json(events);
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
    const events = await Events.findByIdAndUpdate(
      req.params.id,
      { title, text, image_url, creation_date, category },
      { new: true }
    );
    res.json(events);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Events.findByIdAndDelete(req.params.id);
    res.json({ message: "Events deleted" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

module.exports = router;
