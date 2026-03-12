import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useToast } from './ToastContext'

// 1. Create the context
const TaskContext = createContext()

// 2. Create the provider component
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useLocalStorage('studyhub-tasks', [])
    const { showToast } = useToast()

    // ADD a new task
    const addTask = (taskData) => {
        const newTask = {
            id: Date.now().toString(),
            title: taskData.title,
            description: taskData.description || '',
            status: taskData.status || 'todo',
            priority: taskData.priority || 'medium',
            dueDate: taskData.dueDate || '',
            createdAt: new Date().toISOString(),
        }
        setTasks(prev => [newTask, ...prev])
        showToast(`Task "${newTask.title}" added!`, 'success')
    }

    // Update deleteTask:
    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id))
        showToast('Task deleted', 'info')
    }

    // UPDATE an existing task
    const updateTask = (id, updates) => {
        setTasks(prev =>
            prev.map(task => task.id === id ? { ...task, ...updates } : task)
        )
    }

    // TOGGLE task status between todo and done
    const toggleTask = (id) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id
                    ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
                    : task
            )
        )
    }

    // Stats for Dashboard
    const taskStats = {
        total: tasks.length,
        todo: tasks.filter(t => t.status === 'todo').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        done: tasks.filter(t => t.status === 'done').length,
    }

    return (
        <TaskContext.Provider value={{
            tasks,
            addTask,
            updateTask,
            deleteTask,
            toggleTask,
            taskStats,
        }}>
            {children}
        </TaskContext.Provider>
    )
}

// 3. Custom hook to use this context
export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider')
    }
    return context
}