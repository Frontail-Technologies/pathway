import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getCoachingDetail } from '@/features/coaching/api/coaching-api'
import { CoachingDetailPage } from '@/features/coaching/components/coaching-detail-page'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const provider = await getCoachingDetail(slug)
  return { title: provider ? provider.name : 'Coaching Institute Not Found' }
}

export default async function CoachingDetailRoute({ params }: Props) {
  const { slug } = await params
  const provider = await getCoachingDetail(slug)
  if (!provider) notFound()
  return <CoachingDetailPage provider={provider} />
}
