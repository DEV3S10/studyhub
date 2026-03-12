import { Plus } from 'lucide-react'

const AddNoteButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                backgroundColor: '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
            }}
        >
            <Plus size={16} />
            New Note
        </button>
    )
}

export default AddNoteButton