import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getStreamHub } from '@/features/streams/api/stream-hub-api'
import { streams } from '@/features/streams/data/stream-taxonomy'
import { StreamHubPage } from '@/features/streams/components/stream-hub-page'

type Props = { params: Promise<{ stream: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hub = await getStreamHub((await params).stream)
  if (!hub) return { title: 'Not Found' }
  return {
    title: `${hub.stream.name}: Colleges, Courses, Exams & Scholarships`,
    description: hub.stream.description,
    alternates: { canonical: `/${hub.stream.slug}` },
  }
}

export default async function StreamRoute({ params }: Props) {
  const hub = await getStreamHub((await params).stream)
  if (!hub) notFound()
  const otherStreams = streams.filter((stream) => stream.slug !== hub.stream.slug)
  return <StreamHubPage hub={hub} otherStreams={otherStreams} />
}
