'use client'

import { motion } from 'framer-motion'
import { BookOpen, Loader, AlertCircle, RotateCw } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Course {
  id: string
  title: string
  progress: number
  icon_name: string
  description?: string
  created_at: string
}

interface ApiResponse {
  success: boolean
  data?: Course[]
  count?: number
  error?: string
  message?: string
  hint?: string
}

export function CoursesView() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('📚 Fetching courses from /api/courses...')
      
      const response = await fetch('/api/courses', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      })

      console.log('📊 Response status:', response.status)

      const data: ApiResponse = await response.json()

      console.log('📦 Response JSON:', data)

      if (!response.ok) {
        const errorMsg = data?.message || data?.error || `HTTP ${response.status}`
        console.error('❌ API Error:', errorMsg)
        throw new Error(errorMsg)
      }

      if (!data.success) {
        console.error('❌ API returned success: false')
        throw new Error(data?.message || 'API returned success: false')
      }

      if (!data.data) {
        console.error('❌ No data property in response')
        throw new Error('No data property in response')
      }

      if (!Array.isArray(data.data)) {
        console.error('❌ Data is not an array:', typeof data.data, data.data)
        throw new Error(`Expected array, got ${typeof data.data}`)
      }

      if (data.data.length === 0) {
        console.warn('⚠️ API returned empty array')
      }

      console.log(`✅ Successfully loaded ${data.data.length} courses`)
      setCourses(data.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      console.error('❌ Error fetching courses:', errorMessage)
      setError(errorMessage)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold text-neural-50 mb-2 flex items-center gap-2">
                <BookOpen className="text-cyan-glow" size={32} />
                My Courses
              </h2>
              <p className="text-neural-400">
                All your learning courses in one place
              </p>
            </div>
            {!loading && (
              <motion.button
                onClick={fetchCourses}
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg bg-neural-800 border border-neural-700 text-neural-300 hover:text-cyan-glow hover:border-cyan-glow/50 transition-colors"
                title="Refresh courses"
              >
                <RotateCw size={20} />
              </motion.button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="mb-4"
              >
                <Loader className="text-cyan-glow" size={32} />
              </motion.div>
              <p className="text-neural-400">Loading courses...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bento-card p-6 border-red-500/30 bg-red-500/5 mb-8"
            >
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <AlertCircle size={20} />
                <div className="flex-1">
                  <p className="font-semibold">Error loading courses</p>
                  <p className="text-sm text-red-300/80">{error}</p>
                </div>
              </div>
              <motion.button
                onClick={fetchCourses}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded transition-colors text-sm font-medium"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}

          {/* Courses Grid */}
          {!loading && !error && courses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bento-card p-6 hover:border-cyan-glow/50 transition-all group cursor-pointer"
                  whileHover={{ y: -4 }}
                >
                  <h3 className="text-lg font-semibold text-neural-50 mb-2 group-hover:text-cyan-glow transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-neural-400 text-sm mb-4">
                    {course.description || 'Master this course and level up your skills'}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-neural-400">Progress</span>
                      <span className="text-cyan-glow text-sm font-mono font-bold">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-neural-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-cyan-glow to-pulse rounded-full"
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 rounded text-sm bg-cyan-glow/20 text-cyan-glow hover:bg-cyan-glow/30 transition-colors font-medium"
                  >
                    Continue Learning →
                  </motion.button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && courses.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12 bento-card p-8"
            >
              <BookOpen className="text-neural-600 mx-auto mb-4" size={48} />
              <p className="text-neural-400 text-lg font-semibold mb-2">No courses found</p>
              <p className="text-neural-500 text-sm mb-6">The API returned an empty courses list</p>
              <motion.button
                onClick={fetchCourses}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-glow/20 text-cyan-glow hover:bg-cyan-glow/30 rounded transition-colors text-sm font-medium"
              >
                Refresh Courses
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  )
}