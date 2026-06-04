import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is missing in environment variables')
}

if (!supabaseKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in environment variables')
}

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
          hint: 'Check your .env.local file and ensure both variables are set correctly',
        },
        { status: 500 }
      )
    }

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        {
          error: 'Failed to fetch courses',
          message: error.message,
          hint: 'Check if your Supabase table exists and has correct permissions',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
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