import { createContext, useContext, useState, useEffect } from 'react'
import {
    loginUser,
    registerUser,
    isTokenValid,
    decodeToken,
} from '../utils/authUtils'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken]       = useState(localStorage.getItem('studyhub-token'))
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading]   = useState(true)

    // On app load — check if existing token is still valid
    useEffect(() => {
        const savedToken = localStorage.getItem('studyhub-token')
        if (savedToken && isTokenValid(savedToken)) {
            const payload = decodeToken(savedToken)
            setCurrentUser(payload)
            setToken(savedToken)
        } else {
            // Token expired — clear everything
            localStorage.removeItem('studyhub-token')
            setCurrentUser(null)
            setToken(null)
        }
        setLoading(false)
    }, [])

    // REGISTER
    const register = async ({ name, email, password, role }) => {
        const user = registerUser({ name, email, password, role })
        const { token: newToken } = loginUser({ email, password })
        localStorage.setItem('studyhub-token', newToken)
        setToken(newToken)
        setCurrentUser(decodeToken(newToken))
        return user
    }

    // LOGIN
    const login = async ({ email, password }) => {
        const { token: newToken } = loginUser({ email, password })
        localStorage.setItem('studyhub-token', newToken)
        setToken(newToken)
        setCurrentUser(decodeToken(newToken))
    }

    // LOGOUT
    const logout = () => {
        localStorage.removeItem('studyhub-token')
        setToken(null)
        setCurrentUser(null)
    }

    // Helper flags
    const isLoggedIn  = !!currentUser && isTokenValid(token)
    const isTeacher   = currentUser?.role === 'teacher'
    const isStudent   = currentUser?.role === 'student'

    return (
        <AuthContext.Provider value={{
            currentUser,
            token,
            loading,
            isLoggedIn,
            isTeacher,
            isStudent,
            login,
            register,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}