// src/app/api/listRides/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { rides as mockRides } from '@/lib/mockData'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    if (supabase) {
      const { data, error } = await supabase.from('rides').select('*')
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json(data)
    }

    // fallback: mock data
    return NextResponse.json(mockRides)
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 })
  }
}
