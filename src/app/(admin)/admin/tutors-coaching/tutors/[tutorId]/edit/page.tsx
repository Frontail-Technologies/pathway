import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminTutorById, getAdminTutors } from '@/features/admin/data/admin-tutors'
import { AdminTutorEditor } from '@/features/admin/components/tutors-coaching/tutors/editor/admin-tutor-editor'

type Props = {
  params: Promise<{ tutorId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tutorId } = await params
  const tutor = getAdminTutorById(tutorId)
  if (!tutor) return { title: 'Tutor not found | Pathway Admin' }

  return {
    title: `Edit ${tutor.name} | Tutors | Pathway Admin`,
    description: `Edit curriculum and profile for ${tutor.name}.`,
  }
}

export async function generateStaticParams() {
  const tutors = getAdminTutors()
  return tutors.map((t) => ({
    tutorId: t.id,
  }))
}

export default async function AdminEditTutorPage({ params }: Props) {
  const { tutorId } = await params
  const tutor = getAdminTutorById(tutorId)

  if (!tutor) {
    notFound()
  }

  return <AdminTutorEditor initialTutor={tutor} />
}
