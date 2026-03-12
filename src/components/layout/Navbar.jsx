import { useState } from 'react'
import { BookOpen, Bell, Menu, CheckSquare, Sun, Moon } from 'lucide-react'
import { useUser } from '../../context/UserContext'
import { useTasks } from '../../context/TaskContext'
import { useTheme } from '../../context/ThemeContext'
import UserAvatar from '../user/UserAvatar'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ onMenuClick, sidebarOpen }) => {
    const { user } = useUser()
    const { tasks } = useTasks()
    const { isDark, toggleTheme } = useTheme()
    const navigate = useNavigate()
    const [showNotifications, setShowNotifications] = useState(false)

    const notifications = tasks.filter(t => t.status !== 'done').slice(0, 5)
    const unreadCount = notifications.length

    return (
        <>
            {/* Sidebar logo area */}
            <div style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '256px',
                height: '64px',
                backgroundColor: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-color)',
                borderRight: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                zIndex: 40,
                gap: '8px',
            }}>
                <BookOpen size={22} color="var(--accent)" />
                <span style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'var(--accent)',
                }}>
          StudyHub
        </span>
            </div>

            {/* Main navbar */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: '256px',
                right: 0,
                height: '64px',
                backgroundColor: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                zIndex: 10,
            }}>

                {/* Hamburger — mobile only */}
                <button
                    onClick={onMenuClick}
                    className="mobile-only"
                    style={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        marginRight: 'auto',
                    }}
                >
                    <Menu size={20} color="var(--text-secondary)" />
                </button>

                {/* Right side — theme + bell + avatar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginLeft: 'auto',
                    position: 'relative',
                }}>

                    {/* 🌙 Dark mode toggle */}
                    <button
                        onClick={toggleTheme}
                        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        style={{
                            padding: '8px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        {isDark
                            ? <Sun  size={20} color="#fbbf24" />
                            : <Moon size={20} color="var(--text-secondary)" />
                        }
                    </button>

                    {/* 🔔 Bell */}
                    <button
                        onClick={() => setShowNotifications(prev => !prev)}
                        style={{
                            padding: '8px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: showNotifications
                                ? 'var(--accent-light)'
                                : 'transparent',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'background 0.15s',
                        }}
                    >
                        <Bell size={20} color={
                            showNotifications ? 'var(--accent)' : 'var(--text-secondary)'
                        } />
                        {unreadCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '5px', right: '5px',
                                width: '16px', height: '16px',
                                backgroundColor: 'var(--danger)',
                                borderRadius: '50%',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                {unreadCount}
              </span>
                        )}
                    </button>

                    {/* 👤 Avatar */}
                    <button
                        onClick={() => navigate('/profile')}
                        title="Go to Profile"
                        style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            borderRadius: '50%',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                        <UserAvatar name={user.name} size={36} />
                    </button>

                    {/* 🔔 Notifications panel */}
                    {showNotifications && (
                        <>
                            <div
                                onClick={() => setShowNotifications(false)}
                                style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '52px',
                                right: 0,
                                width: '320px',
                                backgroundColor: 'var(--bg-secondary)',
                                borderRadius: '16px',
                                border: '1px solid var(--border-color)',
                                boxShadow: `0 8px 30px var(--shadow)`,
                                zIndex: 50,
                                overflow: 'hidden',
                                animation: 'slideUp 0.2s ease',
                            }}>

                                {/* Panel header */}
                                <div style={{
                                    padding: '16px 20px',
                                    borderBottom: '1px solid var(--border-color)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}>
                                    <h3 style={{
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        color: 'var(--text-primary)',
                                    }}>
                                        Pending Tasks
                                    </h3>
                                    {unreadCount > 0 && (
                                        <span style={{
                                            padding: '2px 8px',
                                            backgroundColor: '#fee2e2',
                                            color: 'var(--danger)',
                                            borderRadius: '999px',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                        }}>
                      {unreadCount} remaining
                    </span>
                                    )}
                                </div>

                                {/* Items */}
                                {notifications.length === 0 ? (
                                    <div style={{
                                        padding: '32px 20px',
                                        textAlign: 'center',
                                        color: 'var(--text-muted)',
                                        fontSize: '14px',
                                    }}>
                                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎉</div>
                                        All tasks completed!
                                    </div>
                                ) : (
                                    notifications.map(task => (
                                        <div
                                            key={task.id}
                                            onClick={() => { navigate('/tasks'); setShowNotifications(false) }}
                                            style={{
                                                padding: '12px 20px',
                                                borderBottom: '1px solid var(--border-color)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '12px',
                                                cursor: 'pointer',
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-hover)'}
                                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <CheckSquare size={16} color="var(--accent)" style={{ flexShrink: 0 }} />
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <p style={{
                                                    fontSize: '13px',
                                                    fontWeight: '500',
                                                    color: 'var(--text-primary)',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                    {task.title}
                                                </p>
                                                {task.dueDate && (
                                                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                                        Due: {task.dueDate}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}

                                {/* Footer */}
                                <div style={{
                                    padding: '12px 20px',
                                    borderTop: '1px solid var(--border-color)',
                                    textAlign: 'center',
                                }}>
                                    <button
                                        onClick={() => { navigate('/tasks'); setShowNotifications(false) }}
                                        style={{
                                            fontSize: '13px',
                                            color: 'var(--accent)',
                                            fontWeight: '500',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        View all tasks →
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </header>
        </>
    )
}

export default Navbar