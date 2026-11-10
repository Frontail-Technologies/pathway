import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ScraperOverviewView } from '@/features/admin/components/scraper/scraper-overview-view'

export const metadata: Metadata = {
  title: 'Data imports | Pathway Admin',
  description: 'Official sources, runs and records waiting for review.',
}

export default function Page() {
  return (
    <Suspense>
      <ScraperOverviewView />
    </Suspense>
  )
}
