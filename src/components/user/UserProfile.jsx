import { useUser } from '../../context/UserContext'
import { useTasks } from '../../context/TaskContext'
import { useNotes } from '../../context/NoteContext'
import { useQuiz } from '../../context/QuizContext'
import UserAvatar from './UserAvatar'
import { formatDate } from '../../utils/dateUtils'

const UserProfile = () => {
    const { user } = useUser()
    const { taskStats } = useTasks()
    const { notes } = useNotes()
    const { quizResults } = useQuiz()

    const avgQuizScore = quizResults.length > 0
        ? Math.round(
            quizResults.reduce((sum, r) => sum + r.percentage, 0) / quizResults.length
        )
        : null

    const stats = [
        { label: 'Tasks Done',    value: taskStats.done       },
        { label: 'Notes Written', value: notes.length         },
        { label: 'Quizzes Taken', value: quizResults.length   },
        { label: 'Avg Quiz Score',value: avgQuizScore !== null ? `${avgQuizScore}%` : '—' },
    ]

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            overflow: 'hidden',
        }}>
            {/* Cover banner */}
            <div style={{
                height: '100px',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            }} />

            {/* Profile info */}
            <div style={{ padding: '0 24px 24px' }}>
                {/* Avatar — overlaps the banner */}
                <div style={{ marginTop: '-36px', marginBottom: '12px' }}>
                    <UserAvatar
                        name={user.name}
                        size={72}
                        style={{
                            border: '4px solid white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        }}
                    />
                </div>

                {/* Name + details */}
                <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827' }}>
                    {user.name}
                </h2>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>
                    {user.email}
                </p>
                <p style={{
                    fontSize: '14px',
                    color: '#4b5563',
                    marginTop: '10px',
                    lineHeight: '1.5',
                }}>
                    {user.bio}
                </p>

                {/* Subject badge */}
                <div style={{ marginTop: '10px' }}>
          <span style={{
              padding: '4px 12px',
              backgroundColor: '#eef2ff',
              color: '#4f46e5',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: '500',
          }}>
            📚 {user.subject}
          </span>
                </div>

                {/* Joined date */}
                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '10px' }}>
                    Member since {formatDate(user.joinedAt)}
                </p>

                {/* Divider */}
                <div style={{ height: '1px', backgroundColor: '#f3f4f6', margin: '20px 0' }} />

                {/* Stats grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                }}>
                    {stats.map(stat => (
                        <div key={stat.label} style={{
                            backgroundColor: '#f9fafb',
                            borderRadius: '10px',
                            padding: '14px',
                            textAlign: 'center',
                        }}>
                            <p style={{
                                fontSize: '22px',
                                fontWeight: 'bold',
                                color: '#111827',
                            }}>
                                {stat.value}
                            </p>
                            <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserProfile