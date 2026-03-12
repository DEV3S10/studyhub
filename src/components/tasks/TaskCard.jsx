import { Trash2, Calendar } from 'lucide-react'
import { useTasks } from '../../context/TaskContext'
import TaskStatusBadge from './TaskStatusBadge'
import { formatDate, isOverdue } from '../../utils/dateUtils'
import { PRIORITY_CONFIG } from '../../utils/constants'

const TaskCard = ({ task }) => {
    const { toggleTask, deleteTask } = useTasks()
    const overdue = isOverdue(task.dueDate) && task.status !== 'done'
    const priorityConfig = PRIORITY_CONFIG[task.priority]

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            opacity: task.status === 'done' ? 0.7 : 1,
            transition: 'box-shadow 0.15s',
        }}>

            {/* Checkbox */}
            <input
                type="checkbox"
                checked={task.status === 'done'}
                onChange={() => toggleTask(task.id)}
                style={{
                    width: '18px',
                    height: '18px',
                    marginTop: '2px',
                    cursor: 'pointer',
                    accentColor: '#4f46e5',
                    flexShrink: 0,
                }}
            />

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
              fontSize: '15px',
              fontWeight: '500',
              color: '#111827',
              textDecoration: task.status === 'done' ? 'line-through' : 'none',
          }}>
            {task.title}
          </span>

                    {/* Priority dot */}
                    <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: priorityConfig.color,
                        flexShrink: 0,
                    }} title={`${priorityConfig.label} priority`} />
                </div>

                {/* Description */}
                {task.description && (
                    <p style={{
                        fontSize: '13px',
                        color: '#6b7280',
                        marginTop: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>
                        {task.description}
                    </p>
                )}

                {/* Footer */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '8px',
                    flexWrap: 'wrap',
                }}>
                    <TaskStatusBadge status={task.status} />

                    {task.dueDate && (
                        <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '12px',
                            color: overdue ? '#ef4444' : '#6b7280',
                        }}>
              <Calendar size={12} />
                            {overdue ? '⚠ ' : ''}{formatDate(task.dueDate)}
            </span>
                    )}
                </div>
            </div>

            {/* Delete button */}
            <button
                onClick={() => deleteTask(task.id)}
                style={{
                    padding: '6px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    color: '#9ca3af',
                    flexShrink: 0,
                }}
            >
                <Trash2 size={16} />
            </button>

        </div>
    )
}

export default TaskCard