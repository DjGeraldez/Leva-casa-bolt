// src/components/RideForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RideForm() {
  const router = useRouter()
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('') // datetime-local
  const [seats, setSeats] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function toISO(localDatetime: string) {
    if (!localDatetime) return new Date().toISOString()
    return new Date(localDatetime).toISOString()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!origin || !destination || !date || seats <= 0) {
      setError('Preenche todos os campos corretamente.')
      return
    }

    setLoading(true)
    try {
      const body = { origin, destination, date: toISO(date), seats }
      const res = await fetch('/api/createRide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Erro ao criar ride')
      }
      const created = await res.json()
      router.push(`/rides/${created.id}`)
    } catch (err: any) {
      setError(err.message ?? 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4 bg-white p-4 rounded-md shadow-sm">
      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="block text-sm font-medium">Origem</label>
        <input
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="Ex: Praça Central"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Destino</label>
        <input
          value={destination}
          onChange={e => setDestination(e.target.value)}
          className="mt-1 w-full rounded-md border px-3 py-2"
          placeholder="Ex: Mercado"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Data e hora</label>
        <input
          value={date}
          onChange={e => setDate(e.target.value)}
          type="datetime-local"
          className="mt-1 w-full rounded-md border px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Lugares</label>
        <input
          value={seats}
          onChange={e => setSeats(Number(e.target.value))}
          type="number"
          min={1}
          className="mt-1 w-32 rounded-md border px-3 py-2"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-brand-500 text-white disabled:opacity-60"
        >
          {loading ? 'A criar...' : 'Criar ride'}
        </button>
      </div>
    </form>
  )
}
