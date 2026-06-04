'use client'

import { useState, useEffect } from 'react'
import { HeroTile } from './HeroTile'
import { CourseCard } from './CourseCard'
import { ActivityTile } from './ActivityTile'
import { DashboardSkeleton, CardSkeleton } from './Skeleton'
import { AlertCircle } from 'lucide-react'
import { fetchCoursesFromAPI, fetchUserProgressFromAPI } from '@/lib/api-client'
import type { Course, UserProgress } from '@/lib/types'

export function DashboardContent() {
  const [courses, setCourses] = useState<Course[]>([])
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)
        
        const [coursesData, progressData] = await Promise.all([
          fetchCoursesFromAPI(),
          fetchUserProgressFromAPI()
        ])
        
        setCourses(coursesData)
        setUserProgress(progressData)
      } catch (err) {
        console.error('Error loading dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-48 bg-neural-800 rounded animate-pulse" />
            <div className="h-4 w-64 bg-neural-800 rounded mt-2 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <div className="bento-card p-8 border-red-500/30 bg-red-500/5">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <div>
                <p className="font-semibold">Error loading dashboard</p>
                <p className="text-sm text-red-300/80">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-500/20 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto">
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neural-50">Learning Dashboard</h2>
            <p className="text-neural-400 text-sm mt-1">
              Track your progress and continue your learning journey
            </p>
          </div>
          <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/30">
            ● Online
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
          {userProgress && <HeroTile userProgress={userProgress} />}
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
          <ActivityTile />
        </div>

        <div className="mt-12 text-center text-neural-400 text-xs">
          <p>
            Last updated:{' '}
            <span className="text-neural-300">
              {new Date().toLocaleTimeString()}
            </span>
          </p>
        </div>
      </div>
    </main>
  )
}