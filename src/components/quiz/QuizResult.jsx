import { useQuiz } from '../../context/QuizContext'
import Button from '../ui/Button'

const QuizResult = () => {
    const { activeQuiz, currentScore, answers, resetQuiz, startQuiz } = useQuiz()

    const total = activeQuiz.questions.length
    const percentage = Math.round((currentScore / total) * 100)

    // Determine grade
    const getGrade = () => {
        if (percentage >= 90) return { emoji: '🏆', label: 'Outstanding!',  color: '#059669' }
        if (percentage >= 70) return { emoji: '🎉', label: 'Great Job!',     color: '#4f46e5' }
        if (percentage >= 50) return { emoji: '👍', label: 'Good Effort!',   color: '#d97706' }
        return                       { emoji: '📚', label: 'Keep Studying!', color: '#ef4444' }
    }

    const grade = getGrade()

    return (
        <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px 32px',
            border: '1px solid #e5e7eb',
            textAlign: 'center',
        }}>

            {/* Grade emoji */}
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                {grade.emoji}
            </div>

            {/* Grade label */}
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: grade.color, marginBottom: '8px' }}>
                {grade.label}
            </h2>

            <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '15px' }}>
                You completed <strong>{activeQuiz.title}</strong>
            </p>

            {/* Score circle */}
            <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: `8px solid ${grade.color}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px',
            }}>
        <span style={{ fontSize: '28px', fontWeight: 'bold', color: grade.color }}>
          {percentage}%
        </span>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>
          {currentScore}/{total}
        </span>
            </div>

            {/* Question breakdown */}
            <div style={{
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                textAlign: 'left',
            }}>
                {activeQuiz.questions.map((q, index) => {
                    const isCorrect = answers[q.id] === q.correctAnswer
                    return (
                        <div key={q.id} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            padding: '8px 0',
                            borderBottom: index < activeQuiz.questions.length - 1
                                ? '1px solid #e5e7eb' : 'none',
                        }}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>
                {isCorrect ? '✅' : '❌'}
              </span>
                            <div>
                                <p style={{ fontSize: '13px', color: '#374151', fontWeight: '500' }}>
                                    {q.question}
                                </p>
                                {!isCorrect && (
                                    <p style={{ fontSize: '12px', color: '#059669', marginTop: '2px' }}>
                                        Correct: {q.correctAnswer}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Button variant="secondary" onClick={resetQuiz}>
                    Back to Quizzes
                </Button>
                <Button variant="primary" onClick={() => startQuiz(activeQuiz)}>
                    🔄 Try Again
                </Button>
            </div>

        </div>
    )
}

export default QuizResult