import NoteCard from './NoteCard'

const NotesList = ({ notes, onNoteClick }) => {
    if (notes.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#9ca3af',
            }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
                <p style={{ fontSize: '16px', fontWeight: '500' }}>No notes yet</p>
                <p style={{ fontSize: '14px', marginTop: '4px' }}>
                    Click the button above to create your first note
                </p>
            </div>
        )
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
        }}>
            {notes.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onClick={() => onNoteClick(note)}
                />
            ))}
        </div>
    )
}

export default NotesList