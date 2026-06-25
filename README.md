# GitHub Clone with Custom Version Control System

A full-stack GitHub-inspired platform built using the MERN ecosystem that allows users to create repositories, manage code, track commits, and collaborate through issues. Along with the web application, the project also includes a **custom Git Version Control System (VCS)** built from scratch with support for repository initialization, staging, commits, push/pull, and revert operations.

---

## 🚀 Features

### 👤 User Authentication
- User Registration
- Secure Login using JWT
- Password hashing with bcrypt
- Protected routes

---

### 📁 Repository Management
- Create repositories
- View all repositories
- Repository dashboard
- User profile with repositories
- Repository ownership support

---

### 📌 Issue Tracking
- Create Issues
- View Repository Issues
- Manage Issue Discussions
- Track Open Issues

---

### 📊 User Profile
- GitHub-like profile page
- Contribution Heatmap
- Repository overview

---

### 🔥 Custom Version Control System

A custom Git-like CLI implemented from scratch.

Supported commands:

```bash
node index.js init
```
Initializes a new repository.

```bash
node index.js add <filename>
```
Adds files to the staging area.

```bash
node index.js commit "Commit Message"
```
Creates a new commit.

```bash
node index.js push
```
Pushes commits to cloud storage.

```bash
node index.js pull
```
Pulls latest commits.

```bash
node index.js revert <commitID>
```
Reverts repository to a previous commit.

---

### ☁ Cloud Integration

- AWS S3 integration
- Remote repository backup
- Push/Pull synchronization

---

### 🔄 Real-Time Features

- Socket.IO integration
- Live updates
- Real-time communication support

---

## 🛠 Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- Primer React UI
- GitHub Contribution Heatmap

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.IO
- AWS SDK
- bcrypt.js

---

## 📂 Project Structure

```
project
│
├── frontend
│   ├── Authentication
│   ├── Dashboard
│   ├── Repository Creation
│   ├── User Profile
│   ├── Heatmap
│   └── Components
│
├── backend
│   ├── Controllers
│   ├── Routes
│   ├── Models
│   ├── Version Control Logic
│   └── Server
│
└── Custom Git CLI
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone https://github.com/ANUBHAVDIXIT2004/Github-Clone.git
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env`

```env
PORT=3000
MONGODB_URI=your_mongodb_uri

JWT_SECRET=your_secret

AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket
```

Run backend

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 💻 Custom VCS Commands

| Command | Description |
|----------|-------------|
| init | Initialize repository |
| add | Stage file |
| commit | Create commit |
| push | Upload commits |
| pull | Download latest commits |
| revert | Restore previous commit |

---

## 📸 Screens

- Login
- Signup
- Dashboard
- Repository Page
- Create Repository
- User Profile
- Contribution Heatmap
- Issue Tracker

(Add screenshots here)

---

## 🎯 Future Improvements

- Pull Requests
- Branching Support
- Merge Conflict Resolution
- Fork Repository
- Star Repository
- Watch Repository
- Repository Search
- README AI Generator
- AI Code Summary
- AI Documentation Generator
- AI Commit Message Generator
- AI Code Review
- Repository Analytics
- Notifications
- Dark Mode
- CI/CD Pipeline

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 👨‍💻 Author

**Anubhav Dixit**

B.Tech Information Technology  
NIT Kurukshetra

GitHub:
https://github.com/ANUBHAVDIXIT2004

---

## ⭐ If you like this project

Give this repository a ⭐ and support the project.
