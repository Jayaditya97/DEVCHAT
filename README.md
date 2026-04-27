# 💬 DevChat Backend (MERN Chat Application)

## 🚀 Overview

This is a backend-focused chat application built using the MERN stack.
It supports user authentication, one-to-one messaging, and conversation management.

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs

---

## 📂 Project Structure

backend/
  config/        # DB connection & utilities
  controllers/   # (optional logic layer)
  data/          # dummy/test data
  middleware/    # auth middleware
  models/        # Mongoose schemas
  routes/        # API routes
  server.js      # entry point

---

## 📁 Folder Structure Explanation

- **config/** → Database connection and utilities
- **controllers/** → Business logic (currently minimal)
- **data/** → Static/dummy data used for testing
- **middleware/** → Authentication middleware (JWT)
- **models/** → MongoDB schemas (User, Message, Conversation)
- **routes/** → API endpoints
- **server.js** → Main entry point

---

## 🔐 Features

* User Registration & Login (JWT)
* Password hashing (bcrypt)
* Protected routes
* One-to-one conversations
* Messaging system
* MongoDB database integration
* Secure sender identification using JWT

## ⚡ Real-Time Chat (Socket.IO)

This project now includes real-time messaging using Socket.IO.

### Features:
- Instant message delivery between clients
- Multi-user communication (via browser tabs)
- Messages are stored in MongoDB and broadcasted in real-time

### Current Limitation:
- All connected users receive all messages (no room-based filtering yet)
- Sender is temporarily hardcoded (JWT integration pending)

### Next Improvements:
- JWT authentication for sockets
- Conversation-based message delivery (Socket Rooms)

---

## 📡 API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login

### Users

* GET /api/users

### Conversations

* POST /api/conversations
* GET /api/conversations

### Messages

* POST /api/messages
* GET /api/messages/:conversationId

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```
git clone https://github.com/your-username/devchat-backend.git
cd backend
```

### 2. Install dependencies

```
npm install
```

### 3. Create .env file

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run server

```
npm start
```

---

## 🧠 Future Improvements (Version 2)

- JWT authentication for Socket.IO
- Conversation-based real-time messaging (rooms)
- Group chat system
- Image & GIF sharing
- Chat search functionality
- Frontend (React)

---

## 📌 Status

Version 1 Backend Completed
Next: Real-time chat using Socket.IO

## ⚠️ Security Note

The `.env` file is excluded from version control to protect sensitive data such as database credentials and JWT secrets.

---

## 🙌 Author

Jayaditya Nagpal