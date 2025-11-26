// src/app/api/getProfileByEmail/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { profiles as mockProfiles } from '@/lib/mockData'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const email = url.searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

    if (supabase) {
      const { data, error } = await supabase.from('profiles').select('*').eq('email', email).limit(1)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json(data?.[0] ?? null)
    }

    const profile = mockProfiles.find(p => p.email === email) ?? null
    return NextResponse.json(profile)
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 })
  }
}
