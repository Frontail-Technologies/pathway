import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BatchReviewView } from '@/features/admin/components/scraper/batch-review-view'

type Props = { params: Promise<{ batchId: string }> }

export const metadata: Metadata = {
  title: 'Batch review | Pathway Admin',
  description: 'Records staged in one batch.',
}

export default async function Page({ params }: Props) {
  const { batchId } = await params
  return (
    <Suspense>
      <BatchReviewView batchId={batchId} />
    </Suspense>
  )
}
