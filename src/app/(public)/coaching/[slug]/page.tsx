import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCoachingDetail } from '@/features/coaching/data/coaching'
import { CoachingDetailPage } from '@/features/coaching/components/coaching-detail-page'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export function generateStaticParams() {
  return [{ slug: 'apex-jee-academy-kota' }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const provider = getCoachingDetail(slug)
  return { title: provider ? provider.name : 'Coaching Institute Not Found' }
}

export default async function CoachingDetailRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const provider = getCoachingDetail(slug)
  if (!provider) notFound()

  return (
    <>
      <CoachingDetailPage provider={provider} />
      <MobileBottomNavigation />
    </>
  )
}
