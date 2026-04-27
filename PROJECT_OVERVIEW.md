# 📘 DevChat Backend – Project Overview (Version 1)

## 📌 Introduction

DevChat is a backend-focused chat application built using the MERN stack.
This version (V1) focuses on building a secure and scalable messaging backend similar to direct messaging systems in modern applications like Discord or WhatsApp.

---

## 🎯 Objective

The goal of this project is to:

* Implement a secure user authentication system
* Design a scalable chat database structure
* Enable one-to-one messaging
* Build REST APIs for chat operations
* Ensure backend security using JWT

---

## 🏗️ System Architecture

```
Client (Postman / Frontend)
        ↓
Express API (Node.js)
        ↓
JWT Authentication Middleware
        ↓
Controllers / Routes
        ↓
MongoDB Database
```

---

## ⚡ Real-Time Communication (Socket.IO)

The application now supports real-time messaging using Socket.IO.

### Flow:

Client sends message via socket  
→ Backend receives event  
→ Message saved in MongoDB  
→ Server broadcasts message to all connected clients  

### Implementation Details:

- Socket.IO integrated with Express server
- Messages handled via `send_message` event
- Messages stored using Mongoose models
- Real-time updates without page refresh

### Current Limitations:

- No user authentication in sockets (JWT integration pending)
- No conversation-based filtering (all users receive messages)

### Planned Enhancements:

- JWT-based socket authentication
- Socket rooms for conversation-level messaging
- Typing indicators

## 🧩 Core Modules

### 1. User Module

Handles user registration and login.

**Features:**

* Register new user
* Login existing user
* Password hashing using bcrypt
* JWT token generation

---

### 2. Authentication Module

Implements secure access control.

**Features:**

* JWT token verification
* Protected routes
* User identification using `req.user`

---

### 3. Conversation Module

Represents chat sessions.

**Features:**

* Create conversation
* Store participants (members)
* Track last message
* Sort chats by latest activity

---

### 4. Message Module

Handles messaging logic.

**Features:**

* Send message
* Retrieve messages by conversation
* Link messages to user and conversation

---

## 🗄️ Database Design

### Users Collection

```
name
email
password (hashed)
isBanned
createdAt
```

---

### Conversations Collection

```
members (array of user IDs)
isGroup (boolean)
name
lastMessage
updatedAt
```

---

### Messages Collection

```
conversation (ref)
sender (ref)
content
type
createdAt
```

---

## 🔐 Security Implementation

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Sender is derived from token (`req.user._id`)
* Prevents user impersonation

---

## 📡 API Summary

### Auth Routes

```
POST /api/auth/register
POST /api/auth/login
```

---

### Conversation Routes

```
POST /api/conversations
GET /api/conversations
GET /api/conversations/user/:id
```

---

### Message Routes

```
POST /api/messages
GET /api/messages/:conversationId
```

---

## 🔄 Message Flow

```
User logs in
→ Receives JWT token
→ Sends request with token
→ Middleware verifies token
→ Server identifies user
→ Message saved in database
→ Conversation updated
```

---

## ⚙️ How to Run

1. Install dependencies:

```
npm install
```

2. Add environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

3. Start server:

```
npm start
```

---

## 🧪 Testing

Use Postman:

1. Register user
2. Login to get token
3. Add token in Authorization header:

   ```
   Authorization: Bearer <token>
   ```
4. Create conversation
5. Send message

---

## 🚧 Limitations (Version 1)

* No real-time messaging
* No frontend UI
* No file/image support
* No group chat channels

---

## 🚀 Future Scope (Version 2)

* Real-time chat using Socket.IO
* Group chat system
* Media sharing (images/GIFs)
* Chat search functionality
* Frontend integration

---

## 📌 Conclusion

This project demonstrates:

* Backend architecture design
* REST API development
* Authentication & security
* Database modeling
* Scalable chat system design

This project now includes both REST API-based communication and real-time messaging using Socket.IO, forming a strong foundation for a full-scale chat application.

---

## 👨‍💻 Author

Jayaditya Nagpal