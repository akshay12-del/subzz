import { useRef, useEffect } from 'react'
import { FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, type = 'danger', confirmText = 'Confirm', cancelText = 'Cancel' }) {
    const modalRef = useRef(null)

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            // Prevent body scroll
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose]) // Added onClose dependency

    if (!isOpen) return null

    const getIcon = () => {
        switch (type) {
            case 'danger':
                return <FiAlertTriangle size={32} color="#ef4444" />
            case 'success':
                return <FiCheckCircle size={32} color="#22c55e" />
            default:
                return <FiInfo size={32} color="#3b82f6" />
        }
    }

    const getButtonColor = () => {
        switch (type) {
            case 'danger':
                return '#ef4444'
            case 'success':
                return '#22c55e'
            default:
                return '#3b82f6'
        }
    }

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)'
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    maxWidth: '400px',
                    width: '100%',
                    padding: '24px',
                    border: '1px solid var(--border-color)'
                }}
                onClick={(e) => e.stopPropagation()}
                ref={modalRef}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '16px'
                }}>
                    <div style={{
                        padding: '16px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-tertiary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {getIcon()}
                    </div>

                    <div>
                        <h3 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: 'var(--text-primary)',
                            marginBottom: '8px'
                        }}>
                            {title}
                        </h3>
                        <p style={{
                            fontSize: '15px',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.5'
                        }}>
                            {message}
                        </p>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        width: '100%',
                        marginTop: '8px'
                    }}>
                        <button
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                backgroundColor: 'transparent',
                                color: 'var(--text-primary)',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-tertiary)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                onConfirm()
                                onClose()
                            }}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: getButtonColor(),
                                color: '#ffffff',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'opacity 0.2s',
                                opacity: 0.9
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '1'}
                            onMouseLeave={(e) => e.target.style.opacity = '0.9'}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default ConfirmationModal
