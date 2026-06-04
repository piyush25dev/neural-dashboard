import { Course, UserProgress } from './types'
import { cache } from 'react'

// Get the base URL - works on both server and client
function getBaseUrl(): string {
  // For server-side (Server Components)
  if (typeof window === 'undefined') {
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`
    }
    // Development server
    return 'http://localhost:3000'
  }
  
  // For client-side
  return window.location.origin
}

const API_BASE = '/api'

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  hint?: string
}

// Cache the courses fetch function to prevent repeated calls
export const fetchCoursesFromAPI = cache(async (): Promise<Course[]> => {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}${API_BASE}/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for 5 minutes in production, no-store in development for fresh data
      ...(process.env.NODE_ENV === 'production' 
        ? { next: { revalidate: 300 } } // Revalidate every 5 minutes in production
        : { cache: 'no-store' } // Fresh data in development
      ),
    })

    if (!response.ok) {
      const error = (await response.json()) as ApiResponse<null>
      console.error('❌ Courses API Error:', error)
      throw new Error(error.message || 'Failed to fetch courses')
    }

    const result = (await response.json()) as ApiResponse<Course[]>

    if (!result.success || !result.data) {
      throw new Error('Invalid API response')
    }

    return result.data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ Error fetching courses:', message)
    throw error
  }
})

// Cache the user progress fetch function
export const fetchUserProgressFromAPI = cache(async (): Promise<UserProgress> => {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}${API_BASE}/user-progress`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cache for 2 minutes in production, no-store in development
      ...(process.env.NODE_ENV === 'production' 
        ? { next: { revalidate: 120 } } // Revalidate every 2 minutes in production
        : { cache: 'no-store' } // Fresh data in development
      ),
    })

    if (!response.ok) {
      const error = (await response.json()) as ApiResponse<null>
      console.error('❌ User Progress API Error:', error)
      throw new Error(error.message || 'Failed to fetch user progress')
    }

    const result = (await response.json()) as ApiResponse<UserProgress>

    if (!result.success || !result.data) {
      throw new Error('Invalid API response')
    }

    return result.data
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('❌ Error fetching user progress:', message)
    // Return default values on error
    return {
      daily_streak: 0,
      total_hours: 0,
      name: 'Learning Explorer',
    }
  }
})

// No need to cache health check as it's called rarely
export async function checkSupabaseStatus(): Promise<{
  connected: boolean
  message: string
  error?: string
}> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}${API_BASE}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache', // Don't cache health checks
    })

    if (response.ok) {
      return {
        connected: true,
        message: 'Supabase is connected',
      }
    } else {
      const error = await response.json()
      return {
        connected: false,
        message: 'Supabase connection failed',
        error: error.message,
      }
    }
  } catch (error) {
    return {
      connected: false,
      message: 'Could not check Supabase connection',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}