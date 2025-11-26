// src/app/rides/new/page.tsx
import dynamic from 'next/dynamic'
import Link from 'next/link'

// Carregamos o componente RideForm como client component
const RideForm = dynamic(() => import('../../../components/RideForm'), {
  ssr: false
});


export default function NewRidePage() {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Criar um novo ride</h2>
        <Link href="/rides" className="text-sm underline">
          Voltar
        </Link>
      </div>

      <div className="mt-4">
        <RideForm />
      </div>
    </section>
  )
}
