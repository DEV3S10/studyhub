import { useNotes } from '../context/NoteContext'
import { useTasks } from '../context/TaskContext'
import DashboardStats from '../components/dashboard/DashboardStatus'
import ProgressChart from '../components/dashboard/ProgressChart'
import RecentTasks from '../components/dashboard/RecentTasks'
import UpcomingQuiz from '../components/dashboard/UpcomingQuiz'
import { useUser } from '../context/UserContext'

const Dashboard = () => {
    const { tasks } = useTasks()
    const { user } = useUser()

    // Get user's first name from localStorage or use default
    const userName = localStorage.getItem('studyhub-username') || 'Student'

    // Get time-based greeting
    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 17) return 'Good afternoon'
        return 'Good evening'
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Welcome header */}
            <div>
                <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#111827' }}>
                    {getGreeting()}, {userName}! 👋
                </h1>
                <p style={{ color: '#6b7280', marginTop: '4px', fontSize: '15px' }}>
                    Here's what's happening with your studies today.
                </p>
            </div>

            {/* Stats row */}
            <DashboardStats />

            {/* Chart */}
            <ProgressChart />

            {/* Bottom row — Recent Tasks + Upcoming Quiz */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px',
            }}>
                <RecentTasks />
                <UpcomingQuiz />
            </div>

        </div>
    )
}

export default Dashboard