// Format a date string to readable format
export const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })
}

// Check if a date is in the past (overdue)
export const isOverdue = (dateString) => {
    if (!dateString) return false
    return new Date(dateString) < new Date()
}

// Get today's date in YYYY-MM-DD format (for date inputs)
export const getTodayString = () => {
    return new Date().toISOString().split('T')[0]
}