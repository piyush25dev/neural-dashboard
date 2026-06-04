import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function fetchCourses() {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase fetch error:', error.message)
      throw new Error('Failed to fetch courses')
    }

    return data || []
  } catch (error) {
    console.error('Error fetching courses:', error)
    throw error
  }
}

export async function fetchUserProgress() {
  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase fetch error:', error.message)
      throw error
    }

    return data || { daily_streak: 0, total_hours: 0 }
  } catch (error) {
    console.error('Error fetching user progress:', error)
    return { daily_streak: 0, total_hours: 0 }
  }
}
