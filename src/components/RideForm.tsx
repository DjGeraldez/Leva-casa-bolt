// src/components/RideForm.tsx
'use client'

import { useState } from 'react'

export default function RideForm() {
  const [title, setTitle] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // só exemplo: mostrar dados no console — logo podes substituir por fetch/axios
    console.log({ title, from, to })
    alert('Ride criado (mock): ' + title)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
      <div>
        <label className="block text-sm font-medium">Título</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
          placeholder="Ex.: Viagem para o centro"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">De</label>
          <input value={from} onChange={e => setFrom(e.target.value)} className="mt-1 block w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium">Para</label>
          <input value={to} onChange={e => setTo(e.target.value)} className="mt-1 block w-full p-2 border rounded" />
        </div>
      </div>

      <div>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
          Criar ride (mock)
        </button>
      </div>
    </form>
  )
}
