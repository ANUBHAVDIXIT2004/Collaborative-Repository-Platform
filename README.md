# VERSION CONTROL SYSTEM 🚀

A full-stack GitHub-inspired platform built with **React**, **Node.js/Express**, **MongoDB**, and **AWS S3**. It supports repository management, file versioning, issue tracking, real-time features via Socket.io, and AI-powered tools powered by **Google Gemini**.

---

## ✨ Features

- **User Authentication** — Signup, login with JWT-based sessions and bcrypt password hashing
- **Repository Management** — Create, view, update, delete, fork (copy), and toggle visibility of repositories
- **File Management** — Upload, view, and edit files inside repositories
- **Version Control (ApnaGit)** — Local CLI-style version control with `init`, `add`, `commit`, `push`, `pull`, and `revert` commands backed by AWS S3
- **Commit History** — Full commit timeline per repository with snapshot-based rollback
- **Issue Tracker** — Create and manage issues (open/closed) per repository
- **Star System** — Star/unstar repositories with live star counts
- **User Profiles** — View and update profiles, see starred repositories and contribution heatmap
- **AI Features (Gemini-powered)**
  - Auto-generate commit messages based on file diffs
  - AI code review for any file
  - Auto-generate a `README.md` for any repository
- **Real-time** — Socket.io integration for live user room connections
- **Dashboard** — Browse all public repositories with last-commit timestamps

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Primer React, Vite |
| Backend | Node.js, Express 5, Yargs (CLI) |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT, bcryptjs |
| Storage | AWS S3 (push/pull commits) |
| AI | Google Gemini (`@google/generative-ai`) |
| Real-time | Socket.io |
| Dev Tools | Nodemon, Oxlint |

---

## 📁 Project Structure

```
git-hubP/
├── backend/
│   ├── config/
│   │   └── aws-config.js         # AWS S3 configuration
│   ├── controllers/
│   │   ├── userController.js     # Auth, profile, stars
│   │   ├── repoController.js     # Repository CRUD + fork
│   │   ├── commitController.js   # Commit creation & history
│   │   ├── fileController.js     # File CRUD
│   │   ├── issueController.js    # Issue management
│   │   ├── aiController.js       # Gemini AI features
│   │   ├── init.js               # CLI: init repo
│   │   ├── add.js                # CLI: stage files
│   │   ├── commit.js             # CLI: commit
│   │   ├── push.js               # CLI: push to S3
│   │   ├── pull.js               # CLI: pull from S3
│   │   └── revert.js             # CLI: revert commit
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── authorizeMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── repoModel.js
│   │   ├── commitModel.js
│   │   ├── issueModel.js
│   │   ├── versionModel.js
│   │   └── File.js
│   ├── routes/
│   │   ├── main.router.js
│   │   ├── user.router.js
│   │   ├── repo.router.js
│   │   ├── commit.router.js
│   │   ├── file.router.js
│   │   ├── issue.router.js
│   │   └── ai.router.js
│   ├── services/
│   │   ├── VersionControl.js     # Snapshot-based commit engine
│   │   └── gemini.service.js     # Gemini API wrapper
│   ├── utils/
│   │   ├── createSnapshot.js     # File snapshot utility
│   │   └── prompts.js            # AI prompt templates
│   └── index.js                  # Entry point (server + CLI)
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── auth/             # Login, Signup
    │   │   ├── dashboard/        # Repository feed
    │   │   ├── repository/       # Repo view, files, commits
    │   │   ├── file/             # File viewer/editor
    │   │   ├── create/           # Create repository form
    │   │   ├── user/             # Profile, HeatMap
    │   │   └── Navbar.jsx
    │   ├── api/
    │   │   └── ai.js             # AI API calls
    │   ├── authContext.jsx       # Auth state management
    │   ├── Routes.jsx            # App routing
    │   └── main.jsx
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- AWS account with an S3 bucket
- Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/git-hubP.git
cd git-hubP
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3002
JWT_SECRET_KEY=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Update `config/aws-config.js` with your S3 bucket name:

```js
const S3_BUCKET = "your-s3-bucket-name";
```

Start the server:

```bash
npm start
```

The server runs on `http://localhost:3002`.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

---

## 🖥 CLI Usage (ApnaGit)

The backend also supports a Git-like CLI for local version control synced to AWS S3.

```bash
# Initialize a new local repository
node index.js init

# Stage a file
node index.js add <filename>

# Commit staged files
node index.js commit "your commit message"

# Push commits to AWS S3
node index.js push

# Pull commits from AWS S3
node index.js pull

# Revert to a specific commit
node index.js revert <commitID>
```

---

## 🔌 API Reference

### Auth & Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login and receive JWT |
| GET | `/userProfile/:id` | Get user profile |
| PUT | `/updateProfile/:id` | Update profile |
| DELETE | `/deleteProfile/:id` | Delete account |
| POST | `/star` | Star/unstar a repository |
| GET | `/starred/:userId` | Get starred repositories |

### Repositories

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/repo/create` | Create a repository |
| GET | `/repo/all` | Get all repositories |
| GET | `/repo/:id` | Get repository by ID |
| GET | `/repo/name/:name` | Get repository by name |
| GET | `/repo/user/:userID` | Get user's repositories |
| PUT | `/repo/update/:id` | Update repository |
| DELETE | `/repo/delete/:id` | Delete repository |
| PATCH | `/repo/toggle/:id` | Toggle public/private |
| POST | `/repo/copy/:repoId` | Fork a repository |

### Files

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/file/:repoId` | List files in repository |
| POST | `/file/` | Upload a file |
| PUT | `/file/:fileId` | Update file content |
| DELETE | `/file/:fileId` | Delete a file |

### Commits

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/commit/create` | Create a commit |
| GET | `/commit/:repoId` | Get commit history |
| POST | `/commit/revert` | Revert to a commit |

### Issues

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/issue/create` | Open an issue |
| GET | `/issue/:repoId` | List issues |
| PATCH | `/issue/close/:id` | Close an issue |

### AI (Gemini)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai/commit-message` | Generate a commit message |
| POST | `/ai/review` | AI code review |
| POST | `/ai/readme` | Generate README for a repo |

---

## 🗄 Data Models

**User** — `username`, `email`, `password`, `repositories[]`, `followedUsers[]`, `starRepos[]`

**Repository** — `name`, `description`, `visibility`, `owner`, `issues[]`, `stars`, `headCommit`

**Commit** — `repo`, `author`, `message`, `action`, `fileName`, `snapshot[]`, `parentCommit`, `createdAt`

**Issue** — `title`, `description`, `status (open/closed)`, `repository`

**File** — `name`, `content`, `repo`, `createdBy`

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `PORT` | Server port (default: 3002) |
| `JWT_SECRET_KEY` | Secret for signing JWTs |
| `GEMINI_API_KEY` | Google Gemini API key |

AWS credentials should be configured via the AWS CLI or environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`).

> ⚠️ **Security Note:** Never commit your `.env` file. Rotate all credentials before pushing to a public repository.

---

## 👤 Author

**Anubhav Dixit**

---

## 📄 License

This project is licensed under the ISC License.
