'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedProgressBarProps {
  progress: number
  label?: string
  showPercentage?: boolean
}

export function AnimatedProgressBar({
  progress,
  label,
  showPercentage = true,
}: AnimatedProgressBarProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(true)
  }, [])

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-neural-300">{label}</p>
          {showPercentage && (
            <span className="text-xs font-mono text-cyan-glow">{progress}%</span>
          )}
        </div>
      )}
      
      <div className="progress-bar relative">
        {/* Background glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isReady ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-r from-cyan-glow/50 to-pulse/50 rounded-full blur-sm"
        />

        {/* Animated fill */}
        <motion.div
          initial={{ width: '0%', opacity: 0 }}
          animate={isReady ? { width: `${progress}%`, opacity: 1 } : { width: '0%', opacity: 0 }}
          transition={{
            width: {
              type: 'spring',
              stiffness: 100,
              damping: 30,
              delay: 0.3,
            },
            opacity: { duration: 0.5, delay: 0.3 },
          }}
          className="progress-fill relative h-full"
        >
          {/* Shimmer effect */}
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  )
}
