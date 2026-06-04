import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json(
        {
          error: 'Supabase is not configured',
          message: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY',
          hint: 'Check your .env.local file',
        },
        { status: 500 }
      )
    }

    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Database error:', error)
      return NextResponse.json(
        {
          error: 'Failed to fetch user progress',
          message: error.message,
        },
        { status: 500 }
      )
    }

    const defaultProgress = {
      daily_streak: 0,
      total_hours: 0,
      name: 'Learning Explorer',
    }

    return NextResponse.json({
      success: true,
      data: data || defaultProgress,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}