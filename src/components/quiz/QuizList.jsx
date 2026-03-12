import QuizCard from './QuizCard'

const QuizList = ({ quizzes }) => {
    if (quizzes.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧠</div>
                <p style={{ fontSize: '16px', fontWeight: '500' }}>No quizzes available</p>
            </div>
        )
    }

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
        }}>
            {quizzes.map(quiz => (
                <QuizCard key={quiz.id} quiz={quiz} />
            ))}
        </div>
    )
}

export default QuizList