# 📚 StudyHub — Student Productivity Web App

> A modern, full-featured student productivity platform built with React, Vite, and Tailwind CSS.

![StudyHub Banner](https://via.placeholder.com/1200x400/6366f1/ffffff?text=StudyHub+%E2%80%94+Your+Study+Companion)

---

## 🌟 Overview

StudyHub is a comprehensive student productivity web app that helps students stay organized, focused, and on track. With task management, note-taking, quiz tools, and progress tracking all in one place — it's the ultimate study companion.

---

## ✨ Features

- **📋 Task Management** — Create, edit, filter, and track tasks with status badges (To Do, In Progress, Done)
- **📝 Note Taking** — Rich note editor with tag-based filtering and search
- **🧠 Quiz System** — Build and take quizzes; get scored results instantly
- **📊 Progress Tracking** — Visual charts (Chart.js) showing study activity over time
- **👤 User Profile** — Manage your name, avatar, and preferences
- **⚙️ Settings** — Customize themes and app behavior
- **💾 Persistent Data** — All data saved to LocalStorage; works offline
- **📱 Responsive Design** — Mobile-first layout with Tailwind CSS

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **React 18** | UI component framework |
| **Vite** | Lightning-fast build tool |
| **React Router v6** | Client-side routing |
| **Context API** | Global state management |
| **Tailwind CSS** | Utility-first styling |
| **Chart.js + react-chartjs-2** | Progress/activity charts |
| **Lucide React** | Icon library |
| **LocalStorage** | Client-side data persistence |

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js v18+ ([Download here](https://nodejs.org))
- npm v9+

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/studyhub.git
cd studyhub
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

Open your browser at **http://localhost:5173**

### Step 4: Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
studyhub/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx       # Main app shell with sidebar + navbar
│   │   │   ├── Navbar.jsx          # Top navigation bar
│   │   │   ├── Sidebar.jsx         # Left navigation sidebar
│   │   │   └── Footer.jsx          # App footer
│   │   ├── tasks/
│   │   │   ├── TaskList.jsx        # Renders list of TaskCards
│   │   │   ├── TaskCard.jsx        # Individual task display
│   │   │   ├── AddTaskForm.jsx     # Form to create new tasks
│   │   │   ├── TaskFilter.jsx      # Filter tasks by status
│   │   │   ├── TaskSearch.jsx      # Search tasks by keyword
│   │   │   ├── TaskStatusBadge.jsx # Colored badge for task status
│   │   │   └── EditTaskModal.jsx   # Modal for editing tasks
│   │   ├── notes/
│   │   │   ├── NotesList.jsx       # Grid/list of notes
│   │   │   ├── NoteCard.jsx        # Individual note card
│   │   │   ├── NoteEditor.jsx      # Create/edit note content
│   │   │   ├── AddNoteButton.jsx   # Floating action button
│   │   │   └── TagFilter.jsx       # Filter notes by tags
│   │   ├── quiz/
│   │   │   ├── QuizList.jsx        # All available quizzes
│   │   │   ├── QuizCard.jsx        # Quiz preview card
│   │   │   ├── QuizQuestion.jsx    # Single question display
│   │   │   ├── AnswerOption.jsx    # Clickable answer choice
│   │   │   └── QuizResult.jsx      # Score screen after quiz
│   │   ├── user/
│   │   │   ├── UserProfile.jsx     # Profile display
│   │   │   ├── UserAvatar.jsx      # Avatar with initials fallback
│   │   │   └── EditProfileForm.jsx # Form to edit profile info
│   │   └── ui/
│   │       ├── Button.jsx          # Reusable button with variants
│   │       └── Modal.jsx           # Reusable modal wrapper
│   ├── pages/
│   │   ├── Dashboard.jsx           # Home overview page
│   │   ├── Tasks.jsx               # Tasks management page
│   │   ├── Notes.jsx               # Notes page
│   │   ├── Quiz.jsx                # Quiz page
│   │   ├── Profile.jsx             # User profile page
│   │   └── Settings.jsx            # App settings page
│   ├── context/
│   │   ├── TaskContext.jsx         # Task CRUD + state
│   │   ├── NoteContext.jsx         # Notes CRUD + state
│   │   ├── QuizContext.jsx         # Quiz state
│   │   └── UserContext.jsx         # User profile state
│   ├── hooks/
│   │   ├── useLocalStorage.js      # Persist state to localStorage
│   │   ├── useTasks.js             # Task-related logic
│   │   └── useSearch.js            # Reusable search/filter logic
│   ├── utils/
│   │   ├── localStorage.js         # Read/write helper functions
│   │   ├── dateUtils.js            # Date formatting helpers
│   │   └── constants.js            # App-wide constants
│   ├── App.jsx                     # Root app + router setup
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Tailwind directives
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## 🖼️ Screenshots

> *(Add screenshots here after building the app)*

| Dashboard | Tasks | Notes |
|-----------|-------|-------|
| ![Dashboard](https://via.placeholder.com/400x250/6366f1/fff?text=Dashboard) | ![Tasks](https://via.placeholder.com/400x250/10b981/fff?text=Tasks) | ![Notes](https://via.placeholder.com/400x250/f59e0b/fff?text=Notes) |

| Quiz | Profile | Settings |
|------|---------|----------|
| ![Quiz](https://via.placeholder.com/400x250/ef4444/fff?text=Quiz) | ![Profile](https://via.placeholder.com/400x250/8b5cf6/fff?text=Profile) | ![Settings](https://via.placeholder.com/400x250/3b82f6/fff?text=Settings) |

---

## 🗺️ Development Roadmap

### ✅ Phase 1 — Foundation (Steps 1–3)
- [x] Project setup with Vite + React
- [x] Folder structure
- [x] Tailwind CSS configuration
- [x] React Router setup
- [x] Layout components (Navbar, Sidebar, Footer)

### 🔄 Phase 2 — Core Features (Steps 4–7)
- [ ] Task management with CRUD
- [ ] Context API + LocalStorage
- [ ] Notes with tags
- [ ] Quiz system

### 🔮 Phase 3 — Polish (Steps 8–10)
- [ ] Dashboard with Chart.js
- [ ] User profile
- [ ] Settings page
- [ ] Animations + transitions

### 🚀 Phase 4 — Portfolio Level (Bonus)
- [ ] Dark mode toggle
- [ ] Export notes as PDF
- [ ] Pomodoro timer
- [ ] Backend integration (Firebase/Supabase)

---

## 💡 Future Improvements

These additions would make StudyHub portfolio-level impressive:

1. **🔥 Firebase Backend** — Real auth, cloud sync, multi-device support
2. **🌙 Dark Mode** — Theme toggle with CSS variables
3. **⏱️ Pomodoro Timer** — Built-in focus session timer
4. **📄 PDF Export** — Export notes or quiz results as PDFs
5. **🔔 Notifications** — Reminders for upcoming tasks/quizzes
6. **🤝 Collaboration** — Share notes or quizzes with classmates
7. **📱 PWA Support** — Installable as a mobile app
8. **🧪 Unit Tests** — Jest + React Testing Library coverage
9. **♿ Accessibility** — ARIA labels, keyboard navigation
10. **🌐 i18n** — Multi-language support

---

## 🐙 GitHub Instructions

### Initialize Git and Push to GitHub

```bash
# 1. Initialize git in your project folder
git init

# 2. Add all files
git add .

# 3. First commit
git commit -m "feat: initial project setup with Vite + React"

# 4. Create a new repo on github.com (don't add README)
# Then connect your local repo:
git remote add origin https://github.com/YOUR_USERNAME/studyhub.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

### Good Commit Message Examples

```bash
# Feature additions
git commit -m "feat: add TaskCard component with status badge"
git commit -m "feat: implement note editor with tag support"
git commit -m "feat: add quiz result screen with score calculation"

# Bug fixes
git commit -m "fix: correct task filter not updating on status change"
git commit -m "fix: resolve note save not persisting to localStorage"

# Improvements
git commit -m "style: improve Dashboard layout for mobile screens"
git commit -m "refactor: extract useLocalStorage into custom hook"
git commit -m "docs: update README with installation steps"

# Chores
git commit -m "chore: add .gitignore for node_modules"
git commit -m "chore: configure Tailwind content paths"
```

### Recommended .gitignore

```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
```

---

## 👨‍💻 Making This Portfolio-Level

To impress recruiters and stand out on GitHub:

1. **Write a compelling README** (this file!) with screenshots and demo GIF
2. **Deploy it live** on [Vercel](https://vercel.com) or [Netlify](https://netlify.com) — free!
3. **Add a live demo link** at the top of your README
4. **Use GitHub Projects** to track your development tasks
5. **Write meaningful commits** that show your thinking process
6. **Add tests** to show professionalism
7. **Star your own repo** and share it on LinkedIn

---

## 📄 License

MIT License — free to use and modify.

---

## 🙌 Acknowledgements

Built step by step as a learning project with React best practices.

> *"The best way to learn React is to build something real."*