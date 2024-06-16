const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const userDbUri = process.env.USER_CONN;

const userConnection = mongoose.createConnection(userDbUri);
const User = userConnection.model("User", UserSchema);

userConnection.on(
  "error",
  console.error.bind(console, "User DB connection error:")
);
userConnection.once("open", async function () {
  console.log("Connected to User DB");

  try {
    const existingAdmin = await User.findOne({
      username: process.env.ADMIN_USERNAME,
    });

    if (!existingAdmin) {
      const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8);
      const adminUser = new User({
        username: process.env.ADMIN_USERNAME,
        password: hashedPassword,
      });
      await adminUser.save();
      console.log("Admin user created");
    } else {
      console.log("Admin user already exists");
    }
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
});

module.exports = User;
