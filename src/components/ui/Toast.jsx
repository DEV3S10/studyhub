import { useEffect } from 'react'

const TOAST_TYPES = {
    success: { backgroundColor: '#059669', emoji: '✅' },
    error:   { backgroundColor: '#ef4444', emoji: '❌' },
    info:    { backgroundColor: '#4f46e5', emoji: 'ℹ️' },
}

const Toast = ({ message, type = 'success', onClose }) => {
    const config = TOAST_TYPES[type]

    // Auto-close after 3 seconds
    useEffect(() => {
        const timer = setTimeout(onClose, 3000)
        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: config.backgroundColor,
            color: 'white',
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            zIndex: 1000,
            animation: 'slideUp 0.3s ease',
            maxWidth: '320px',
        }}>
            <span>{config.emoji}</span>
            <span>{message}</span>
            <button
                onClick={onClose}
                style={{
                    marginLeft: '8px',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '0',
                    opacity: 0.8,
                }}
            >
                ×
            </button>
        </div>
    )
}

export default Toast