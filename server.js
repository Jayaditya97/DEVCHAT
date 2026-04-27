require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

const chatRoutes = require("./routes/chatRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const conversationRoutes = require("./routes/conversationRoutes.js");
const authRoutes = require("./routes/authRoutes");
const Message = require("./models/Message");
const Conversation = require("./models/Conversation");


app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations",conversationRoutes);
app.use("/api/auth", authRoutes);

const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("send_message", async (data) => {
    try {
      const { conversationId, content } = data;

      // TEMP sender (we'll replace with JWT later)
      const sender = "69a85d1fd6a47eb8bad03ff4"; //temp user id will replace 

      const newMessage = new Message({
        conversation: conversationId,
        sender: sender,
        content: content,
      });

      const savedMessage = await newMessage.save();

      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessage: content,
        updatedAt: new Date(),
      });

      io.emit("receive_message", savedMessage);

    } catch (error) {
      console.log(error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});