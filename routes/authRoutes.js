const generateToken = require("../config/generateToken");
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } =
    req.body;

  const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    return res.status(400).json({
      message: "User exists",
    });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword =
    await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  const saved = await user.save();

  res.json({
    _id: saved._id,
    name: saved.name,
    email: saved.email,
    token: generateToken(saved._id),
  });
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } =
    req.body;

  const user = await User.findOne({
    email,
  });

  if (
    user &&
    (await bcrypt.compare(
      password,
      user.password
    ))
  ) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
});

module.exports = router;