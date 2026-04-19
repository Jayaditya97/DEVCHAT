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

```
backend/
  config/
  models/
  routes/
  middleware/
  data/
  server.js
```

---

## 🔐 Features

* User Registration & Login (JWT)
* Password hashing (bcrypt)
* Protected routes
* One-to-one conversations
* Messaging system
* MongoDB database integration
* Secure sender identification using JWT

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

## 🧠 Future Improvements

* Real-time messaging (Socket.IO)
* Group chats
* Image & GIF support
* Chat search functionality

---

## 📌 Status

Version 1 Backend Completed
Next: Real-time chat using Socket.IO

---

## 🙌 Author

Jayaditya Nagpal