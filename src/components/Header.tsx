// src/components/Header.tsx
import Link from 'next/link'

export default function Header() {
  return (
    <header className="p-4 bg-brand-500 text-white">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-semibold">LevaCasa</Link>
        <nav>
          <Link href="/" className="mr-4">Home</Link>
          <Link href="/rides">Rides</Link>
        </nav>
      </div>
    </header>
  )
}
