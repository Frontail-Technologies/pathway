import type { Metadata } from 'next'
import { Suspense } from 'react'
import { JobsView } from '@/features/admin/components/scraper/jobs-view'

export const metadata: Metadata = {
  title: 'Runs | Pathway Admin',
  description: 'Fetch and upload runs.',
}

export default function Page() {
  return (
    <Suspense>
      <JobsView />
    </Suspense>
  )
}
