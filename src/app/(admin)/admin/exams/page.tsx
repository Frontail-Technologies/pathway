import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AdminExamsView } from '@/features/admin/components/exams/admin-exams-view'

export const metadata: Metadata = {
  title: 'Exams | Pathway Admin',
  description: 'Entrance exam listings and their public pages.',
}

export default function AdminExamsPage() {
  return (
    <Suspense>
      <AdminExamsView />
    </Suspense>
  )
}
