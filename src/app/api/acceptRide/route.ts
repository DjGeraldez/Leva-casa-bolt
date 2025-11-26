// src/app/api/acceptRide/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { rides as mockRides } from '@/lib/mockData'
import { supabase } from '@/lib/supabase'

export async function PATCH(req: NextRequest) {
  try {
    const { id, acceptBy } = await req.json()
    if (!id || !acceptBy) {
      return NextResponse.json({ error: 'id and acceptBy are required' }, { status: 400 })
    }

    if (supabase) {
      const { data, error } = await supabase
        .from('rides')
        .update({ acceptedBy: acceptBy })
        .eq('id', id)
        .select()
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json(data?.[0] ?? null)
    }

    // fallback mock
    const ride = mockRides.find(r => r.id === id)
    if (!ride) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    ride.acceptedBy = acceptBy
    return NextResponse.json(ride)
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 })
  }
}
