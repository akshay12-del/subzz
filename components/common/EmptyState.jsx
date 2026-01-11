import { motion } from 'framer-motion'
import { FiInbox } from 'react-icons/fi'

export default function EmptyState({
    icon = <FiInbox size={48} />,
    title = 'No items found',
    description = 'Try adjusting your filters or add a new item.'
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '48px 24px',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '12px',
                border: '1px dashed var(--border-color)',
            }}
        >
            <div style={{
                marginBottom: '16px',
                color: 'var(--text-tertiary)',
                opacity: 0.5
            }}>
                {icon}
            </div>
            <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '8px'
            }}>
                {title}
            </h3>
            <p style={{
                fontSize: '14px',
                maxWidth: '300px',
                lineHeight: '1.5'
            }}>
                {description}
            </p>
        </motion.div>
    )
}
