import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getTutorBySlug, tutors } from '@/features/tutors/data/tutors'
import { TutorDetailPage } from '@/features/tutors/components/tutor-detail-page'

export function generateStaticParams() {
  return tutors.filter((tutor) => tutor.hasDetailPage).map((tutor) => ({ slug: tutor.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tutor = getTutorBySlug(slug)
  return { title: tutor ? tutor.name : 'Tutor Not Found', description: tutor?.intro }
}

export default async function TutorDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tutor = getTutorBySlug(slug)
  if (!tutor?.detail) notFound()

  return (
    <>
      <TutorDetailPage tutor={{ ...tutor, detail: tutor.detail }} />
    </>
  )
}
