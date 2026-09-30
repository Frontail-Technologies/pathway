import type { Metadata } from 'next'
import { getAdminTutors } from '@/features/admin/data/admin-tutors'
import { getAdminCoachingProviders } from '@/features/admin/data/admin-coaching'
import { AdminTutorsCoachingView } from '@/features/admin/components/tutors-coaching/landing/admin-tutors-coaching-view'

export const metadata: Metadata = {
  title: 'Tutors & Coaching Management | Pathway Admin',
  description: 'Manage individual educators and coaching provider profiles.',
}

export default function AdminTutorsCoachingPage() {
  const tutors = getAdminTutors()
  const coachingProviders = getAdminCoachingProviders()

  return (
    <AdminTutorsCoachingView
      tutors={tutors}
      coachingProviders={coachingProviders}
    />
  )
}
