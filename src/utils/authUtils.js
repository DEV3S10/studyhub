// ============================================
// Simple but realistic JWT-like auth system
// ============================================

const SECRET_KEY = 'studyhub-secret-2024'

// Hash a password using btoa (Base64)
// In production you'd use bcrypt on a server
export const hashPassword = (password) => {
    return btoa(`${SECRET_KEY}:${password}`)
}

// Verify a password against its hash
export const verifyPassword = (password, hash) => {
    return hashPassword(password) === hash
}

// Create a JWT-like token
export const createToken = (payload) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const data   = btoa(JSON.stringify({
        ...payload,
        iat: Date.now(),                      // issued at
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // expires in 7 days
    }))
    const signature = btoa(`${header}.${data}.${SECRET_KEY}`)
    return `${header}.${data}.${signature}`
}

// Decode a token and return its payload
export const decodeToken = (token) => {
    try {
        const [, data] = token.split('.')
        return JSON.parse(atob(data))
    } catch {
        return null
    }
}

// Check if a token is still valid (not expired)
export const isTokenValid = (token) => {
    if (!token) return false
    const payload = decodeToken(token)
    if (!payload) return false
    return payload.exp > Date.now()
}

// Get all users from LocalStorage
export const getUsers = () => {
    try {
        return JSON.parse(localStorage.getItem('studyhub-users') || '[]')
    } catch {
        return []
    }
}

// Save users to LocalStorage
export const saveUsers = (users) => {
    localStorage.setItem('studyhub-users', JSON.stringify(users))
}

// Register a new user
export const registerUser = ({ name, email, password, role }) => {
    const users = getUsers()

    // Check if email already exists
    if (users.find(u => u.email === email)) {
        throw new Error('Email already registered!')
    }

    const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password: hashPassword(password),
        role, // 'teacher' or 'student'
        createdAt: new Date().toISOString(),
    }

    saveUsers([...users, newUser])
    return newUser
}

// Login a user
export const loginUser = ({ email, password }) => {
    const users = getUsers()
    const user = users.find(u => u.email === email)

    if (!user) throw new Error('No account found with this email!')
    if (!verifyPassword(password, user.password)) {
        throw new Error('Incorrect password!')
    }

    // Create token with user data (never include password!)
    const token = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    })

    return { user, token }
}