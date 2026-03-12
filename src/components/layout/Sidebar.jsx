import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard, CheckSquare, FileText,
    Brain, User, Settings, LogOut
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const navItems = [
    { to: '/',         icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/tasks',    icon: CheckSquare,     label: 'Tasks'     },
    { to: '/notes',    icon: FileText,        label: 'Notes'     },
    { to: '/quiz',     icon: Brain,           label: 'Quiz'      },
    { to: '/profile',  icon: User,            label: 'Profile'   },
    { to: '/settings', icon: Settings,        label: 'Settings'  },
]

const Sidebar = ({ isOpen, onClose }) => {
    const { logout, currentUser } = useAuth()
    const navigate = useNavigate()
    const isMobile = window.innerWidth < 768

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <>
            {isMobile && isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed', inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 20,
                    }}
                />
            )}

            <aside style={{
                position: 'fixed',
                top: '64px', left: 0,
                height: 'calc(100% - 64px)',
                width: '256px',
                backgroundColor: 'var(--bg-secondary)',
                borderRight: '1px solid var(--border-color)',
                zIndex: 30,
                overflowY: 'auto',
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
            }}>

                {/* Role badge */}
                <div style={{ padding: '12px 16px 4px' }}>
          <span style={{
              padding: '4px 10px',
              borderRadius: '999px',
              fontSize: '11px',
              fontWeight: '600',
              backgroundColor: currentUser?.role === 'teacher'
                  ? '#fef3c7' : '#dbeafe',
              color: currentUser?.role === 'teacher'
                  ? '#d97706' : '#2563eb',
          }}>
            {currentUser?.role === 'teacher' ? '👩‍🏫 Teacher' : '👨‍🎓 Student'}
          </span>
                </div>

                {/* Nav links */}
                <nav style={{
                    padding: '8px 16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    flex: 1,
                }}>
                    {navItems.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            onClick={isMobile ? onClose : undefined}
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontSize: '14px',
                                fontWeight: '500',
                                backgroundColor: isActive ? 'var(--accent-light)' : 'transparent',
                                color: isActive ? 'var(--accent-text)' : 'var(--text-secondary)',
                                transition: 'background 0.15s',
                            })}
                        >
                            <Icon size={18} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Logout button — pinned to bottom */}
                <div style={{
                    padding: '16px',
                    borderTop: '1px solid var(--border-color)',
                }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            color: 'var(--danger)',
                            transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fee2e2'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

            </aside>
        </>
    )
}

export default Sidebar