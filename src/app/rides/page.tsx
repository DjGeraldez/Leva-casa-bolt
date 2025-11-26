// src/app/rides/page.tsx

import Link from 'next/link';

export default function RidesPage() {
  const rides = [
    { id: 1, title: "Viagem para o centro", from: "Casa", to: "Centro" },
    { id: 2, title: "Trabalho → Casa", from: "Escritório", to: "Casa" },
  ];

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Lista de Rides</h1>

      <Link
        href="/rides/new"
        className="px-4 py-2 rounded-md bg-brand-500 text-white"
      >
        Criar nova ride
      </Link>

      <ul className="space-y-4 mt-4">
        {rides.map((ride) => (
          <li key={ride.id} className="border p-4 rounded-md">
            <h2 className="font-bold">{ride.title}</h2>
            <p>De: {ride.from}</p>
            <p>Para: {ride.to}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
