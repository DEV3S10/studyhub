import { useState } from 'react'
import { useTasks } from '../../context/TaskContext'
import Button from '../ui/Button'
import { TASK_STATUS, TASK_PRIORITY } from '../../utils/constants'

const AddTaskForm = ({ onClose }) => {
    const { addTask } = useTasks()
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: TASK_STATUS.TODO,
        priority: TASK_PRIORITY.MEDIUM,
        dueDate: '',
    })

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        if (!form.title.trim()) return alert('Please enter a task title!')
        addTask(form)
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
                <label style={labelStyle}>Task Title *</label>
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Read Chapter 5"
                    style={inputStyle}
                />
            </div>

            {/* Description */}
            <div>
                <label style={labelStyle}>Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Optional details..."
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical' }}
                />
            </div>

            {/* Status + Priority row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                    <label style={labelStyle}>Status</label>
                    <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
                        <option value="todo">To Do</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div>
                    <label style={labelStyle}>Priority</label>
                    <select name="priority" value={form.priority} onChange={handleChange} style={inputStyle}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
            </div>

            {/* Due Date */}
            <div>
                <label style={labelStyle}>Due Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    style={inputStyle}
                />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Add Task</Button>
            </div>

        </div>
    )
}

export default AddTaskForm