import { useState } from 'react'

const useLocalStorage = (key, initialValue) => {
    // Try to get existing value from localStorage
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            // If something exists, parse it. Otherwise use initialValue
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error('useLocalStorage read error:', error)
            return initialValue
        }
    })

    // Wrap setState to also save to localStorage
    const setValue = (value) => {
        try {
            // Allow value to be a function (like regular setState)
            const valueToStore = value instanceof Function
                ? value(storedValue)
                : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error('useLocalStorage write error:', error)
        }
    }

    return [storedValue, setValue]
}

export default useLocalStorage