import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useQuiz } from '../context/QuizContext'
import { useAuth } from '../context/AuthContext'
import QuizList      from '../components/quiz/QuizList'
import QuizQuestion  from '../components/quiz/QuizQuestion'
import QuizResult    from '../components/quiz/QuizResult'
import CreateQuizForm from '../components/quiz/CreateQuizForm'
import Modal         from '../components/ui/Modal'
import Button        from '../components/ui/Button'

const Quiz = () => {
    const { activeQuiz, quizFinished, quizResults, quizzes } = useQuiz()
    const { isTeacher, isStudent, currentUser } = useAuth()
    const [showCreateModal, setShowCreateModal] = useState(false)

    // If a quiz is active — show question or result screen
    if (activeQuiz && quizFinished) return <QuizResult />
    if (activeQuiz && !quizFinished) return <QuizQuestion />

    // My attempts (student view)
    const myAttempts = quizResults.filter(r => r.userId === currentUser?.id)

    // Teacher's own quizzes
    const myQuizzes = quizzes.filter(q => q.createdBy === currentUser?.id)

    return (
        <div>

            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '12px',
            }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                        {isTeacher ? '👩‍🏫 Quiz Manager' : '👨‍🎓 Available Quizzes'}
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '2px', fontSize: '14px' }}>
                        {isTeacher
                            ? `${myQuizzes.length} quiz${myQuizzes.length !== 1 ? 'zes' : ''} created by you`
                            : `${myAttempts.length} attempt${myAttempts.length !== 1 ? 's' : ''} completed`
                        }
                    </p>
                </div>

                {/* Only teachers can create quizzes */}
                {isTeacher && (
                    <Button onClick={() => setShowCreateModal(true)}>
                        <Plus size={16} />
                        Create Quiz
                    </Button>
                )}
            </div>

            {/* Teacher — show their quizzes first, then all others */}
            {isTeacher && (
                <>
                    {myQuizzes.length > 0 && (
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{
                                fontSize: '15px',
                                fontWeight: '600',
                                color: 'var(--text-secondary)',
                                marginBottom: '12px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                            }}>
                                Your Quizzes
                            </h2>
                            <QuizList quizzes={myQuizzes} />
                        </div>
                    )}

                    <div>
                        <h2 style={{
                            fontSize: '15px',
                            fontWeight: '600',
                            color: 'var(--text-secondary)',
                            marginBottom: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                        }}>
                            All Quizzes
                        </h2>
                        <QuizList quizzes={quizzes} />
                    </div>
                </>
            )}

            {/* Student — see all quizzes */}
            {isStudent && (
                <QuizList quizzes={quizzes} />
            )}

            {/* Create Quiz Modal — teacher only */}
            <Modal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Create New Quiz"
            >
                <CreateQuizForm onClose={() => setShowCreateModal(false)} />
            </Modal>

        </div>
    )
}

export default Quiz