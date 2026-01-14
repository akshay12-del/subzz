import { motion } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi'

const toastVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
}

const icons = {
    success: FiCheckCircle,
    error: FiAlertCircle,
    info: FiInfo,
    warning: FiAlertCircle
}

const colors = {
    success: { bg: '#22c55e', text: '#ffffff' },
    error: { bg: '#ef4444', text: '#ffffff' },
    info: { bg: '#3b82f6', text: '#ffffff' },
    warning: { bg: '#eab308', text: '#ffffff' }
}

function Toast({ message, type = 'info', onClose }) {
    const Icon = icons[type] || icons.info
    const style = colors[type] || colors.info

    return (
        <motion.div
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            layout
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: style.bg,
                color: style.text,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: '300px',
                maxWidth: '400px',
                pointerEvents: 'auto', // Re-enable clicks
                cursor: 'default'
            }}
        >
            <Icon size={20} />
            <span style={{
                flex: 1,
                fontSize: '14px',
                fontWeight: '500'
            }}>
                {message}
            </span>
            <button
                onClick={onClose}
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'currentColor',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    opacity: 0.8
                }}
            >
                <FiX size={16} />
            </button>
        </motion.div>
    )
}

export default Toast
