require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const newsRoutes = require("./api/News/newsRoutes");
const galleryRoutes = require("./api/Gallery/galleryRoutes");
const projectsRoutes = require("./api/ProjectsDescription/projectsRoutes");
const eventsRoutes = require("./api/EventsDescription/eventsRoutes");
const blogRoutes = require("./api/Blog/blogRoutes");
const verifyToken = require("./middleware/authMiddleware");
const userRoutes = require("./api/User/userRoutes");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/news", newsRoutes);
app.use("/projectsDescription", projectsRoutes);
app.use("/eventsDescription", eventsRoutes);
app.use("/gallery", galleryRoutes);
app.use("/blog", blogRoutes);
app.use("/auth", userRoutes);
app.use("/admin", verifyToken, (req, res) => {
  res.send("Admin content");
});

// Import the user connection to ensure the admin user is created
require("./api/User/dbUser");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
