# 📚 StudyHub — Student Productivity Platform

<div align="center">

![StudyHub](https://img.shields.io/badge/StudyHub-v1.0.0-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A full-featured student productivity web app built with React.**  
Manage tasks, write notes, take quizzes, and track your study progress — all in one place.

🌐 **[Live Demo](https://DEV3S10.github.io/studyhub)** &nbsp;|&nbsp; 💻 **[GitHub](https://github.com/DEV3S10/studyhub)**

</div>

---

## ✨ Features

### 🔐 Authentication
- JWT-based login and registration system
- Password hashing for security
- Persistent sessions with token expiration
- Protected routes — app only accessible after login

### 👩‍🏫 Role-Based Access
- **Teacher** — Create, manage and delete quizzes
- **Student** — Take quizzes and track scores
- Role badge visible in sidebar
- Role selected at registration

### 📋 Task Management
- Create, complete and delete tasks
- Filter by status (To Do / Done)
- Search tasks by keyword
- Priority levels (Low / Medium / High)
- Due date with overdue detection
- Data persists with LocalStorage

### 📝 Notes
- Create and edit notes with rich content
- Color-coded note cards (6 colors)
- Tag system with tag-based filtering
- Click any note to edit it

### 🧠 Quiz System
- 3 built-in quizzes to start
- Teachers can create unlimited quizzes
- Per-question answer checking with feedback
- Score screen with grade
- Best score tracking per student

### 📊 Dashboard
- Live stats (tasks, notes, quizzes)
- Weekly activity bar chart (Chart.js)
- Recent tasks preview
- Suggested quizzes panel

### 🌙 Dark Mode
- Toggle between light and dark themes
- Smooth CSS variable transitions
- Theme saved to LocalStorage

### 👤 User Profile
- Editable name, email, bio, subject
- Dynamic avatar with initials
- Study statistics overview

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| **React 18** | UI component framework |
| **Vite** | Lightning-fast build tool |
| **React Router v6** | Client-side routing & protected routes |
| **Context API** | Global state management (7 contexts) |
| **Tailwind CSS** | Utility-first styling |
| **Chart.js** | Weekly activity charts |
| **Lucide React** | Icon library |
| **LocalStorage** | Client-side data persistence |
| **JWT (custom)** | Authentication tokens |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ — [Download](https://nodejs.org)
- npm v9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/DEV3S10/studyhub.git

# 2. Navigate into the project
cd studyhub

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
studyhub/
├── src/
│   ├── components/
│   │   ├── auth/         # ProtectedRoute
│   │   ├── dashboard/    # Stats, Chart, RecentTasks
│   │   ├── layout/       # Navbar, Sidebar, Footer
│   │   ├── tasks/        # TaskList, TaskCard, Forms
│   │   ├── notes/        # NotesList, NoteCard, Editor
│   │   ├── quiz/         # QuizList, Questions, Results
│   │   ├── user/         # Profile, Avatar, EditForm
│   │   └── ui/           # Button, Modal, Toast
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── TaskContext.jsx
│   │   ├── NoteContext.jsx
│   │   ├── QuizContext.jsx
│   │   ├── UserContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Tasks.jsx
│   │   ├── Notes.jsx
│   │   ├── Quiz.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── NotFound.jsx
│   └── utils/
│       ├── authUtils.js
│       ├── constants.js
│       └── dateUtils.js
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🗺️ Roadmap

### ✅ Completed
- React Router with protected routes
- Task management with CRUD
- Notes with tags and colors
- Quiz system with scoring
- Dashboard with Chart.js
- JWT Authentication
- Dark mode
- Teacher / Student roles
- Quiz creator for teachers

### 🔮 Planned
- [ ] Firebase backend
- [ ] Pomodoro timer
- [ ] Teacher analytics
- [ ] PDF export
- [ ] PWA support

---

## 📄 License

MIT License — free to use and modify.

---

## 👨‍💻 Author

**DEV3S10**  
GitHub: [@DEV3S10](https://github.com/DEV3S10)

---

<div align="center">
  Made with ❤️ and React 👽🍀🤖
  <br/>
  <i>"The best way to learn is to build something real."</i>
</div>
