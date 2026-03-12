import { useState } from 'react'
import { useQuiz } from '../../context/QuizContext'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'
import { Plus, Trash2 } from 'lucide-react'

const EMOJIS = ['📝', '🔢', '🌍', '🔬', '📚', '🎯', '💡', '🏆', '🧬', '🎨']

const emptyQuestion = () => ({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
})

const CreateQuizForm = ({ onClose }) => {
    const { createQuiz } = useQuiz()
    const { currentUser } = useAuth()

    const [form, setForm] = useState({
        title: '',
        description: '',
        emoji: '📝',
    })
    const [questions, setQuestions] = useState([emptyQuestion()])
    const [error, setError] = useState('')

    const handleFormChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // Update a question field
    const updateQuestion = (qIndex, field, value) => {
        setQuestions(prev => prev.map((q, i) =>
            i === qIndex ? { ...q, [field]: value } : q
        ))
    }

    // Update an option inside a question
    const updateOption = (qIndex, oIndex, value) => {
        setQuestions(prev => prev.map((q, i) => {
            if (i !== qIndex) return q
            const newOptions = [...q.options]
            newOptions[oIndex] = value
            return { ...q, options: newOptions }
        }))
    }

    // Add a new question
    const addQuestion = () => {
        setQuestions(prev => [...prev, emptyQuestion()])
    }

    // Remove a question
    const removeQuestion = (qIndex) => {
        if (questions.length === 1) return
        setQuestions(prev => prev.filter((_, i) => i !== qIndex))
    }

    const handleSubmit = () => {
        setError('')

        if (!form.title.trim()) return setError('Please add a quiz title!')
        if (!form.description.trim()) return setError('Please add a description!')

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i]
            if (!q.question.trim()) return setError(`Question ${i + 1} is empty!`)
            if (q.options.some(o => !o.trim())) return setError(`All options in question ${i + 1} must be filled!`)
            if (!q.correctAnswer) return setError(`Please select the correct answer for question ${i + 1}!`)
        }

        createQuiz({ ...form, questions }, currentUser)
        onClose()
    }

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
        fontSize: '14px',
        outline: 'none',
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
    }

    const labelStyle = {
        display: 'block',
        fontSize: '13px',
        fontWeight: '500',
        color: 'var(--text-primary)',
        marginBottom: '4px',
    }

    return (
        <div style={{
            maxHeight: '75vh',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            paddingRight: '4px',
        }}>

            {/* Error */}
            {error && (
                <div style={{
                    padding: '10px 14px',
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    borderRadius: '8px',
                    fontSize: '13px',
                }}>
                    ⚠️ {error}
                </div>
            )}

            {/* Quiz details */}
            <div style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
            }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Quiz Details
                </h3>

                <div>
                    <label style={labelStyle}>Title *</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleFormChange}
                        placeholder="e.g. Chapter 5 Review"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={labelStyle}>Description *</label>
                    <input
                        name="description"
                        value={form.description}
                        onChange={handleFormChange}
                        placeholder="Brief description of the quiz"
                        style={inputStyle}
                    />
                </div>

                {/* Emoji picker */}
                <div>
                    <label style={labelStyle}>Quiz Icon</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {EMOJIS.map(emoji => (
                            <button
                                key={emoji}
                                onClick={() => setForm(prev => ({ ...prev, emoji }))}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    fontSize: '18px',
                                    borderRadius: '8px',
                                    border: `2px solid ${form.emoji === emoji ? 'var(--accent)' : 'var(--border-color)'}`,
                                    backgroundColor: form.emoji === emoji ? 'var(--accent-light)' : 'transparent',
                                    cursor: 'pointer',
                                }}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Questions */}
            {questions.map((q, qIndex) => (
                <div key={qIndex} style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid var(--border-color)',
                }}>

                    {/* Question header */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '12px',
                    }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                            Question {qIndex + 1}
                        </h3>
                        {questions.length > 1 && (
                            <button
                                onClick={() => removeQuestion(qIndex)}
                                style={{
                                    padding: '4px',
                                    border: 'none',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    color: 'var(--danger)',
                                }}
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>

                    {/* Question text */}
                    <div style={{ marginBottom: '12px' }}>
                        <label style={labelStyle}>Question *</label>
                        <input
                            value={q.question}
                            onChange={e => updateQuestion(qIndex, 'question', e.target.value)}
                            placeholder="Type your question here..."
                            style={inputStyle}
                        />
                    </div>

                    {/* Options */}
                    <div style={{ marginBottom: '12px' }}>
                        <label style={labelStyle}>Answer Options *</label>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}>
                            {q.options.map((option, oIndex) => (
                                <div key={oIndex} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}>
                  <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: 'var(--text-secondary)',
                      flexShrink: 0,
                  }}>
                    {String.fromCharCode(65 + oIndex)}
                  </span>
                                    <input
                                        value={option}
                                        onChange={e => updateOption(qIndex, oIndex, e.target.value)}
                                        placeholder={`Option ${String.fromCharCode(65 + oIndex)}`}
                                        style={{ ...inputStyle, margin: 0 }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Correct answer */}
                    <div>
                        <label style={labelStyle}>Correct Answer *</label>
                        <select
                            value={q.correctAnswer}
                            onChange={e => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                            style={inputStyle}
                        >
                            <option value="">Select correct answer...</option>
                            {q.options.map((option, oIndex) => (
                                option.trim() && (
                                    <option key={oIndex} value={option}>
                                        {String.fromCharCode(65 + oIndex)}: {option}
                                    </option>
                                )
                            ))}
                        </select>
                    </div>

                </div>
            ))}

            {/* Add question button */}
            <button
                onClick={addQuestion}
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: `2px dashed var(--border-color)`,
                    backgroundColor: 'transparent',
                    color: 'var(--accent)',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                }}
            >
                <Plus size={16} />
                Add Another Question
            </button>

            {/* Submit buttons */}
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '8px',
                paddingTop: '4px',
            }}>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>
                    🚀 Publish Quiz
                </Button>
            </div>

        </div>
    )
}

export default CreateQuizForm