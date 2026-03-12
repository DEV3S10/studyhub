import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isLoggedIn, currentUser, loading } = useAuth()

    // Still checking token validity
    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-primary)',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>📚</div>
                    <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
                </div>
            </div>
        )
    }

    // Not logged in — redirect to login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    // Logged in but wrong role
    if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser?.role)) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute