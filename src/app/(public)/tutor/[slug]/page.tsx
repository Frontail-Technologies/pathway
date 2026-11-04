import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTutorProfile } from '@/features/tutors/api/tutors-api'
import { TutorDetailPage } from '@/features/tutors/components/tutor-detail-page'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tutor = await getTutorProfile(slug)
  return { title: tutor ? tutor.name : 'Tutor Not Found', description: tutor?.intro }
}

export default async function TutorDetailRoute({ params }: Props) {
  const { slug } = await params
  const tutor = await getTutorProfile(slug)
  if (!tutor) notFound()
  return <TutorDetailPage tutor={tutor} />
}
