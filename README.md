# Version Control System 🚀

A full-stack GitHub-inspired version control platform built using **React, Node.js, Express, MongoDB, and Socket.IO**. The application allows users to create repositories, manage files, track commits, raise issues, and leverage **Google Gemini AI** for commit message generation, code review, and automatic README generation.

---

## ✨ Features

### 👤 Authentication
- User Signup
- User Login
- JWT Authentication
- Protected Routes

---

### 📂 Repository Management

- Create Repository
- Public & Private Repository Support
- Repository Description
- Dashboard showing all repositories
- Repository Details Page
- Fork Repository
- Star Repository
- Repository Search 

---

### 📁 File Management

- Create Files
- Edit Files
- Delete Files
- View File Contents
- Automatic Version Tracking

---

### 📝 Commit System

- Manual Commit Messages
- AI Generated Commit Messages
- Commit History
- Track File Changes
- Repository Timeline

---

### 🤖 AI Features (Google Gemini)

#### AI Commit Message Generator

Automatically generates meaningful commit messages based on file changes.

Example:

```
feat: add user authentication
```

---

#### AI README Generator

Automatically scans the repository and creates a professional README.md.

---

### 👤 User Profile

- Repository Count
- Contribution Heatmap
- User Information

---

### 📊 Contribution Graph

GitHub-style contribution heatmap showing daily activity.

---

### 🔄 Version Control

- Repository Snapshots
- File Version Tracking
- Commit History

---

### ⚡ Real-Time Features

Using Socket.IO

- Live Updates
- Instant Repository Changes

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Primer React UI
- Heat Map
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Socket.IO
- AWS SDK

### AI

- Google Gemini API

---

## 📂 Project Structure

```
GitHub-Clone
│
├── frontend
│   ├── React
│   ├── Components
│   └── API
│
├── backend
│   ├── Controllers
│   ├── Models
│   ├── Routes
│   ├── Services
│   ├── Middleware
│   └── Utils
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend

```bash
cd backend
npm install
npm start
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Backend `.env`

```env
MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
```

Frontend `.env`

```env
VITE_API_URL=http://localhost:3000
```

---

## 📸 Main Modules

- Authentication
- Dashboard
- Repository
- File Editor
- Commit History
- AI Commit Generator
- AI Code Review
- AI README Generator
- Issue Tracker
- User Profile
- Contribution Graph

---

## 🎯 Future Improvements

- Pull Requests
- Branch Support
- Merge Conflicts
- Notifications
- Collaborators
- Markdown Preview
- Dark/Light Theme

---

## 👨‍💻 Author

**Anubhav Dixit**

B.Tech Information Technology

NIT Kurukshetra

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub!
