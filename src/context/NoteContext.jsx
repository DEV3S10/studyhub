import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const NoteContext = createContext()

export const NoteProvider = ({ children }) => {
    const [notes, setNotes] = useLocalStorage('studyhub-notes', [])

    // ADD a new note
    const addNote = (noteData) => {
        const newNote = {
            id: Date.now().toString(),
            title: noteData.title || 'Untitled Note',
            content: noteData.content || '',
            tags: noteData.tags || [],
            color: noteData.color || '#ffffff',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        setNotes(prev => [newNote, ...prev])
        return newNote.id
    }

    // UPDATE a note
    const updateNote = (id, updates) => {
        setNotes(prev =>
            prev.map(note =>
                note.id === id
                    ? { ...note, ...updates, updatedAt: new Date().toISOString() }
                    : note
            )
        )
    }

    // DELETE a note
    const deleteNote = (id) => {
        setNotes(prev => prev.filter(note => note.id !== id))
    }

    // GET all unique tags across all notes
    const allTags = [...new Set(notes.flatMap(note => note.tags))]

    return (
        <NoteContext.Provider value={{
            notes,
            addNote,
            updateNote,
            deleteNote,
            allTags,
        }}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNotes = () => {
    const context = useContext(NoteContext)
    if (!context) {
        throw new Error('useNotes must be used within a NoteProvider')
    }
    return context
}