import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

const AppLayout = () => {
    const isMobile = window.innerWidth < 768
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false)
            } else {
                setSidebarOpen(true)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: 'var(--bg-primary)',
        }}>
            <Navbar
                onMenuClick={() => setSidebarOpen(prev => !prev)}
                sidebarOpen={sidebarOpen}
            />
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <div style={{
                marginLeft: !isMobile && sidebarOpen ? '256px' : '0',
                paddingTop: '64px',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                transition: 'margin-left 0.3s ease',
            }}>
                <main style={{ flex: 1, padding: '24px' }}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default AppLayout