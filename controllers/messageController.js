const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const createMessage = async ({
  sender,
  content,
  conversationId,
}) => {
  // create message
  const message = await Message.create({
    sender,
    content,
    conversation: conversationId,
  });

  // update conversation
  await Conversation.findByIdAndUpdate(conversationId, {
    lastMessage: content,
    updatedAt: new Date(),
  });

  // populate sender details
  const populatedMessage = await Message.findById(message._id)
    .populate("sender", "name email")
    .populate("conversation");

  return populatedMessage;
};

module.exports = {
  createMessage,
};