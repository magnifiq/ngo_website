const express = require("express");
const router = express.Router();

const Gallery = require("./modelGallery");
const uploadMultiple = require("../../middleware/uploadMultiple");

const {
  SERVER_ERROR,
  NOT_FOUND,
  CREATED,
} = require("../../constants/statusCodes");
const { PHOTOS_NOT_FOUND } = require("../../constants/errorMessages");

router.get("/", async (req, res) => {
  try {
    const photos = await Gallery.find();
    res.json(photos);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.get("/latestFivePhotos", async (req, res) => {
  try {
    const gallery = await Gallery.findOne().sort({ creation_date: -1 });
    if (gallery && gallery.images) {
      const title = gallery.title;
      const images =
        gallery.images.length <= 5
          ? gallery.images
          : gallery.images.slice(0, 5);
      res.json({ title, images });
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const photos = await Gallery.findById(req.params.id);
    if (!photos)
      return res.status(NOT_FOUND).json({ message: PHOTOS_NOT_FOUND });
    res.json(photos);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.post("/", uploadMultiple.array("images", 10), async (req, res) => {
  const { title, text, creation_date, category, drive_link } = req.body;
  const imageUrls = req.files.map((file) => `/uploads/${file.filename}`);

  const gallery = new Gallery({
    title,
    text,
    creation_date,
    images: imageUrls,
    category,
    drive_link,
  });

  try {
    const galleryEvent = await gallery.save();
    res.status(CREATED).json(galleryEvent);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.put("/:id", uploadMultiple.array("images", 10), async (req, res) => {
  try {
    const event = await Gallery.findById(req.params.id);
    if (!event)
      return res.status(NOT_FOUND).json({ message: PHOTOS_NOT_FOUND });

    event.title = req.body.title || event.title;
    event.text = req.body.text || event.text;
    event.creation_date = req.body.creation_date || event.creation_date;
    event.category = req.body.category || event.category;
    event.drive_link = req.body.drive_link || event.drive_link;
    if (req.files.length > 0) {
      event.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Gallery deleted" });
  } catch (error) {
    res.status(SERVER_ERROR).json({ message: SERVER_ERROR });
  }
});

module.exports = router;
