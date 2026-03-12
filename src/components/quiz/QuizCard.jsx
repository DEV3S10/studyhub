import { useQuiz } from '../../context/QuizContext'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'
import { Trash2 } from 'lucide-react'

const QuizCard = ({ quiz }) => {
    const { startQuiz, quizResults, deleteQuiz } = useQuiz()
    const { isTeacher, isStudent, currentUser } = useAuth()

    // Find best score for this quiz by current user
    const myAttempts = quizResults.filter(r =>
        r.quizId === quiz.id && r.userId === currentUser?.id
    )
    const bestScore = myAttempts.length > 0
        ? Math.max(...myAttempts.map(r => r.percentage))
        : null

    // Total attempts across ALL students (teacher view)
    const totalAttempts = quizResults.filter(r => r.quizId === quiz.id).length

    const isOwner = quiz.createdBy === currentUser?.id

    return (
        <div style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            transition: 'box-shadow 0.15s',
        }}
             onMouseEnter={e => e.currentTarget.style.boxShadow = `0 4px 20px var(--shadow)`}
             onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <span style={{ fontSize: '36px' }}>{quiz.emoji}</span>
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {quiz.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {quiz.description}
                    </p>
                </div>

                {/* Delete button — teacher only, own quizzes */}
                {isTeacher && isOwner && (
                    <button
                        onClick={() => {
                            if (window.confirm('Delete this quiz?')) deleteQuiz(quiz.id)
                        }}
                        style={{
                            padding: '6px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            color: 'var(--danger)',
                            borderRadius: '6px',
                        }}
                    >
                        <Trash2 size={16} />
                    </button>
                )}
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <span style={{
            padding: '6px 10px',
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '8px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
        }}>
          ❓ {quiz.questions.length} questions
        </span>

                {/* Teacher: see total student attempts */}
                {isTeacher && (
                    <span style={{
                        padding: '6px 10px',
                        backgroundColor: 'var(--bg-primary)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                    }}>
            👥 {totalAttempts} attempt{totalAttempts !== 1 ? 's' : ''}
          </span>
                )}

                {/* Student: see their own best score */}
                {isStudent && bestScore !== null && (
                    <span style={{
                        padding: '6px 10px',
                        backgroundColor: bestScore >= 70 ? '#d1fae5' : '#fef3c7',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: bestScore >= 70 ? 'var(--success)' : 'var(--warning)',
                    }}>
            🏆 Best: {bestScore}%
          </span>
                )}
            </div>

            {/* Created by */}
            <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                Created by {quiz.createdByName || 'StudyHub'}
            </p>

            {/* Action button */}
            {isStudent && (
                <Button
                    onClick={() => startQuiz(quiz)}
                    style={{ width: '100%', justifyContent: 'center' }}
                >
                    {myAttempts.length > 0 ? '🔄 Retry Quiz' : '▶ Start Quiz'}
                </Button>
            )}

            {isTeacher && (
                <div style={{
                    padding: '10px 14px',
                    backgroundColor: 'var(--accent-light)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: 'var(--accent-text)',
                    textAlign: 'center',
                    fontWeight: '500',
                }}>
                    {isOwner ? '✅ Your quiz' : '👁 Viewing'}
                </div>
            )}

        </div>
    )
}

export default QuizCard