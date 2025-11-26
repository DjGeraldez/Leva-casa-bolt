// src/app/rides/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import RideCard from '@/components/RideCard'

type Ride = {
  id: string
  origin: string
  destination: string
  date: string
  seats: number
  acceptedBy?: string | null
}

export default function RidesPage() {
  const [rides, setRides] = useState<Ride[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/listRides')
      if (!res.ok) throw new Error('Erro a carregar rides')
      const data = await res.json()
      setRides(data)
    } catch (err: any) {
      setError(err.message ?? 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function acceptRide(id: string) {
    const acceptBy = 'maria@example.com' // placeholder: depois integraremos com login para usar o email real
    try {
      const res = await fetch('/api/acceptRide', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, acceptBy }),
      })
      if (!res.ok) throw new Error('Falha ao aceitar')
      const updated = await res.json()
      setRides(prev => prev.map(r => (r.id === id ? updated : r)))
    } catch (err: any) {
      alert('Erro: ' + (err.message ?? ''))
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Rides disponíveis</h2>
        <Link href="/rides/new" className="px-3 py-1 rounded-md border border-brand-500 text-brand-500">
          + Criar
        </Link>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="mt-4 grid gap-4">
        {rides.length === 0 && !loading ? (
          <p>Nenhum ride encontrado.</p>
        ) : (
          rides.map(r => (
            <div key={r.id} className="flex items-start justify-between gap-4">
              <RideCard ride={r} />
              <div className="flex flex-col gap-2">
                <Link href={`/rides/${r.id}`} className="text-sm underline">
                  Ver
                </Link>
                {r.acceptedBy ? (
                  <span className="text-sm text-green-600">Aceite por {r.acceptedBy}</span>
                ) : (
                  <button
                    onClick={() => acceptRide(r.id)}
                    className="px-3 py-1 rounded-md bg-brand-500 text-white text-sm"
                  >
                    Aceitar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
