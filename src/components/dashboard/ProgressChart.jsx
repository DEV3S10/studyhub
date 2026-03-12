import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTasks } from '../../context/TaskContext'

// Register Chart.js components — required!
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ProgressChart = () => {
    const { tasks } = useTasks()

    // Build last 7 days labels
    const getLast7Days = () => {
        const days = []
        for (let i = 6; i >= 0; i--) {
            const date = new Date()
            date.setDate(date.getDate() - i)
            days.push(date)
        }
        return days
    }

    const last7Days = getLast7Days()

    // Count tasks created per day
    const taskCounts = last7Days.map(day => {
        const dayStr = day.toISOString().split('T')[0]
        return tasks.filter(task => task.createdAt?.startsWith(dayStr)).length
    })

    // Count tasks completed per day
    const doneCounts = last7Days.map(day => {
        const dayStr = day.toISOString().split('T')[0]
        return tasks.filter(
            task => task.status === 'done' && task.createdAt?.startsWith(dayStr)
        ).length
    })

    const labels = last7Days.map(d =>
        d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    )

    const data = {
        labels,
        datasets: [
            {
                label: 'Tasks Added',
                data: taskCounts,
                backgroundColor: 'rgba(99, 102, 241, 0.7)',
                borderRadius: 6,
            },
            {
                label: 'Tasks Completed',
                data: doneCounts,
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderRadius: 6,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 1 },
                grid: { color: '#f3f4f6' },
            },
            x: {
                grid: { display: false },
            },
        },
    }

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #e5e7eb',
        }}>
            <h2 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '20px',
            }}>
                📈 Weekly Activity
            </h2>
            <Bar data={data} options={options} />
        </div>
    )
}

export default ProgressChart