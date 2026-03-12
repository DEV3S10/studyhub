const filters = [
    { value: 'all',         label: 'All'         },
    { value: 'todo',        label: 'To Do'        },
    { value: 'done',        label: 'Done'         },
]

const TaskFilter = ({ activeFilter, onFilterChange }) => {
    return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {filters.map(filter => (
                <button
                    key={filter.value}
                    onClick={() => onFilterChange(filter.value)}
                    style={{
                        padding: '6px 14px',
                        borderRadius: '999px',
                        border: '1px solid',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        borderColor: activeFilter === filter.value ? '#4f46e5' : '#e5e7eb',
                        backgroundColor: activeFilter === filter.value ? '#4f46e5' : 'white',
                        color: activeFilter === filter.value ? 'white' : '#6b7280',
                    }}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    )
}

export default TaskFilter