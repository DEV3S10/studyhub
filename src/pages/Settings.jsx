import { useUser } from '../context/UserContext'
import { useTasks } from '../context/TaskContext'
import { useNotes } from '../context/NoteContext'
import Button from '../components/ui/Button'
import { useTheme } from '../context/ThemeContext'

const SettingRow = ({ title, description, children }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        borderBottom: '1px solid #f3f4f6',
        gap: '16px',
        flexWrap: 'wrap',
    }}>
        <div>
            <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>{title}</p>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{description}</p>
        </div>
        {children}
    </div>
)

const Settings = () => {
    const { user, updateUser } = useUser()
    const { isDark, toggleTheme } = useTheme()

    const handleClearTasks = () => {
        if (window.confirm('Delete ALL tasks? This cannot be undone.')) {
            localStorage.removeItem('studyhub-tasks')
            window.location.reload()
        }
    }

    const handleClearNotes = () => {
        if (window.confirm('Delete ALL notes? This cannot be undone.')) {
            localStorage.removeItem('studyhub-notes')
            window.location.reload()
        }
    }

    const handleClearAll = () => {
        if (window.confirm('Reset EVERYTHING? All data will be lost!')) {
            localStorage.clear()
            window.location.reload()
        }
    }

    const sectionStyle = {
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        marginBottom: '20px',
    }

    const sectionTitle = {
        fontSize: '16px',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '4px',
    }

    const sectionSubtitle = {
        fontSize: '13px',
        color: '#6b7280',
        marginBottom: '16px',
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                    Settings
                </h1>
                <p style={{ color: '#6b7280', marginTop: '2px', fontSize: '14px' }}>
                    Manage your app preferences
                </p>
            </div>

            {/* Account section */}
            <div style={sectionStyle}>
                <p style={sectionTitle}>👤 Account</p>
                <p style={sectionSubtitle}>Your personal information</p>

                <SettingRow title="Display Name" description="How your name appears in the app">
          <span style={{
              padding: '6px 14px',
              backgroundColor: '#f3f4f6',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#374151',
          }}>
            {user.name}
          </span>
                </SettingRow>

                <SettingRow title="Subject" description="Your main area of study">
          <span style={{
              padding: '6px 14px',
              backgroundColor: '#eef2ff',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#4f46e5',
          }}>
            {user.subject}
          </span>
                </SettingRow>
                <SettingRow
                    title="Dark Mode"
                    description="Switch between light and dark theme"
                >
                    <button
                        onClick={toggleTheme}
                        style={{
                            width: '52px',
                            height: '28px',
                            borderRadius: '999px',
                            border: 'none',
                            backgroundColor: isDark ? 'var(--accent)' : 'var(--border-color)',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'background 0.3s',
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '3px',
                            left: isDark ? '27px' : '3px',
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            transition: 'left 0.3s',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                        }} />
                    </button>
                </SettingRow>
            </div>

            {/* Data section */}
            <div style={sectionStyle}>
                <p style={sectionTitle}>💾 Data Management</p>
                <p style={sectionSubtitle}>Manage your stored data</p>

                <SettingRow
                    title="Clear All Tasks"
                    description="Permanently delete all your tasks"
                >
                    <Button variant="danger" size="sm" onClick={handleClearTasks}>
                        Clear Tasks
                    </Button>
                </SettingRow>

                <SettingRow
                    title="Clear All Notes"
                    description="Permanently delete all your notes"
                >
                    <Button variant="danger" size="sm" onClick={handleClearNotes}>
                        Clear Notes
                    </Button>
                </SettingRow>

                <SettingRow
                    title="Reset Everything"
                    description="Wipe all data and start fresh"
                >
                    <Button variant="danger" size="sm" onClick={handleClearAll}>
                        Reset App
                    </Button>
                </SettingRow>
            </div>

            {/* About section */}
            <div style={sectionStyle}>
                <p style={sectionTitle}>ℹ️ About</p>
                <p style={sectionSubtitle}>App information</p>

                <SettingRow title="Version" description="Current app version">
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>v1.0.0</span>
                </SettingRow>

                <SettingRow title="Storage" description="Where your data is saved">
                    <span style={{ fontSize: '14px', color: '#6b7280' }}>LocalStorage</span>
                </SettingRow>
            </div>
        </div>
    )
}

export default Settings