// src/components/RideCard.tsx
export default function RideCard({ ride }: { ride: any }) {
  return (
    <article className="p-4 border rounded-md bg-white shadow-sm w-full">
      <h3 className="font-semibold">{ride.origin} → {ride.destination}</h3>
      <p className="text-sm text-gray-600">Data: {new Date(ride.date).toLocaleString()}</p>
      <p className="text-sm text-gray-600">Lugares: {ride.seats}</p>
    </article>
  )
}
