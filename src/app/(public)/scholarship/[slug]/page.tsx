import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getScholarshipDetail } from '@/features/scholarships/api/scholarships-api'
import { ScholarshipDetailPage } from '@/features/scholarships/components/scholarship-detail-page'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const scholarship = await getScholarshipDetail(slug)
  return { title: scholarship ? scholarship.name : 'Scholarship Not Found' }
}

export default async function ScholarshipDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scholarship = await getScholarshipDetail(slug)
  if (!scholarship) notFound()

  return (
    <>
      <ScholarshipDetailPage scholarship={scholarship} />
    </>
  )
}
