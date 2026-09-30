import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminTutorById, getAdminTutors } from '@/features/admin/data/admin-tutors'
import { AdminTutorDetailView } from '@/features/admin/components/tutors-coaching/tutors/detail/admin-tutor-detail-view'

type Props = {
  params: Promise<{ tutorId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tutorId } = await params
  const tutor = getAdminTutorById(tutorId)
  if (!tutor) return { title: 'Tutor Not Found | Pathway Admin' }

  return {
    title: `${tutor.name} | Tutor Details | Pathway Admin`,
    description: `Admin profile and curriculum details for ${tutor.name}.`,
  }
}

export async function generateStaticParams() {
  const tutors = getAdminTutors()
  return tutors.map((t) => ({
    tutorId: t.id,
  }))
}

export default async function AdminTutorDetailPage({ params }: Props) {
  const { tutorId } = await params
  const tutor = getAdminTutorById(tutorId)

  if (!tutor) {
    notFound()
  }

  return <AdminTutorDetailView tutor={tutor} />
}
