const Footer = () => {
    return (
        <footer style={{
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: '1px solid var(--border-color)',
        }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                © {new Date().getFullYear()} StudyHub — Stay focused, stay ahead. 👽🍀🤖
            </p>
        </footer>
    )
}

export default Footer