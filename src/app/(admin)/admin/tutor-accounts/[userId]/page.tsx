import type { Metadata } from 'next'
import { AdminTutorAccountDetailView } from '@/features/admin/components/tutor-accounts/detail/admin-tutor-account-detail-view'

type Props = { params: Promise<{ userId: string }> }

export const metadata: Metadata = {
  title: 'Tutor review | Pathway Admin',
  description: 'Review a tutor profile submitted from Tutor Space.',
}

export default async function AdminTutorAccountPage({ params }: Props) {
  const { userId } = await params
  return <AdminTutorAccountDetailView userId={userId} />
}
