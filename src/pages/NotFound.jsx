import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            backgroundColor: '#f9fafb',
        }}>
            <div style={{ fontSize: '80px', marginBottom: '16px' }}>📚</div>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#111827' }}>
                404
            </h1>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '24px' }}>
                Oops! This page doesn't exist.
            </p>
            <Button onClick={() => navigate('/')}>
                Back to Dashboard
            </Button>
        </div>
    )
}

export default NotFound