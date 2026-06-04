'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { Variants } from 'framer-motion'

interface ActivityTileProps {
  className?: string
}

interface DayData {
  day: number
  week: number
  intensity: number
}

export function ActivityTile({ className = '' }: ActivityTileProps) {
  const [weeks, setWeeks] = useState<DayData[][]>([])
  const [isClient, setIsClient] = useState(false)

  // Generate mock activity data only on client side after hydration
  useEffect(() => {
    setIsClient(true)
    const generatedWeeks = Array.from({ length: 12 }, (_, i) => {
      return Array.from({ length: 7 }, (_, j) => ({
        day: j,
        week: i,
        intensity: Math.floor(Math.random() * 4),
      }))
    })
    setWeeks(generatedWeeks)
  }, [])

  const getIntensityColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return 'bg-neural-700'
      case 1:
        return 'bg-cyan-glow/30 hover:bg-cyan-glow/50'
      case 2:
        return 'bg-cyan-glow/60 hover:bg-cyan-glow/80'
      case 3:
        return 'bg-cyan-glow hover:bg-electric'
      default:
        return 'bg-neural-700'
    }
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 30,
        delay: 0.5,
      },
    },
  }

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.6,
      },
    },
  }

  const cellVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 200,
        damping: 20,
      },
    },
  }

  // const hoverVariants: Variants = {
  //   initial: { scale: 1 },
  //   hover: {
  //     scale: 1.02,
  //     transition: {
  //       type: 'spring' as const,
  //       stiffness: 300,
  //       damping: 20,
  //     },
  //   },
  // }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <article
        className={`bento-card col-span-1 md:col-span-2 lg:col-span-3 p-8 grain-texture ${className}`}
        style={{ minHeight: '300px' }}
      />
    )
  }

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`bento-card bento-card-hover col-span-1 md:col-span-2 lg:col-span-3 p-8 grain-texture ${className}`}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-neural-50 flex items-center gap-2">
              <TrendingUp className="text-cyan-glow" size={20} />
              Learning Activity
            </h3>
            <p className="text-sm text-neural-400 mt-1">
              Your contribution graph over the last 12 weeks
            </p>
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs px-3 py-1 rounded-full bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/30"
          >
            Active
          </motion.div>
        </div>

        {/* Activity grid */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
        >
          {weeks.map((week, weekIndex) => (
            <motion.div key={weekIndex} className="flex flex-col gap-2">
              {week.map((day) => (
                <motion.div
                  key={`${weekIndex}-${day.day}`}
                  variants={cellVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ scale: 1.5 }}
                  className={`w-4 h-4 rounded-sm cursor-pointer transition-all duration-200 ${getIntensityColor(
                    day.intensity
                  )} hover:ring-2 hover:ring-cyan-glow/50`}
                  title={`${
                    day.intensity > 0 ? day.intensity : 'No'
                  } activities`}
                />
              ))}
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-4 text-xs text-neural-400 border-t border-neural-700 pt-4">
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(i)}`}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-3 pt-4 border-t border-neural-700/50"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-glow">24</p>
            <p className="text-xs text-neural-400">Days Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-pulse">156</p>
            <p className="text-xs text-neural-400">Hours Learned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent-cool">8</p>
            <p className="text-xs text-neural-400">Current Streak</p>
          </div>
        </motion.div>
      </div>
    </motion.article>
  )
}