import { Trash2, Clock } from 'lucide-react'
import { useNotes } from '../../context/NoteContext'
import { formatDate } from '../../utils/dateUtils'

const NoteCard = ({ note, onClick }) => {
    const { deleteNote } = useNotes()

    const handleDelete = (e) => {
        // Stop click from also triggering onClick (opening editor)
        e.stopPropagation()
        if (window.confirm('Delete this note?')) {
            deleteNote(note.id)
        }
    }

    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: note.color || 'white',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #e5e7eb',
                cursor: 'pointer',
                transition: 'box-shadow 0.15s, transform 0.15s',
                position: 'relative',
                minHeight: '160px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
            }}
        >
            {/* Delete button */}
            <button
                onClick={handleDelete}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '4px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    borderRadius: '4px',
                    opacity: 0,
                    transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                className="delete-btn"
            >
                <Trash2 size={14} />
            </button>

            {/* Title */}
            <h3 style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#111827',
                paddingRight: '24px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}>
                {note.title}
            </h3>

            {/* Content preview */}
            <p style={{
                fontSize: '13px',
                color: '#6b7280',
                flex: 1,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                lineHeight: '1.5',
            }}>
                {note.content || 'No content yet...'}
            </p>

            {/* Tags */}
            {note.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {note.tags.map(tag => (
                        <span key={tag} style={{
                            padding: '2px 8px',
                            borderRadius: '999px',
                            fontSize: '11px',
                            fontWeight: '500',
                            backgroundColor: 'rgba(79, 70, 229, 0.1)',
                            color: '#4f46e5',
                        }}>
              #{tag}
            </span>
                    ))}
                </div>
            )}

            {/* Date */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                color: '#9ca3af',
            }}>
                <Clock size={11} />
                {formatDate(note.updatedAt)}
            </div>
        </div>
    )
}

export default NoteCard