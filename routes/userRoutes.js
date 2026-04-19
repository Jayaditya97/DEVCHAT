const express = require("express");
const router = express.Router();

const User = require("../models/User");


// GET all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});


// GET user by id
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
});


// CREATE user
router.post("/", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE user
router.delete("/:id", async (req, res) => {
  const user = await User.findById(
    req.params.id
  );

  if (!user) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  await user.deleteOne();

  res.json({
    message: "User deleted",
  });
});


module.exports = router;