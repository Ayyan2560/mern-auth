# 🚀 MERN Auth — Full Stack Login & Signup

Beautiful animated authentication system built with **MongoDB, Express, React, Node.js**.

---

## ✨ Features

- 🔐 JWT-based authentication (login / register / logout)
- 🎨 Animated particle background with canvas
- 💫 Framer Motion page transitions & form animations
- 🔴 Live password strength indicator
- 👁️ Toggle password visibility
- ✅ Form validation (frontend + backend)
- 🛡️ Protected routes
- 📱 Fully responsive
- 🌙 Dark mode design

---

## 📁 Project Structure

```
mern-auth/
├── backend/
│   ├── models/       User.js
│   ├── routes/       auth.js
│   ├── middleware/   auth.js
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/  InputField.jsx, ParticleBackground.jsx
    │   ├── context/     AuthContext.jsx
    │   ├── pages/       Login.jsx, Register.jsx, Dashboard.jsx
    │   ├── App.jsx
    │   └── index.css
    └── package.json
```

---

## ⚙️ Setup & Run

### 1. Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file from example:
cp .env.example .env
# Edit .env and set your MONGO_URI and JWT_SECRET

npm run dev   # runs on http://localhost:5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev   # runs on http://localhost:5173
```

### 4. Open App
Visit: **http://localhost:5173**

---

## 🔑 API Endpoints

| Method | Route              | Access  | Description        |
|--------|--------------------|---------|--------------------|
| POST   | /api/auth/register | Public  | Create new account |
| POST   | /api/auth/login    | Public  | Login              |
| GET    | /api/auth/me       | Private | Get current user   |
| POST   | /api/auth/logout   | Private | Logout             |

---

## 🌐 MongoDB Atlas (Cloud)

Replace `MONGO_URI` in `.env` with your Atlas connection string:
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/mern-auth
```

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, Framer Motion, React Router v6, Axios, React Hot Toast, React Icons

**Backend:** Node.js, Express, MongoDB, Mongoose, bcryptjs, jsonwebtoken, cors, dotenv
