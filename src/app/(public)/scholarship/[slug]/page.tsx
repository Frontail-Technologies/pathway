import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getScholarshipDetail } from '@/features/scholarships/data/scholarship-detail'
import { ScholarshipDetailPage } from '@/features/scholarships/components/scholarship-detail-page'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export function generateStaticParams() {
  return [{ slug: 'aicte-pragati-scholarship-girls' }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const scholarship = getScholarshipDetail(slug)
  return { title: scholarship ? scholarship.name : 'Scholarship Not Found' }
}

export default async function ScholarshipDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scholarship = getScholarshipDetail(slug)
  if (!scholarship) notFound()

  return (
    <>
      <ScholarshipDetailPage scholarship={scholarship} />
      <MobileBottomNavigation />
    </>
  )
}
