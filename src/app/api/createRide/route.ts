// src/app/api/createRide/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { rides as mockRides } from '@/lib/mockData'
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (supabase) {
    const { data, error } = await supabase.from('rides').insert([body]).select()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data?.[0], { status: 201 })
  }

  const newRide = { id: uuidv4(), ...body }
  mockRides.push(newRide)
  return NextResponse.json(newRide, { status: 201 })
}
