import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ConflictsView } from '@/features/admin/components/scraper/conflicts-view'

export const metadata: Metadata = {
  title: 'Conflicts | Pathway Admin',
  description: 'Fields where a source disagrees with a staff edit.',
}

export default function Page() {
  return (
    <Suspense>
      <ConflictsView />
    </Suspense>
  )
}
