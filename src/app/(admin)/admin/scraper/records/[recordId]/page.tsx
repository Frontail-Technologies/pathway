import type { Metadata } from 'next'
import { Suspense } from 'react'
import { RecordDetailView } from '@/features/admin/components/scraper/record-detail-view'

type Props = { params: Promise<{ recordId: string }> }

export const metadata: Metadata = {
  title: 'Staged record | Pathway Admin',
  description: 'Field-by-field review of one imported record.',
}

export default async function Page({ params }: Props) {
  const { recordId } = await params
  return (
    <Suspense>
      <RecordDetailView recordId={recordId} />
    </Suspense>
  )
}
