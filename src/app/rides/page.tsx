// src/app/rides/page.tsx
import mockRides from '@/data/mockRides'
import RideCard from '@/components/RideCard'

export default function RidesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold">Rides disponíveis</h1>

      <div className="space-y-4">
        {mockRides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </div>
    </section>
  )
}
