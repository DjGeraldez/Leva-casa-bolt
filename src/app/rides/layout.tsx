// src/app/rides/layout.tsx
import { ReactNode } from 'react'

export default function RidesLayout({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>
}
