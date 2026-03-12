const UserAvatar = ({ name = '', size = 48, style = {} }) => {
    // Get initials from name — e.g. "John Doe" → "JD"
    const initials = name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    // Generate a consistent color from name
    const colors = [
        '#4f46e5', '#7c3aed', '#db2777',
        '#ea580c', '#059669', '#0284c7',
    ]
    const colorIndex = name.charCodeAt(0) % colors.length
    const bgColor = colors[colorIndex] || '#4f46e5'

    return (
        <div style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            backgroundColor: bgColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: `${size * 0.35}px`,
            flexShrink: 0,
            userSelect: 'none',
            ...style,
        }}>
            {initials || '?'}
        </div>
    )
}

export default UserAvatar