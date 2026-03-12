const variants = {
    primary: {
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
    },
    secondary: {
        backgroundColor: 'white',
        color: '#4b5563',
        border: '1px solid #e5e7eb',
    },
    danger: {
        backgroundColor: '#fee2e2',
        color: '#dc2626',
        border: 'none',
    },
    ghost: {
        backgroundColor: 'transparent',
        color: '#4b5563',
        border: 'none',
    },
}

const Button = ({
                    children,
                    onClick,
                    variant = 'primary',
                    size = 'md',
                    disabled = false,
                    style = {},
                }) => {
    const sizeStyles = {
        sm: { padding: '6px 12px', fontSize: '13px' },
        md: { padding: '8px 16px', fontSize: '14px' },
        lg: { padding: '12px 24px', fontSize: '15px' },
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                ...variants[variant],
                ...sizeStyles[size],
                borderRadius: '8px',
                fontWeight: '500',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
                transition: 'opacity 0.15s, transform 0.1s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                ...style,
            }}
        >
            {children}
        </button>
    )
}

export default Button