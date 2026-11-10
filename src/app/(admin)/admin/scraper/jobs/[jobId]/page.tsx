import type { Metadata } from 'next'
import { Suspense } from 'react'
import { JobDetailView } from '@/features/admin/components/scraper/job-detail-view'

type Props = { params: Promise<{ jobId: string }> }

export const metadata: Metadata = {
  title: 'Run | Pathway Admin',
  description: 'Run result and log.',
}

export default async function Page({ params }: Props) {
  const { jobId } = await params
  return (
    <Suspense>
      <JobDetailView jobId={jobId} />
    </Suspense>
  )
}
