import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const UserContext = createContext()

const DEFAULT_USER = {
    name: 'Student',
    email: 'student@studyhub.com',
    bio: 'Passionate learner on a mission to ace every exam!',
    subject: 'General Studies',
    avatar: null,
    joinedAt: new Date().toISOString(),
}

export const UserProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('studyhub-user', DEFAULT_USER)

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }))
    }

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}