const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const { protect } = require("../middleware/authMiddleware");

// CREATE message
router.post("/", protect, async (req, res) => {
  try {
    const message = new Message({
      conversation: req.body.conversation,
      sender: req.user._id,
      content: req.body.content,
    });

    const saved = await message.save();

    // update last message
    await Conversation.findByIdAndUpdate(
      req.body.conversation,
      {
        lastMessage: req.body.content,
        updatedAt: new Date(),
      }
    );

    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// GET messages of conversation
router.get("/:conversationId", async (req, res) => {
  const messages = await Message.find({
    conversation: req.params.conversationId,
  })
    .populate("sender", "name email avatar")
    .populate("conversation");

  res.json(messages);
});

// GET all messages
router.get("/", async (req, res) => {
  const conv = await Conversation.find()
    .populate("members", "name email avatar")
    .sort({ updatedAt: -1 });

  res.json(conv);
});

// DELETE message
router.delete("/:id", async (req, res) => {
  const msg = await Message.findById(
    req.params.id
  );

  if (!msg) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  await msg.deleteOne();

  res.json({
    message: "Deleted",
  });
});

module.exports = router;