import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ImportsView } from '@/features/admin/components/scraper/imports-view'

export const metadata: Metadata = {
  title: 'Review | Pathway Admin',
  description: 'Batches of imported records waiting for review.',
}

export default function Page() {
  return (
    <Suspense>
      <ImportsView />
    </Suspense>
  )
}
