const express = require("express");
const router = express.Router();

const Conversation = require("../models/Conversation");
const { protect } = require("../middleware/authMiddleware");

// CREATE conversation
router.post("/", protect, async (req, res) => {
  try {
    const conversation = new Conversation({
      members: req.body.members,
      isGroup: req.body.isGroup,
      name: req.body.name,
    });

    const saved = await conversation.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET all conversations
router.get("/", async (req, res) => {
  const conv = await Conversation.find()
    .populate("members", "name email avatar")
    .sort({ updatedAt: -1 });

  res.json(conv);
});

// GET conversations of user
router.get("/user/:userId", async (req, res) => {
  const conv = await Conversation.find({
    members: {
      $in: [req.params.userId],
    },
  }).populate("members", "name email avatar");

  res.json(conv);
});

// DELETE conversation
router.delete("/:id", async (req, res) => {
  const conv = await Conversation.findById(
    req.params.id
  );

  if (!conv) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  await conv.deleteOne();

  res.json({
    message: "Deleted",
  });
});

module.exports = router;