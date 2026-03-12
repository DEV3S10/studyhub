import { STATUS_CONFIG } from '../../utils/constants'

const TaskStatusBadge = ({ status }) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.todo

    return (
        <span style={{
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: '600',
            backgroundColor: config.backgroundColor,
            color: config.color,
            whiteSpace: 'nowrap',
        }}>
      {config.label}
    </span>
    )
}

export default TaskStatusBadge