# BitHub — Collaborative Repository Platform

A full-stack code hosting platform with a custom-built version control engine, AI-powered developer tools, and AWS S3 remote sync — inspired by GitHub, built from scratch.

> Built with React, Node.js/Express, MongoDB, AWS S3, Google Gemini, and Socket.io.

---

## What This Project Does

Most developers build CRUD apps. This project goes a layer deeper — implementing the core primitives of a version control system (staging, commits, snapshots, revert, remote push/pull) alongside a full web platform for hosting and collaborating on code.

The version control engine (`BitHub`) works as both a **CLI tool** and a **web-backed API**, storing full file snapshots per commit with a linked parent chain — similar in concept to how Git stores trees, just without branching or diffing (yet).

---

## ✨ Features

**Platform**
- JWT-based auth with bcrypt password hashing
- Create, fork, delete, and toggle visibility of repositories
- Star/unstar repositories with live star counts
- User profiles with contribution heatmap
- Issue tracker (open/close) per repository
- Dashboard with all public repositories and last-commit timestamps
- Real-time user rooms via Socket.io

**Version Control Engine (BitHub)**
- CLI commands: `init`, `add`, `commit`, `push`, `pull`, `revert`
- Snapshot-based commit history (full file state per commit)
- Linked commit chain with `parentCommit` pointer
- Single HEAD pointer per repository
- AWS S3 as the remote store for push/pull

**AI Tools (Google Gemini)**
- Auto-generate commit messages from file changes
- Auto-generate a `README.md` for any repository based on its files
- **RepoChat** — AI assistant that answers questions about any repository's codebase using Google Gemini. Ask "how does auth work?" and get answers grounded in the actual files.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6, Primer React, Vite |
| Backend | Node.js, Express 5, Yargs (CLI) |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT, bcryptjs |
| Storage | AWS S3 |
| AI | Google Gemini (`@google/generative-ai`) |
| Real-time | Socket.io |

---

## 📁 Project Structure

```
git-hubP/
├── backend/
│   ├── config/
│   │   └── aws-config.js         # AWS S3 setup
│   ├── controllers/
│   │   ├── userController.js     # Auth, profiles, stars
│   │   ├── repoController.js     # Repository CRUD + fork
│   │   ├── commitController.js   # Commit creation & history
│   │   ├── fileController.js     # File CRUD
│   │   ├── issueController.js    # Issue management
│   │   ├── aiController.js       # Gemini AI features
│   │   ├── init.js               # CLI: init
│   │   ├── add.js                # CLI: stage
│   │   ├── commit.js             # CLI: commit
│   │   ├── push.js               # CLI: push to S3
│   │   ├── pull.js               # CLI: pull from S3
│   │   └── revert.js             # CLI: revert
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── authorizeMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   ├── repoModel.js
│   │   ├── commitModel.js
│   │   ├── issueModel.js
│   │   └── File.js
│   ├── routes/
│   │   ├── user.router.js
│   │   ├── repo.router.js
│   │   ├── commit.router.js
│   │   ├── file.router.js
│   │   ├── issue.router.js
│   │   └── ai.router.js
│   ├── services/
│   │   ├── VersionControl.js     # Core commit engine
│   │   └── gemini.service.js     # Gemini API wrapper
│   ├── utils/
│   │   ├── createSnapshot.js
│   │   └── prompts.js            # AI prompt templates
│   └── index.js                  # Server + CLI entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── auth/             # Login, Signup
        │   ├── dashboard/        # Repository feed
        │   ├── repository/       # Repo view, files, commits
        │   ├── file/             # File viewer/editor
        │   ├── create/           # Create repository
        │   └── user/             # Profile, HeatMap
        ├── api/ai.js
        ├── authContext.jsx
        └── Routes.jsx
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

Create a `.env` file in `backend/`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3002
JWT_SECRET_KEY=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Update `config/aws-config.js` with your S3 bucket name, then start the server:

```bash
npm start
# Server runs on http://localhost:3002
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🖥 CLI Usage (BitHub)

The backend doubles as a CLI for local version control synced to S3:

```bash
node index.js init                        # Initialize a repository
node index.js add <filename>              # Stage a file
node index.js commit "your message"       # Commit staged files
node index.js push                        # Push commits to S3
node index.js pull                        # Pull commits from S3
node index.js revert <commitID>           # Revert to a past commit
```

---

## 🔌 API Reference

### Auth & Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register |
| POST | `/login` | Login, receive JWT |
| GET | `/userProfile/:id` | Get profile |
| PUT | `/updateProfile/:id` | Update profile |
| DELETE | `/deleteProfile/:id` | Delete account |
| POST | `/star` | Star / unstar a repo |
| GET | `/starred/:userId` | Get starred repos |

### Repositories
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/repo/create` | Create repository |
| GET | `/repo/all` | All repositories |
| GET | `/repo/:id` | Get by ID |
| GET | `/repo/user/:userID` | User's repositories |
| DELETE | `/repo/delete/:id` | Delete repository |
| PATCH | `/repo/toggle/:id` | Toggle public/private |
| POST | `/repo/copy/:repoId` | Fork repository |

### Files
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/file/:repoId` | List files |
| POST | `/file/` | Upload file |
| PUT | `/file/:fileId` | Update file |
| DELETE | `/file/:fileId` | Delete file |

### Commits
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/commit/create` | Create commit |
| GET | `/commit/:repoId` | Commit history |
| POST | `/commit/revert` | Revert to commit |

### Issues
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/issue/create` | Open issue |
| GET | `/issue/:repoId` | List issues |
| PATCH | `/issue/close/:id` | Close issue |

### AI
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/ai/commit-message` | Generate commit message |
| POST | `/ai/review` | Code review |
| POST | `/ai/readme` | Generate README |
| POST | `/ai/repo-assistant` | RepoChat — ask questions about any repo |

---

## 🗄 Data Models

**User** — `username`, `email`, `password (hashed)`, `repositories[]`, `followedUsers[]`, `starRepos[]`

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
| `JWT_SECRET_KEY` | JWT signing secret |
| `GEMINI_API_KEY` | Google Gemini API key |

AWS credentials should be set via AWS CLI or `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` environment variables.

> ⚠️ Never commit your `.env` file. Add it to `.gitignore` and rotate any exposed credentials before pushing publicly.

---

## 🔭 What's Not Implemented (Yet)

This project intentionally focuses on core platform and version control primitives. The following are known limitations and planned improvements:

- **Branching** — Currently single linear history per repo (one HEAD pointer)
- **Diff generation** — Commits store full snapshots; delta computation is not yet implemented
- **Merge / conflict resolution** — No multi-branch merging
- **Distributed sync protocol** — S3 push/pull is a backup mechanism, not a true distributed VCS protocol

These are the natural next steps for anyone looking to contribute or extend the project.

---

## 👤 Author

**Anubhav Dixit**

---

## 📄 License

ISC License
