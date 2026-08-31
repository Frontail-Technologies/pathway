import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCollegeDetail } from '@/features/colleges/data/college-detail'
import { CollegeDetailPage } from '@/features/colleges/components/college-detail-page'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export function generateStaticParams() {
  return [{ slug: 'iit-delhi' }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const college = getCollegeDetail(slug)
  return { title: college ? college.name : 'College Not Found' }
}

export default async function CollegeDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const college = getCollegeDetail(slug)
  if (!college) notFound()

  return (
    <>
      <CollegeDetailPage college={college} />
      <MobileBottomNavigation />
    </>
  )
}
