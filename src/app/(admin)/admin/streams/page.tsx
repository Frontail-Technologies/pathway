import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getAdminStreams } from '@/features/admin/data/admin-streams'
import { AdminStreamsView } from '@/features/admin/components/streams/admin-streams-view'

export const metadata: Metadata = {
  title: 'Streams | Pathway Admin',
  description: 'Stream hubs and what they contain.',
}

export default function AdminStreamsPage() {
  return (
    <Suspense>
      <AdminStreamsView streams={getAdminStreams()} />
    </Suspense>
  )
}
