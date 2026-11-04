import type { Metadata } from 'next'
import { getAdminCoachingProviders } from '@/features/admin/data/admin-coaching'
import { AdminTutorsCoachingView } from '@/features/admin/components/tutors-coaching/landing/admin-tutors-coaching-view'

export const metadata: Metadata = {
  title: 'Tutors & coaching | Pathway Admin',
  description: 'Manage individual educators and coaching provider profiles.',
}

export default function AdminTutorsCoachingPage() {
  const coachingProviders = getAdminCoachingProviders()

  return (
    <AdminTutorsCoachingView
      coachingProviders={coachingProviders}
    />
  )
}
