require("dotenv").config();
const verifyToken = require("../../middleware/authMiddleware");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./dbUser");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({ token: null, message: "Invalid Password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 7200, // 2 hours
  });

  res.status(200).send({ token });
});

module.exports = router;
