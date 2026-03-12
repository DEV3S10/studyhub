import { Search } from 'lucide-react'

const TaskSearch = ({ value, onChange }) => {
    return (
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
            <Search
                size={16}
                style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    pointerEvents: 'none',
                }}
            />
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Search tasks..."
                style={{
                    width: '100%',
                    padding: '9px 12px 9px 36px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white',
                    boxSizing: 'border-box',
                }}
            />
        </div>
    )
}

export default TaskSearch