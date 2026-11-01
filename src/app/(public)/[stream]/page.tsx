import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPublishedStreams, getStreamHub } from '@/features/streams/data/stream-hub'
import { StreamHubPage } from '@/features/streams/components/stream-hub-page'

type Props = { params: Promise<{ stream: string }> }

/**
 * Top-level stream hubs (/engineering, /medical …), as on Shiksha. Static
 * routes such as /colleges always win over this dynamic segment, and with
 * dynamicParams = false any other top-level path 404s.
 */
export function generateStaticParams() {
  return getPublishedStreams().map((stream) => ({ stream: stream.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hub = getStreamHub((await params).stream)
  if (!hub) return { title: 'Not Found' }
  return {
    title: `${hub.stream.name}: Colleges, Courses, Exams & Scholarships`,
    description: hub.stream.description,
    alternates: { canonical: `/${hub.stream.slug}` },
  }
}

export default async function StreamRoute({ params }: Props) {
  const hub = getStreamHub((await params).stream)
  if (!hub) notFound()
  const otherStreams = getPublishedStreams().filter((stream) => stream.slug !== hub.stream.slug)
  return <StreamHubPage hub={hub} otherStreams={otherStreams} />
}
