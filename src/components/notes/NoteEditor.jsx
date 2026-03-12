import { useState, useEffect } from 'react'
import { useNotes } from '../../context/NoteContext'
import Button from '../ui/Button'

// Note color options
const NOTE_COLORS = [
    { label: 'White',  value: '#ffffff' },
    { label: 'Yellow', value: '#fef9c3' },
    { label: 'Green',  value: '#dcfce7' },
    { label: 'Blue',   value: '#dbeafe' },
    { label: 'Pink',   value: '#fce7f3' },
    { label: 'Purple', value: '#f3e8ff' },
]

const NoteEditor = ({ note, onClose }) => {
    const { addNote, updateNote } = useNotes()
    const isEditing = !!note

    const [form, setForm] = useState({
        title: note?.title || '',
        content: note?.content || '',
        tags: note?.tags?.join(', ') || '',
        color: note?.color || '#ffffff',
    })

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = () => {
        if (!form.title.trim()) return alert('Please enter a note title!')

        // Convert comma-separated tags string into array
        const tagsArray = form.tags
            .split(',')
            .map(t => t.trim().toLowerCase())
            .filter(t => t.length > 0)

        const noteData = {
            title: form.title,
            content: form.content,
            tags: tagsArray,
            color: form.color,
        }

        if (isEditing) {
            updateNote(note.id, noteData)
        } else {
            addNote(noteData)
        }
        onClose()
    }

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box',
        backgroundColor: '#f9fafb',
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

            {/* Title */}
            <div>
                <label style={labelStyle}>Title *</label>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Note title..."
                    style={inputStyle}
                />
            </div>

            {/* Content */}
            <div>
                <label style={labelStyle}>Content</label>
                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Write your notes here..."
                    rows={6}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
                />
            </div>

            {/* Tags */}
            <div>
                <label style={labelStyle}>Tags (comma separated)</label>
                <input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="e.g. math, exam, important"
                    style={inputStyle}
                />
            </div>

            {/* Color picker */}
            <div>
                <label style={labelStyle}>Card Color</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                    {NOTE_COLORS.map(c => (
                        <button
                            key={c.value}
                            onClick={() => setForm(prev => ({ ...prev, color: c.value }))}
                            title={c.label}
                            style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                backgroundColor: c.value,
                                border: form.color === c.value
                                    ? '3px solid #4f46e5'
                                    : '2px solid #e5e7eb',
                                cursor: 'pointer',
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Buttons */}
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                marginTop: '4px',
            }}>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>
                    {isEditing ? 'Save Changes' : 'Create Note'}
                </Button>
            </div>

        </div>
    )
}

export default NoteEditor