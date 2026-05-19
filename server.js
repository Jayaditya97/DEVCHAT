require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const path = require("path");

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
const { createMessage } = require("./controllers/messageController");
const pageRoutes = require("./routes/pageRoutes");

app.set("view engine", "ejs");
app.set(
  "views",
  path.join(__dirname, "views")
);

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/", pageRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations",conversationRoutes);
app.use("/api/auth", authRoutes);
app.use(
  "/uploads",
  express.static("public/uploads")
);

app.use(
  express.static("frontend")
);

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

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("No token"));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id)
      .select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.user = user;

    next();

  } catch (error) {
    next(new Error("Authentication error"));
  }
});

const onlineUsers = new Map();

io.on("connection", (socket) => {

  onlineUsers.set(
  socket.user._id.toString(),
  socket.id
);

console.log(
  "Online Users:",
  Array.from(onlineUsers.keys())
);

io.emit(
  "online_users",
  Array.from(onlineUsers.keys())
);

  console.log("User connected:", socket.id);

  socket.on("join_room", (conversationId) => {

  socket.join(conversationId);

  console.log(
    `${socket.user.name} joined room ${conversationId}`
  );

});

socket.on("typing", (conversationId) => {

  socket.to(conversationId).emit(
    "user_typing",
    {
      user: socket.user.name,
    }
  );

});

socket.on("stop_typing", (conversationId) => {

  socket.to(conversationId).emit(
    "user_stop_typing"
  );

});

socket.on("send_message", (data) => {

  const message = {
    sender: {
      name: socket.user.name,
    },

    content: data.content,
  };

  io.to(data.conversationId)
    .emit("receive_message", message);

});

 socket.on("disconnect", () => {

  onlineUsers.delete(
    socket.user._id.toString()
  );

  console.log(
    "User disconnected:",
    socket.user.name
  );

  io.emit(
    "online_users",
    Array.from(onlineUsers.keys())
  );
});

});
