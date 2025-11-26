// src/app/rides/[id]/page.tsx
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Ride = {
  id: string
  origin: string
  destination: string
  date: string
  seats: number
  acceptedBy?: string | null
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return { title: `Ride ${params.id}` }
}

export default async function RideDetailPage({ params }: { params: { id: string } }) {
  // Tenta fetch absoluto (útil em produção). Em dev cai no fallback relativo.
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? ''
  let data: Ride[] = []

  try {
    const res = await fetch(`${base}/api/listRides`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Erro ao chamar API')
    data = await res.json()
  } catch {
    // Fallback para fetch relativo (funciona quando corres em localhost)
    const res2 = await fetch('/api/listRides', { cache: 'no-store' })
    if (!res2.ok) throw new Error('Erro a buscar rides (fallback)')
    data = await res2.json()
  }

  const ride = data.find(r => r.id === params.id)
  if (!ride) return notFound()

  return (
    <section>
      <h1 className="text-2xl font-semibold">
        {ride.origin} → {ride.destination}
      </h1>

      <div className="mt-4 space-y-2">
        <p><strong>Data:</strong> {new Date(ride.date).toLocaleString()}</p>
        <p><strong>Lugares:</strong> {ride.seats}</p>
        <p><strong>Aceite por:</strong> {ride.acceptedBy ?? 'Ainda ninguém'}</p>
      </div>
    </section>
  )
}
