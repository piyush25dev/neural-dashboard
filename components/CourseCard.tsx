'use client'

import { motion } from 'framer-motion'
import { Course } from '@/lib/types'
import { DynamicIcon } from './DynamicIcon'
import { AnimatedProgressBar } from './AnimatedProgressBar'

interface CourseCardProps {
  course: Course
  index: number
}

export function CourseCard({ course, index }: CourseCardProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 30,
        delay: i * 0.1 + 0.3,
      },
    }),
  }

  // const hoverVariants = {
  //   initial: { scale: 1, y: 0 },
  //   hover: {
  //     scale: 1.02,
  //     y: -4,
  //     transition: {
  //       type: 'spring' as const,
  //       stiffness: 300,
  //       damping: 20,
  //     },
  //   },
  // }

  return (
    <motion.article
      custom={index}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bento-card bento-card-hover p-6 grain-texture group cursor-pointer"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Header with icon and badge */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="p-3 rounded-lg bg-gradient-to-br from-cyan-glow/20 to-pulse/10 border border-cyan-glow/20"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <DynamicIcon
                name={course.icon_name}
                className="text-cyan-glow"
                size={20}
              />
            </motion.div>
            <div>
              <h3 className="font-semibold text-neural-50 line-clamp-2 text-sm">
                {course.title}
              </h3>
            </div>
          </div>
          <motion.div
            className="px-2 py-1 rounded-md text-xs font-mono bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {course.progress}%
          </motion.div>
        </div>

        {/* Progress bar */}
        <AnimatedProgressBar progress={course.progress} showPercentage={false} />

        {/* Footer with interactive CTA */}
        <motion.button
          className="w-full mt-4 py-2 rounded-lg text-xs font-medium text-neural-900 bg-gradient-to-r from-cyan-glow to-pulse hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continue Learning →
        </motion.button>
      </div>
    </motion.article>
  )
}