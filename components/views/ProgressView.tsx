'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Award, Clock, Loader, AlertCircle, Flame } from 'lucide-react'
import { useEffect, useState } from 'react'

interface UserProgress {
  id: string
  daily_streak: number
  total_hours: number
  last_active: string
  name: string
  updated_at: string
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1500
    const start = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      setDisplayValue(Math.floor(progress * value))

      if (progress === 1) clearInterval(timer)
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return <>{displayValue}{suffix}</>
}

export function ProgressView() {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const response = await fetch('/api/user-progress')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch progress')
        }

        setUserProgress(data.data)
        setError(null)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        setError(errorMessage)
        console.error('❌ Error fetching progress:', errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Loader className="text-cyan-glow" size={32} />
        </motion.div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bento-card p-6 border-red-500/30 bg-red-500/5"
          >
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <div>
                <p className="font-semibold">Error loading progress</p>
                <p className="text-sm text-red-300/80">{error}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  if (!userProgress) {
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <p className="text-neural-400">No data available</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-neural-50 mb-2 flex items-center gap-2">
            <TrendingUp className="text-pulse" size={32} />
            Your Progress
          </h2>
          <p className="text-neural-400 mb-8">
            Track your learning journey and achievements - {userProgress.name}
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Daily Streak Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bento-card p-6 hover:border-orange-400/50 transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  <Flame className="text-orange-400" size={24} />
                </motion.div>
                <h3 className="text-lg font-semibold text-neural-50">Daily Streak</h3>
              </div>
              <p className="text-4xl font-bold text-orange-400 mb-1">
                <AnimatedNumber value={userProgress.daily_streak} />
              </p>
              <p className="text-neural-400 text-sm">days in a row</p>
            </motion.div>

            {/* Total Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bento-card p-6 hover:border-cyan-glow/50 transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-cyan-glow" size={24} />
                <h3 className="text-lg font-semibold text-neural-50">Learning Time</h3>
              </div>
              <p className="text-4xl font-bold text-cyan-glow mb-1">
                <AnimatedNumber value={userProgress.total_hours} suffix="h" />
              </p>
              <p className="text-neural-400 text-sm">total hours</p>
            </motion.div>

            {/* Achievements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bento-card p-6 hover:border-accent-warm/50 transition-all"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-accent-warm" size={24} />
                <h3 className="text-lg font-semibold text-neural-50">Achievements</h3>
              </div>
              <p className="text-4xl font-bold text-accent-warm mb-1">12</p>
              <p className="text-neural-400 text-sm">badges earned</p>
            </motion.div>
          </div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bento-card p-6"
          >
            <h3 className="text-lg font-semibold text-neural-50 mb-4">Activity Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-neural-700">
                <span className="text-neural-400">Member Name</span>
                <span className="text-cyan-glow font-medium">{userProgress.name}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-neural-700">
                <span className="text-neural-400">Current Streak</span>
                <span className="text-orange-400 font-medium flex items-center gap-1">
                  <Flame size={16} />
                  {userProgress.daily_streak} days
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-neural-700">
                <span className="text-neural-400">Total Learning Hours</span>
                <span className="text-cyan-glow font-medium">{userProgress.total_hours}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neural-400">Last Active</span>
                <span className="text-neural-300 text-sm">
                  {new Date(userProgress.last_active).toLocaleDateString()} at{' '}
                  {new Date(userProgress.last_active).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Motivational Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-neural-300 text-lg">
              🎯 Keep up the momentum! You&apos;re on a <span className="text-orange-400 font-bold">{userProgress.daily_streak}-day streak</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}