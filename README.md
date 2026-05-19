# DevChat — Real-Time Chat Application

DevChat is a full-stack real-time chat application built using Node.js, Express, MongoDB, Socket.IO, JWT Authentication, and Vanilla JavaScript.

The project supports:

* Real-time messaging
* JWT authentication
* Online users tracking
* Typing indicators
* Socket.IO rooms
* SSR pages using EJS
* MongoDB database integration

---

# 🚀 Features

## Authentication

* User Registration
* User Login
* JWT Token Authentication
* Protected Socket Connections
* Protected API Routes

## Real-Time Communication

* Socket.IO Integration
* Live Messaging
* Room-Based Messaging
* Typing Indicators
* Online Users Tracking

## Frontend

* EJS SSR Pages
* Vanilla HTML/CSS/JS Chat UI
* Real-Time Message Rendering
* Logout Functionality

## Backend

* Express Server
* REST APIs
* MongoDB Atlas Integration
* Mongoose Models
* Middleware Architecture

---

# 🛠️ Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Socket.IO
* JWT
* bcryptjs
* dotenv
* cors

## Frontend

* HTML
* CSS
* JavaScript
* EJS

---

# 📂 Project Structure

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│
├── data/
│   └── chats.js
│
├── frontend/
│   ├── chat.html
│   ├── chat.css
│   └── chat.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Conversation.js
│   └── Message.js
│
├── routes/
│   ├── authRoutes.js
│   ├── chatRoutes.js
│   ├── conversationRoutes.js
│   ├── messageRoutes.js
│   ├── pageRoutes.js
│   └── userRoutes.js
│
├── views/
│   ├── home.ejs
│   ├── login.ejs
│   └── register.ejs
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

## 2. Enter Project Directory

```bash
cd backend
```

## 3. Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file inside backend directory.

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

---

# ▶️ Run Project

## Development Mode

```bash
npm start
```

Server runs on:

```text
http://localhost:5000
```

---

# 🌐 Application Routes

## SSR Pages

| Route        | Description      |
| ------------ | ---------------- |
| `/`          | Home Page        |
| `/login`     | Login Page       |
| `/register`  | Register Page    |
| `/chat.html` | Chat Application |

---

# 🔌 API Routes

## Authentication

| Method | Route                |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

## Messages

| Method | Route                           |
| ------ | ------------------------------- |
| GET    | `/api/messages/:conversationId` |
| POST   | `/api/messages`                 |

## Conversations

| Method | Route                        |
| ------ | ---------------------------- |
| POST   | `/api/conversations`         |
| GET    | `/api/conversations/:userId` |

---

# ⚡ Socket.IO Events

## Client → Server

| Event          |
| -------------- |
| `join_room`    |
| `send_message` |
| `typing`       |
| `stop_typing`  |

## Server → Client

| Event              |
| ------------------ |
| `receive_message`  |
| `online_users`     |
| `user_typing`      |
| `user_stop_typing` |

---

# 🧠 System Architecture

```text
Client Browser
      ↓
EJS / HTML / CSS / JS Frontend
      ↓
Socket.IO + REST APIs
      ↓
Express.js Backend
      ↓
MongoDB Atlas
```

---

# 🔄 Data Flow

## Authentication Flow

```text
User Login/Register
        ↓
Server validates credentials
        ↓
JWT Token generated
        ↓
Token stored in localStorage
        ↓
Authenticated requests enabled
```

## Messaging Flow

```text
User sends message
        ↓
Socket.IO emits event
        ↓
Server receives message
        ↓
Room broadcast happens
        ↓
Connected clients receive message instantly
```

## Typing Indicator Flow

```text
User types message
        ↓
Frontend emits typing event
        ↓
Server broadcasts typing status
        ↓
Other users see typing indicator
```

---

# 🔒 Security Features

* JWT Authentication
* Protected Routes Middleware
* Protected Socket Connections
* bcrypt Password Hashing
* Environment Variables using dotenv

---

# 🚀 Deployment

## Backend Deployment

* Render

## Database

* MongoDB Atlas

The frontend is served directly from the Express backend.

---

# 📌 Current MVP Features

✅ User Authentication
✅ Real-Time Chat
✅ Online Users
✅ Typing Indicators
✅ Socket Rooms
✅ JWT Socket Authentication
✅ SSR Pages using EJS
✅ Vanilla JS Frontend
✅ MongoDB Integration

---

# 👨‍💻 Author

DevChat Project
Built for learning full-stack real-time application development.
