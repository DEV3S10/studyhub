import { useTasks } from '../../context/TaskContext'
import { useNotes } from '../../context/NoteContext'
import { useQuiz } from '../../context/QuizContext'

const StatCard = ({ emoji, label, value, color }) => (
    <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px 24px',
        border: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flex: '1',
        minWidth: '160px',
    }}>
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            flexShrink: 0,
        }}>
            {emoji}
        </div>
        <div>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#111827', lineHeight: 1 }}>
                {value}
            </p>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                {label}
            </p>
        </div>
    </div>
)

const DashboardStats = () => {
    const { taskStats } = useTasks()
    const { notes } = useNotes()
    const { quizResults } = useQuiz()

    const stats = [
        {
            emoji: '✅',
            label: 'Tasks Completed',
            value: taskStats.done,
            color: '#d1fae5',
        },
        {
            emoji: '📋',
            label: 'Tasks Remaining',
            value: taskStats.todo,
            color: '#fef3c7',
        },
        {
            emoji: '📝',
            label: 'Total Notes',
            value: notes.length,
            color: '#dbeafe',
        },
        {
            emoji: '🧠',
            label: 'Quizzes Taken',
            value: quizResults.length,
            color: '#f3e8ff',
        },
    ]

    return (
        <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
        }}>
            {stats.map(stat => (
                <StatCard key={stat.label} {...stat} />
            ))}
        </div>
    )
}

export default DashboardStats