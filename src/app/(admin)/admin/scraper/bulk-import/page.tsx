import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BulkImportView } from '@/features/admin/components/scraper/bulk-import-view'

export const metadata: Metadata = {
  title: 'Upload | Pathway Admin',
  description: 'Upload official files for review.',
}

export default function Page() {
  return (
    <Suspense>
      <BulkImportView />
    </Suspense>
  )
}
