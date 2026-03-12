const AnswerOption = ({ option, selected, correct, showResult, onSelect }) => {
    // Determine background color based on state
    let backgroundColor = 'white'
    let borderColor = '#e5e7eb'
    let color = '#374151'

    if (showResult) {
        if (option === correct) {
            backgroundColor = '#d1fae5'
            borderColor = '#059669'
            color = '#059669'
        } else if (selected && option !== correct) {
            backgroundColor = '#fee2e2'
            borderColor = '#ef4444'
            color = '#ef4444'
        }
    } else if (selected) {
        backgroundColor = '#eef2ff'
        borderColor = '#4f46e5'
        color = '#4f46e5'
    }

    return (
        <button
            onClick={() => !showResult && onSelect(option)}
            style={{
                width: '100%',
                padding: '14px 18px',
                borderRadius: '10px',
                border: `2px solid ${borderColor}`,
                backgroundColor,
                color,
                fontSize: '14px',
                fontWeight: '500',
                textAlign: 'left',
                cursor: showResult ? 'default' : 'pointer',
                transition: 'all 0.15s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <span>{option}</span>
            {showResult && option === correct && <span>✓</span>}
            {showResult && selected && option !== correct && <span>✗</span>}
        </button>
    )
}

export default AnswerOption