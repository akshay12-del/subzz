import { motion } from 'framer-motion'

export default function Skeleton({ width = '100%', height = 20, borderRadius = 4, style = {} }) {
    return (
        <motion.div
            style={{
                width,
                height,
                borderRadius,
                backgroundColor: 'var(--bg-tertiary)',
                ...style
            }}
            animate={{
                opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    )
}
