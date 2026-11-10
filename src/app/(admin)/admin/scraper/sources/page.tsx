import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SourcesView } from '@/features/admin/components/scraper/sources-view'

export const metadata: Metadata = {
  title: 'Sources | Pathway Admin',
  description: 'Approved official data sources.',
}

export default function Page() {
  return (
    <Suspense>
      <SourcesView />
    </Suspense>
  )
}
