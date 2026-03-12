import TaskCard from './TaskCard'

const TaskList = ({ tasks }) => {
    if (tasks.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#9ca3af',
            }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📋</div>
                <p style={{ fontSize: '16px', fontWeight: '500' }}>No tasks found</p>
                <p style={{ fontSize: '14px', marginTop: '4px' }}>
                    Add a task or try a different filter
                </p>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}

export default TaskList