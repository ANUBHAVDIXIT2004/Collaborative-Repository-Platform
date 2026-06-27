# GitHub Clone 🚀

A full-stack GitHub Clone built using the MERN Stack that allows users to create repositories, manage files, perform version control operations, track commits, create issues, and collaborate through a GitHub-inspired interface.

---

## 📌 Features

### 👤 User Authentication
- User Signup
- User Login
- JWT Authentication
- Password Encryption using Bcrypt
- Protected Routes

---
### ⏪ Version Control

- Complete Commit History
- Browse Previous Commits
- Restore Repository to Any Previous Commit
- Revert Entire Repository to Any Selected Commit
- Recover Previous File Versions
- Git-like Version Management
  
---
### 📂 Repository Management

- Create Repository
- View All Repositories
- View Repository Details
- Search Repository by Name
- View User Repositories
- Repository Dashboard
- GitHub-inspired Repository UI

---

### 📄 File Management

- Create Files
- Edit Files
- Delete Files
- View File Contents
- Store Repository Files
- Live File Updates

---

### 📝 Commit Management

- Custom Commit Messages
- Commit History
- View All Repository Commits
- Track Every File Change
- Commit Timeline

---

### 🔄 Git Operations

Implemented custom Git-like functionality including:

- Git Init
- Git Add
- Git Commit with Custom Commit Messages
- Git Push
- Git Pull
- View Complete Commit History
- Restore Repository to Any Previous Commit
- Revert Repository State to Any Selected Commit
- Preserve Version History After Revert

---

### 🐞 Issue Tracking

- Create Issues
- View Repository Issues
- Issue Management

---

### 📊 Profile Dashboard

- User Profile
- Contribution Heatmap
- Repository Statistics
- Commit Statistics

---

### ⚡ Real-Time Features

- Socket.IO Integration
- Live Repository Updates
- Real-time Synchronization

---

### 🎨 UI

- GitHub Inspired Design
- Responsive Layout
- Repository Cards
- Navigation Bar
- Clean Dashboard
- Modern User Interface

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- Axios
- Primer React UI
- React Heat Map

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT
- Bcrypt
- UUID

### Other

- AWS SDK
- Body Parser
- CORS
- Dotenv

---

# 📁 Project Structure

```
GitHub-Clone
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── Auth
│   │   │   ├── Dashboard
│   │   │   ├── Repository
│   │   │   ├── File
│   │   │   ├── Create Repository
│   │   │   ├── Profile
│   │   │   └── Navbar
│   │   ├── Routes
│   │   └── Auth Context
│   │
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── middleware
│   ├── utils
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/github-clone.git
```

---

## Backend

```bash
cd backend

npm install

npm start
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=

MONGODB_URI=

JWT_SECRET=

AWS_ACCESS_KEY_ID=

AWS_SECRET_ACCESS_KEY=

AWS_REGION=

S3_BUCKET_NAME=
```

---

# Available APIs

## User

- Signup
- Login
- Get Profile

---

## Repository

- Create Repository
- Get Repository
- Get All Repositories
- Search Repository
- Get User Repositories

---

## Files

- Create File
- Update File
- Delete File
- Fetch Files

---

## Commits

- Create Commit
- Fetch Commit History

---

## Issues

- Create Issue
- Fetch Issues

---

## Git Operations

- Init
- Add
- Commit
- Push
- Pull
- Revert

---

# Future Improvements

- Pull Requests
- Branch Support
- Merge Conflict Resolution
- Fork Repository
- Repository Star
- Watch Repository
- Notifications
- Organization Support
- Repository Visibility (Public/Private)
- Code Review System
- CI/CD Integration

---

# Screenshots

Add screenshots here.

```
/screenshots

dashboard.png

repository.png

profile.png

commit-history.png
```

---

# Author

**Anubhav Dixit**

B.Tech Information Technology

NIT Kurukshetra

GitHub: https://github.com/ANUBHAVDIXIT2004

---

# License

This project is created for learning purposes and is inspired by GitHub.
