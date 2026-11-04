import type { Metadata } from 'next'
import { AdminTutorDetailLoader } from '@/features/admin/components/tutors-coaching/tutors/detail/admin-tutor-detail-loader'

type Props = { params: Promise<{ tutorId: string }> }

export const metadata: Metadata = { title: 'Tutor | Pathway Admin', description: 'Catalog tutor record.' }

export default async function AdminTutorDetailPage({ params }: Props) {
  const { tutorId } = await params
  return <AdminTutorDetailLoader tutorId={tutorId} />
}
