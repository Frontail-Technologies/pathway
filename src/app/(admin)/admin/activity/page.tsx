import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AdminActivityView } from '@/features/admin/components/activity/admin-activity-view'

export const metadata: Metadata = {
  title: 'Activity log | Pathway Admin',
  description: 'Changes made in the admin.',
}

export default function AdminActivityPage() {
  return (
    <Suspense>
      <AdminActivityView />
    </Suspense>
  )
}
