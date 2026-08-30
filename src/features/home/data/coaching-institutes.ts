export type CoachingInstitute = {
  id: string
  name: string
  focus: string
  city: string
  mode: 'Online' | 'Offline' | 'Both'
  rating: number
  reviewCount: number
  verified?: boolean
}

export const coachingInstitutes: CoachingInstitute[] = [
  { id: 'c1', name: 'Apex JEE Academy', focus: 'JEE Main & Advanced', city: 'Kota', mode: 'Both', rating: 4.6, reviewCount: 340, verified: true },
  { id: 'c2', name: 'MedPrep Institute', focus: 'NEET UG', city: 'Delhi', mode: 'Offline', rating: 4.5, reviewCount: 210, verified: true },
  { id: 'c3', name: 'Central CUET Classes', focus: 'CUET UG', city: 'Pune', mode: 'Online', rating: 4.4, reviewCount: 128 },
  { id: 'c4', name: 'Horizon CAT Coaching', focus: 'CAT & MBA Entrance', city: 'Mumbai', mode: 'Both', rating: 4.7, reviewCount: 176, verified: true },
]
