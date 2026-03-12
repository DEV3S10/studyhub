import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null

    return (
        // Backdrop
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
            }}
        >
            {/* Modal box — stop clicks from closing */}
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '480px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                }}
            >
                {/* Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827' }}>
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '4px',
                            border: 'none',
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            color: '#6b7280',
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {children}
            </div>
        </div>
    )
}

export default Modal