import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SourceDetailView } from '@/features/admin/components/scraper/source-detail-view'

type Props = { params: Promise<{ sourceId: string }> }

export const metadata: Metadata = {
  title: 'Source | Pathway Admin',
  description: 'Source health, runs and batches.',
}

export default async function Page({ params }: Props) {
  const { sourceId } = await params
  return (
    <Suspense>
      <SourceDetailView sourceId={sourceId} />
    </Suspense>
  )
}
