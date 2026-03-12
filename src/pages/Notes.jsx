import { useState } from 'react'
import { useNotes } from '../context/NoteContext'
import NotesList from '../components/notes/NoteList'
import NoteEditor from '../components/notes/NoteEditor'
import TagFilter from '../components/notes/TagFilter'
import AddNoteButton from '../components/notes/AddNoteButton'
import Modal from '../components/ui/Modal'

const Notes = () => {
    const { notes, allTags } = useNotes()
    const [activeTag, setActiveTag] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [selectedNote, setSelectedNote] = useState(null)

    // Filter notes by active tag
    const filteredNotes = activeTag
        ? notes.filter(note => note.tags.includes(activeTag))
        : notes

    const handleNoteClick = (note) => {
        setSelectedNote(note)
        setShowModal(true)
    }

    const handleAddNew = () => {
        setSelectedNote(null)
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
        setSelectedNote(null)
    }

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px',
            }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                        Notes
                    </h1>
                    <p style={{ color: '#6b7280', marginTop: '2px', fontSize: '14px' }}>
                        {notes.length} note{notes.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <AddNoteButton onClick={handleAddNew} />
            </div>

            {/* Tag filter — only show if there are tags */}
            {allTags.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                    <TagFilter
                        tags={allTags}
                        activeTag={activeTag}
                        onTagChange={setActiveTag}
                    />
                </div>
            )}

            {/* Notes grid */}
            <NotesList notes={filteredNotes} onNoteClick={handleNoteClick} />

            {/* Add/Edit Modal */}
            <Modal
                isOpen={showModal}
                onClose={handleClose}
                title={selectedNote ? 'Edit Note' : 'New Note'}
            >
                <NoteEditor note={selectedNote} onClose={handleClose} />
            </Modal>
        </div>
    )
}

export default Notes