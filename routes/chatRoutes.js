const express = require("express");
const router = express.Router();

const chats = require("../data/chats");

// GET all chats
router.get("/", (req, res) => {
  res.send(chats);
});

// POST chat
router.post("/", (req, res) => {
  const newChat = req.body;

  chats.push(newChat);

  res.send(newChat);
});

module.exports = router;