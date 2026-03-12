import { useState } from 'react'
import { useUser } from '../../context/UserContext'
import Button from '../ui/Button'

const SUBJECTS = [
    'General Studies', 'Mathematics', 'Science',
    'History', 'Literature', 'Computer Science',
    'Languages', 'Arts', 'Business', 'Medicine',
]

const EditProfileForm = ({ onClose }) => {
    const { user, updateUser } = useUser()

    const [form, setForm] = useState({
        name:    user.name    || '',
        email:   user.email   || '',
        bio:     user.bio     || '',
        subject: user.subject || 'General Studies',
    })

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = () => {
        if (!form.name.trim()) return alert('Name cannot be empty!')
        updateUser(form)
        // Also update the username used in Dashboard greeting
        localStorage.setItem('studyhub-username', form.name)
        onClose()
    }

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        fontSize: '14px',
        outline: 'none',
        backgroundColor: '#f9fafb',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
    }

    const labelStyle = {
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '4px',
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Name */}
            <div>
                <label style={labelStyle}>Full Name</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={inputStyle}
                />
            </div>

            {/* Email */}
            <div>
                <label style={labelStyle}>Email</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle}
                />
            </div>

            {/* Bio */}
            <div>
                <label style={labelStyle}>Bio</label>
                <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                />
            </div>

            {/* Subject */}
            <div>
                <label style={labelStyle}>Main Subject</label>
                <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    style={inputStyle}
                >
                    {SUBJECTS.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* Buttons */}
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                marginTop: '4px',
            }}>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>Save Changes</Button>
            </div>

        </div>
    )
}

export default EditProfileForm