import { useQuiz } from '../../context/QuizContext'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

const UpcomingQuiz = () => {
    const { quizzes, quizResults, startQuiz } = useQuiz()
    const navigate = useNavigate()

    // Find quizzes not yet attempted
    const attemptedIds = [...new Set(quizResults.map(r => r.quizId))]
    const notAttempted = quizzes.filter(q => !attemptedIds.includes(q.id))
    const suggested = notAttempted.length > 0 ? notAttempted : quizzes

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e5e7eb',
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
            }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                    🧠 Suggested Quizzes
                </h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/quiz')}
                    style={{ color: '#4f46e5', fontSize: '13px' }}
                >
                    View all →
                </Button>
            </div>

            {/* Quiz suggestions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {suggested.slice(0, 3).map(quiz => {
                    const attempts = quizResults.filter(r => r.quizId === quiz.id)
                    const best = attempts.length > 0
                        ? Math.max(...attempts.map(r => r.percentage))
                        : null

                    return (
                        <div key={quiz.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 12px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '8px',
                            gap: '12px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                                <span style={{ fontSize: '20px' }}>{quiz.emoji}</span>
                                <div style={{ minWidth: 0 }}>
                                    <p style={{
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        color: '#374151',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        {quiz.title}
                                    </p>
                                    {best !== null && (
                                        <p style={{ fontSize: '12px', color: '#6b7280' }}>
                                            Best: {best}%
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button
                                size="sm"
                                onClick={() => { startQuiz(quiz); navigate('/quiz') }}
                            >
                                Start
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UpcomingQuiz