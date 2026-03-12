import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpen, Mail, Lock, Eye, EyeOff } from 'lucide-react'

const Login = () => {
    const { login } = useAuth()
    const navigate  = useNavigate()

    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError]     = useState('')
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            return setError('Please fill in all fields!')
        }
        try {
            setLoading(true)
            await login(form)
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const inputStyle = {
        width: '100%',
        padding: '12px 16px 12px 44px',
        borderRadius: '10px',
        border: '1px solid var(--border-color)',
        fontSize: '14px',
        outline: 'none',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        boxSizing: 'border-box',
    }

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '420px',
            }}>

                {/* Logo */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '32px',
                }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        backgroundColor: 'var(--accent)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                    }}>
                        <BookOpen size={28} color="white" />
                    </div>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: 'var(--text-primary)',
                    }}>
                        Welcome back!
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Sign in to your StudyHub account
                    </p>
                </div>

                {/* Form card */}
                <div style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '20px',
                    padding: '32px',
                    border: '1px solid var(--border-color)',
                    boxShadow: `0 4px 24px var(--shadow)`,
                }}>

                    {/* Error message */}
                    {error && (
                        <div style={{
                            padding: '12px 16px',
                            backgroundColor: '#fee2e2',
                            color: '#dc2626',
                            borderRadius: '8px',
                            fontSize: '13px',
                            marginBottom: '16px',
                            fontWeight: '500',
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Email field */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: '500',
                            color: 'var(--text-primary)',
                            marginBottom: '6px',
                        }}>
                            Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={16} style={{
                                position: 'absolute',
                                left: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)',
                                pointerEvents: 'none',
                            }} />
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                style={inputStyle}
                                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            />
                        </div>
                    </div>

                    {/* Password field */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '13px',
                            fontWeight: '500',
                            color: 'var(--text-primary)',
                            marginBottom: '6px',
                        }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={16} style={{
                                position: 'absolute',
                                left: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--text-muted)',
                                pointerEvents: 'none',
                            }} />
                            <input
                                name="password"
                                type={showPass ? 'text' : 'password'}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Your password"
                                style={{ ...inputStyle, paddingRight: '44px' }}
                                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                            />
                            <button
                                onClick={() => setShowPass(prev => !prev)}
                                style={{
                                    position: 'absolute',
                                    right: '14px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-muted)',
                                    padding: 0,
                                }}
                            >
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'var(--accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                            transition: 'opacity 0.15s',
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    {/* Register link */}
                    <p style={{
                        textAlign: 'center',
                        marginTop: '20px',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                    }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{
                            color: 'var(--accent)',
                            fontWeight: '600',
                            textDecoration: 'none',
                        }}>
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login