import { useState } from 'react'
import { useQuiz } from '../../context/QuizContext'
import AnswerOption from './AnswerOption'
import Button from '../ui/Button'

const QuizQuestion = () => {
    const {
        activeQuiz,
        currentQuestion,
        answers,
        answerQuestion,
        nextQuestion,
    } = useQuiz()

    const [showResult, setShowResult] = useState(false)
    const question = activeQuiz.questions[currentQuestion]
    const selectedAnswer = answers[question.id]
    const isLast = currentQuestion === activeQuiz.questions.length - 1

    const handleSelect = (option) => {
        if (!showResult) {
            answerQuestion(question.id, option)
        }
    }

    const handleNext = () => {
        setShowResult(false)
        nextQuestion()
    }

    const handleCheck = () => {
        if (!selectedAnswer) return alert('Please select an answer!')
        setShowResult(true)
    }

    // Progress percentage
    const progress = ((currentQuestion + 1) / activeQuiz.questions.length) * 100

    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            border: '1px solid #e5e7eb',
        }}>

            {/* Progress bar */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '13px',
                    color: '#6b7280',
                    marginBottom: '8px',
                }}>
                    <span>Question {currentQuestion + 1} of {activeQuiz.questions.length}</span>
                    <span>{activeQuiz.title}</span>
                </div>
                <div style={{
                    height: '6px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '999px',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        backgroundColor: '#4f46e5',
                        borderRadius: '999px',
                        transition: 'width 0.3s ease',
                    }} />
                </div>
            </div>

            {/* Question */}
            <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '24px',
                lineHeight: '1.4',
            }}>
                {question.question}
            </h2>

            {/* Answer options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {question.options.map(option => (
                    <AnswerOption
                        key={option}
                        option={option}
                        selected={selectedAnswer === option}
                        correct={question.correctAnswer}
                        showResult={showResult}
                        onSelect={handleSelect}
                    />
                ))}
            </div>

            {/* Result feedback */}
            {showResult && (
                <div style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    backgroundColor: selectedAnswer === question.correctAnswer ? '#d1fae5' : '#fee2e2',
                    color: selectedAnswer === question.correctAnswer ? '#059669' : '#ef4444',
                    fontSize: '14px',
                    fontWeight: '500',
                }}>
                    {selectedAnswer === question.correctAnswer
                        ? '🎉 Correct! Well done!'
                        : `❌ Incorrect. The answer was: ${question.correctAnswer}`
                    }
                </div>
            )}

            {/* Action button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {!showResult ? (
                    <Button onClick={handleCheck} disabled={!selectedAnswer}>
                        Check Answer
                    </Button>
                ) : (
                    <Button onClick={handleNext}>
                        {isLast ? '🏁 Finish Quiz' : 'Next Question →'}
                    </Button>
                )}
            </div>

        </div>
    )
}

export default QuizQuestion