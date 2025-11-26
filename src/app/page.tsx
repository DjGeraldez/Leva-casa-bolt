// src/app/page.tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Bem-vindo ao LevaCasa</h1>
      <p className="text-gray-700">
        Partilha e aceita caronas na tua comunidade. Cria um novo trajeto ou vê o que já existe.
      </p>

      <div className="flex gap-3">
        <Link href="/rides" className="px-4 py-2 rounded-md bg-brand-500 text-white">
          Ver rides
        </Link>

        <Link href="/rides/new" className="px-4 py-2 rounded-md border border-brand-500 text-brand-500">
          Criar ride
        </Link>
      </div>
    </section>
  )
}
