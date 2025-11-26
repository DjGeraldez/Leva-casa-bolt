// src/app/layout.tsx
import '@/styles/globals.css'
import Header from '@/components/Header'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'LevaCasa',
  description: 'LevaCasa - Bolt.diy rebuild',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
