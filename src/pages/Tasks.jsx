import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTasks } from '../context/TaskContext'
import TaskList from '../components/tasks/TaskList'
import TaskFilter from '../components/tasks/TaskFilter'
import TaskSearch from '../components/tasks/TaskSearch'
import AddTaskForm from '../components/tasks/AddTaskForm'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'

const Tasks = () => {
    const { tasks } = useTasks()
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)

    // Apply filter and search
    const filteredTasks = tasks
        .filter(task => filter === 'all' || task.status === filter)
        .filter(task =>
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.description.toLowerCase().includes(search.toLowerCase())
        )

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '12px',
            }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                        Tasks
                    </h1>
                    <p style={{ color: '#6b7280', marginTop: '2px', fontSize: '14px' }}>
                        {tasks.length} total · {tasks.filter(t => t.status === 'done').length} completed
                    </p>
                </div>
                <Button onClick={() => setShowModal(true)}>
                    <Plus size={16} />
                    Add Task
                </Button>
            </div>

            {/* Search + Filter bar */}
            <div style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
                flexWrap: 'wrap',
                alignItems: 'center',
            }}>
                <TaskSearch value={search} onChange={setSearch} />
                <TaskFilter activeFilter={filter} onFilterChange={setFilter} />
            </div>

            {/* Task list */}
            <TaskList tasks={filteredTasks} />

            {/* Add Task Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Add New Task"
            >
                <AddTaskForm onClose={() => setShowModal(false)} />
            </Modal>
        </div>
    )
}

export default Tasks