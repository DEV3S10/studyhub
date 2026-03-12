const TagFilter = ({ tags, activeTag, onTagChange }) => {
    return (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>
        Filter:
      </span>

            {/* All button */}
            <button
                onClick={() => onTagChange(null)}
                style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    border: '1px solid',
                    fontSize: '12px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    borderColor: !activeTag ? '#4f46e5' : '#e5e7eb',
                    backgroundColor: !activeTag ? '#4f46e5' : 'white',
                    color: !activeTag ? 'white' : '#6b7280',
                }}
            >
                All
            </button>

            {/* Tag buttons */}
            {tags.map(tag => (
                <button
                    key={tag}
                    onClick={() => onTagChange(tag)}
                    style={{
                        padding: '4px 12px',
                        borderRadius: '999px',
                        border: '1px solid',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        borderColor: activeTag === tag ? '#4f46e5' : '#e5e7eb',
                        backgroundColor: activeTag === tag ? '#4f46e5' : 'white',
                        color: activeTag === tag ? 'white' : '#6b7280',
                    }}
                >
                    #{tag}
                </button>
            ))}
        </div>
    )
}

export default TagFilter