// src/lib/mockData.ts
import { v4 as uuidv4 } from 'uuid'

export type Ride = {
  id: string
  driverEmail?: string | null
  origin: string
  destination: string
  date: string
  seats: number
  acceptedBy?: string | null
}

export const rides: Ride[] = [
  {
    id: uuidv4(),
    origin: 'Praça Central',
    destination: 'Mercado',
    date: new Date().toISOString(),
    seats: 3,
  },
]

export const profiles = [
  { email: 'maria@example.com', name: 'Maria', phone: '912345678' },
]
