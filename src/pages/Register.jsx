import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { BookOpen, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

const Register = () => {
    const { register } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    })
    const [error, setError]     = useState('')
    const [loading, setLoading] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setError('')
    }

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.password || !form.role) {
            return setError('Please fill in all fields!')
        }
        if (form.password !== form.confirmPassword) {
            return setError('Passwords do not match!')
        }
        if (form.password.length < 6) {
            return setError('Password must be at least 6 characters!')
        }
        try {
            setLoading(true)
            await register(form)
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

    const labelStyle = {
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: 'var(--text-primary)',
        marginBottom: '6px',
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
            <div style={{ width: '100%', maxWidth: '440px' }}>

                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
                    <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                        Create Account
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                        Join StudyHub today
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

                    {/* Error */}
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

                    {/* Name */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <User size={16} style={{
                                position: 'absolute', left: '14px',
                                top: '50%', transform: 'translateY(-50%)',
                                color: 'var(--text-muted)', pointerEvents: 'none',
                            }} />
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={16} style={{
                                position: 'absolute', left: '14px',
                                top: '50%', transform: 'translateY(-50%)',
                                color: 'var(--text-muted)', pointerEvents: 'none',
                            }} />
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={labelStyle}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={16} style={{
                                position: 'absolute', left: '14px',
                                top: '50%', transform: 'translateY(-50%)',
                                color: 'var(--text-muted)', pointerEvents: 'none',
                            }} />
                            <input
                                name="password"
                                type={showPass ? 'text' : 'password'}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Min 6 characters"
                                style={{ ...inputStyle, paddingRight: '44px' }}
                            />
                            <button
                                onClick={() => setShowPass(p => !p)}
                                style={{
                                    position: 'absolute', right: '14px',
                                    top: '50%', transform: 'translateY(-50%)',
                                    background: 'none', border: 'none',
                                    cursor: 'pointer', color: 'var(--text-muted)', padding: 0,
                                }}
                            >
                                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={16} style={{
                                position: 'absolute', left: '14px',
                                top: '50%', transform: 'translateY(-50%)',
                                color: 'var(--text-muted)', pointerEvents: 'none',
                            }} />
                            <input
                                name="confirmPassword"
                                type="password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Repeat your password"
                                style={inputStyle}
                            />
                        </div>
                    </div>

                    {/* Role Selection — most important part! */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={labelStyle}>I am a...</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

                            {/* Teacher card */}
                            <button
                                onClick={() => setForm(prev => ({ ...prev, role: 'teacher' }))}
                                style={{
                                    padding: '16px 12px',
                                    borderRadius: '12px',
                                    border: `2px solid ${form.role === 'teacher' ? 'var(--accent)' : 'var(--border-color)'}`,
                                    backgroundColor: form.role === 'teacher' ? 'var(--accent-light)' : 'transparent',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <div style={{ fontSize: '28px', marginBottom: '6px' }}>👩‍🏫</div>
                                <p style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: form.role === 'teacher' ? 'var(--accent)' : 'var(--text-primary)',
                                }}>
                                    Teacher
                                </p>
                                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                    Create quizzes
                                </p>
                            </button>

                            {/* Student card */}
                            <button
                                onClick={() => setForm(prev => ({ ...prev, role: 'student' }))}
                                style={{
                                    padding: '16px 12px',
                                    borderRadius: '12px',
                                    border: `2px solid ${form.role === 'student' ? 'var(--accent)' : 'var(--border-color)'}`,
                                    backgroundColor: form.role === 'student' ? 'var(--accent-light)' : 'transparent',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <div style={{ fontSize: '28px', marginBottom: '6px' }}>👨‍🎓</div>
                                <p style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: form.role === 'student' ? 'var(--accent)' : 'var(--text-primary)',
                                }}>
                                    Student
                                </p>
                                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                    Take quizzes
                                </p>
                            </button>

                        </div>
                    </div>

                    {/* Submit */}
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
                        }}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>

                    {/* Login link */}
                    <p style={{
                        textAlign: 'center',
                        marginTop: '20px',
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                    }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{
                            color: 'var(--accent)',
                            fontWeight: '600',
                            textDecoration: 'none',
                        }}>
                            Sign in
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    )
}

export default Register