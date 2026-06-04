import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  const checks = {
    supabaseUrl: !!supabaseUrl,
    supabaseKey: !!supabaseKey,
  }

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Missing environment variables',
        checks,
        instructions: {
          1: 'Copy .env.example to .env.local',
          2: 'Get your Supabase URL from: https://supabase.com/dashboard',
          3: 'Get your Anon Key from: Project Settings → API',
          4: 'Add these to .env.local',
          5: 'Restart your dev server (npm run dev)',
        },
      },
      { status: 500 }
    )
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
      .from('courses')
      .select('count')
      .limit(1)

    if (error) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Supabase connection failed',
          error: error.message,
          checks: {
            ...checks,
            database: false,
          },
          instructions: {
            1: 'Verify your Supabase credentials are correct',
            2: 'Check that the "courses" table exists in Supabase',
            3: 'Run the SQL setup from SETUP.md to create tables',
            4: 'Check table permissions in Supabase Dashboard',
          },
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'ok',
      message: 'Supabase is connected and working',
      checks: {
        ...checks,
        database: true,
      },
      supabaseUrl: supabaseUrl.replace(/https:\/\//, ''),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to check Supabase connection',
        error: error instanceof Error ? error.message : 'Unknown error',
        checks,
      },
      { status: 500 }
    )
  }
}