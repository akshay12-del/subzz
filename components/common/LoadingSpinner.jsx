import { motion } from 'framer-motion'

export default function LoadingSpinner({ size = 24, color = 'var(--text-primary)' }) {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        borderBottomColor: 'transparent',
        display: 'inline-block',
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: 'linear'
      }}
    />
  )
}
