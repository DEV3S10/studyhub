import { useTasks } from '../../context/TaskContext'
import TaskStatusBadge from '../tasks/TaskStatusBadge'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

const RecentTasks = () => {
    const { tasks } = useTasks()
    const navigate = useNavigate()

    // Get 5 most recent tasks
    const recentTasks = tasks.slice(0, 5)

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
                    📋 Recent Tasks
                </h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/tasks')}
                    style={{ color: '#4f46e5', fontSize: '13px' }}
                >
                    View all →
                </Button>
            </div>

            {/* Task list */}
            {recentTasks.length === 0 ? (
                <p style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center', padding: '20px 0' }}>
                    No tasks yet — go add some! 📝
                </p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {recentTasks.map(task => (
                        <div key={task.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 12px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '8px',
                            gap: '12px',
                        }}>
              <span style={{
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500',
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textDecoration: task.status === 'done' ? 'line-through' : 'none',
              }}>
                {task.title}
              </span>
                            <TaskStatusBadge status={task.status} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default RecentTasks