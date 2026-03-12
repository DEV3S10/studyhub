import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider }  from './context/ThemeContext'
import { ToastProvider }  from './context/ToastContext'
import { AuthProvider }   from './context/AuthContext'
import { UserProvider }   from './context/UserContext'
import { TaskProvider }   from './context/TaskContext'
import { NoteProvider }   from './context/NoteContext'
import { QuizProvider }   from './context/QuizContext'
import ProtectedRoute     from './components/auth/ProtectedRoute'
import AppLayout     from './components/layout/AppLayout'
import Dashboard     from './pages/Dashboard'
import Tasks         from './pages/Tasks'
import Notes         from './pages/Notes'
import Quiz          from './pages/Quiz'
import Profile       from './pages/Profile'
import Settings      from './pages/Settings'
import Login         from './pages/Login'
import Register      from './pages/Register'
import NotFound      from './pages/NotFound'

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <ToastProvider>
                    <AuthProvider>
                        <UserProvider>
                            <TaskProvider>
                                <NoteProvider>
                                    <QuizProvider>
                                        <Routes>

                                            {/* Public routes — no login needed */}
                                            <Route path="/login"    element={<Login />}    />
                                            <Route path="/register" element={<Register />} />

                                            {/* Protected routes — login required */}
                                            <Route path="/" element={
                                                <ProtectedRoute>
                                                    <AppLayout />
                                                </ProtectedRoute>
                                            }>
                                                <Route index          element={<Dashboard />} />
                                                <Route path="tasks"    element={<Tasks />}    />
                                                <Route path="notes"    element={<Notes />}    />
                                                <Route path="quiz"     element={<Quiz />}     />
                                                <Route path="profile"  element={<Profile />}  />
                                                <Route path="settings" element={<Settings />} />
                                            </Route>

                                            <Route path="*" element={<NotFound />} />
                                        </Routes>
                                    </QuizProvider>
                                </NoteProvider>
                            </TaskProvider>
                        </UserProvider>
                    </AuthProvider>
                </ToastProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App