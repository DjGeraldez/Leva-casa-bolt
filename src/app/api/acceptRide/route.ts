// src/app/api/acceptRide/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { rides as mockRides } from '@/lib/mockData'
import { supabase } from '@/lib/supabase'

export async function PATCH(req: NextRequest) {
  const { id, acceptBy } = await req.json()
  if (supabase) {
    const { data, error } = await supabase
      .from('rides')
      .update({ acceptedBy: acceptBy })
      .eq('id', id)
      .select()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data?.[0])
  }

  const ride = mockRides.find(r => r.id === id)
  if (!ride) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  ride.acceptedBy = acceptBy
  return NextResponse.json(ride)
}
