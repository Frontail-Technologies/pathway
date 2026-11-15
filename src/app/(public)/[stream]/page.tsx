import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getStreamLanding } from '@/features/streams/api/stream-landing'
import { listStreams } from '@/features/streams/api/streams-api'
import { StreamHubPage } from '@/features/streams/components/stream-hub-page'

type Props = { params: Promise<{ stream: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const landing = await getStreamLanding((await params).stream)
  if (!landing) return { title: 'Not Found' }
  return {
    title: `${landing.stream.name}: Colleges, Exams, Courses & Scholarships`,
    description: landing.stream.description,
    alternates: { canonical: `/${landing.stream.slug}` },
  }
}

export default async function StreamRoute({ params }: Props) {
  const landing = await getStreamLanding((await params).stream)
  if (!landing) notFound()
  const otherStreams = (await listStreams()).filter((stream) => stream.slug !== landing.stream.slug)
  return <StreamHubPage landing={landing} otherStreams={otherStreams} />
}
