'use client'

import { motion } from 'framer-motion'
import { Flame, Brain } from 'lucide-react'
import { UserProgress } from '@/lib/types'

interface HeroTileProps {
  userProgress: UserProgress
}

export function HeroTile({ userProgress }: HeroTileProps) {
  const name = userProgress.name || 'Learning Explorer'
  const streak = userProgress.daily_streak || 0
  const hours = userProgress.total_hours || 0

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const, // Use 'as const' to make it a literal type
        stiffness: 100,
        damping: 30,
        delay: 0.1,
      },
    },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: (delay: number) => ({
      opacity: 1,
      transition: { delay, duration: 0.5 },
    }),
  }

  // const hoverVariants = {
  //   initial: { scale: 1 },
  //   hover: {
  //     scale: 1.02,
  //     transition: {
  //       type: 'spring' as const, // Use 'as const' here too
  //       stiffness: 300,
  //       damping: 20,
  //     },
  //   },
  // }

  return (
    <motion.article
      variants={containerVariants} // Only one variants prop now
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bento-card bento-card-hover col-span-1 md:col-span-2 p-8 grain-texture overflow-hidden relative group"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-glow/20 to-transparent rounded-full blur-3xl"
      />

      <div className="relative z-10 space-y-8">
        {/* Main greeting */}
        <motion.div custom={0} variants={textVariants} initial="hidden" animate="visible">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neural-50 to-cyan-glow bg-clip-text text-transparent leading-tight">
            Welcome back, <br />
            <span className="text-transparent bg-gradient-to-r from-cyan-glow via-electric to-pulse bg-clip-text">
              {name}
            </span>
          </h1>
          <p className="text-neural-400 mt-3 text-lg">
            Your learning awaits. Let&apos;s make today count.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          custom={0.2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-4"
        >
          {/* Streak stat */}
          <motion.div
            className="bento-card p-4 border border-cyan-glow/30 bg-gradient-to-br from-cyan-glow/10 to-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Flame className="text-accent-warm" size={20} />
              </motion.div>
              <span className="text-xs text-neural-400 uppercase tracking-wider">
                Streak
              </span>
            </div>
            <p className="text-3xl font-bold text-cyan-glow">{streak}</p>
            <p className="text-xs text-neural-400 mt-1">days in a row</p>
          </motion.div>

          {/* Hours stat */}
          <motion.div
            className="bento-card p-4 border border-pulse/30 bg-gradient-to-br from-pulse/10 to-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="text-pulse" size={20} />
              </motion.div>
              <span className="text-xs text-neural-400 uppercase tracking-wider">
                Total Hours
              </span>
            </div>
            <p className="text-3xl font-bold text-pulse">{hours}</p>
            <p className="text-xs text-neural-400 mt-1">learning time</p>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          custom={0.4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 px-6 rounded-lg font-semibold bg-gradient-to-r from-cyan-glow to-pulse text-neural-950 hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] transition-shadow"
        >
          Continue Your Learning Journey
        </motion.button>
      </div>
    </motion.article>
  )
}