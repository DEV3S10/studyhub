import { createContext, useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const QuizContext = createContext()

const DEFAULT_QUIZZES = [
    {
        id: '1',
        title: 'Basic Math',
        description: 'Test your arithmetic skills',
        emoji: '🔢',
        createdBy: 'system',
        createdByName: 'StudyHub',
        questions: [
            {
                id: 'q1',
                question: 'What is 12 × 8?',
                options: ['86', '96', '106', '76'],
                correctAnswer: '96',
            },
            {
                id: 'q2',
                question: 'What is the square root of 144?',
                options: ['11', '14', '12', '13'],
                correctAnswer: '12',
            },
            {
                id: 'q3',
                question: 'What is 15% of 200?',
                options: ['25', '35', '30', '20'],
                correctAnswer: '30',
            },
        ],
    },
    {
        id: '2',
        title: 'World Geography',
        description: 'How well do you know the world?',
        emoji: '🌍',
        createdBy: 'system',
        createdByName: 'StudyHub',
        questions: [
            {
                id: 'q1',
                question: 'What is the capital of Japan?',
                options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
                correctAnswer: 'Tokyo',
            },
            {
                id: 'q2',
                question: 'Which is the longest river in the world?',
                options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
                correctAnswer: 'Nile',
            },
            {
                id: 'q3',
                question: 'Which country has the most natural lakes?',
                options: ['Russia', 'USA', 'Canada', 'Brazil'],
                correctAnswer: 'Canada',
            },
        ],
    },
]

export const QuizProvider = ({ children }) => {
    const [quizzes, setQuizzes]       = useLocalStorage('studyhub-quizzes', DEFAULT_QUIZZES)
    const [quizResults, setQuizResults] = useLocalStorage('studyhub-quiz-results', [])

    // Active quiz session
    const [activeQuiz, setActiveQuiz]         = useState(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers]               = useState({})
    const [quizFinished, setQuizFinished]     = useState(false)

    // ─── Teacher actions ───────────────────────────────

    // Create a new quiz
    const createQuiz = (quizData, author) => {
        const newQuiz = {
            id: Date.now().toString(),
            title: quizData.title,
            description: quizData.description,
            emoji: quizData.emoji || '📝',
            createdBy: author.id,
            createdByName: author.name,
            questions: quizData.questions.map((q, i) => ({
                id: `q${i + 1}`,
                question: q.question,
                options: q.options,
                correctAnswer: q.correctAnswer,
            })),
            createdAt: new Date().toISOString(),
        }
        setQuizzes(prev => [newQuiz, ...prev])
    }

    // Delete a quiz (teacher only)
    const deleteQuiz = (quizId) => {
        setQuizzes(prev => prev.filter(q => q.id !== quizId))
    }

    // ─── Student actions ───────────────────────────────

    const startQuiz = (quiz) => {
        setActiveQuiz(quiz)
        setCurrentQuestion(0)
        setAnswers({})
        setQuizFinished(false)
    }

    const answerQuestion = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }))
    }

    const nextQuestion = () => {
        if (currentQuestion < activeQuiz.questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
        } else {
            finishQuiz()
        }
    }

    const finishQuiz = () => {
        const score = activeQuiz.questions.filter(
            q => answers[q.id] === q.correctAnswer
        ).length

        const result = {
            id: Date.now().toString(),
            quizId: activeQuiz.id,
            quizTitle: activeQuiz.title,
            score,
            total: activeQuiz.questions.length,
            percentage: Math.round((score / activeQuiz.questions.length) * 100),
            completedAt: new Date().toISOString(),
            // Store who took the quiz
            userId: JSON.parse(
                atob((localStorage.getItem('studyhub-token') || '..').split('.')[1] || 'e30=')
            )?.id || 'unknown',
        }

        setQuizResults(prev => [result, ...prev])
        setQuizFinished(true)
    }

    const resetQuiz = () => {
        setActiveQuiz(null)
        setCurrentQuestion(0)
        setAnswers({})
        setQuizFinished(false)
    }

    const currentScore = activeQuiz
        ? activeQuiz.questions.filter(q => answers[q.id] === q.correctAnswer).length
        : 0

    return (
        <QuizContext.Provider value={{
            quizzes,
            quizResults,
            activeQuiz,
            currentQuestion,
            answers,
            quizFinished,
            currentScore,
            startQuiz,
            answerQuestion,
            nextQuestion,
            finishQuiz,
            resetQuiz,
            createQuiz,
            deleteQuiz,
        }}>
            {children}
        </QuizContext.Provider>
    )
}

export const useQuiz = () => {
    const context = useContext(QuizContext)
    if (!context) throw new Error('useQuiz must be used within QuizProvider')
    return context
}