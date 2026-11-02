import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { streams } from '@/features/streams/data/stream-taxonomy'
import { getAdminStream } from '@/features/admin/data/admin-streams'
import { AdminStreamDetailView } from '@/features/admin/components/streams/admin-stream-detail-view'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return streams.map((stream) => ({ slug: stream.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const stream = getAdminStream(slug)
  return { title: stream ? `${stream.name} hub | Streams | Pathway Admin` : 'Stream not found | Pathway Admin' }
}

export default async function AdminStreamDetailPage({ params }: Props) {
  const { slug } = await params
  const stream = getAdminStream(slug)
  if (!stream) notFound()
  return <AdminStreamDetailView stream={stream} />
}
