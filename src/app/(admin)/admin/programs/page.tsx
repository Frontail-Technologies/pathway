import * as React from 'react'
import type { Metadata } from 'next'
import { AdminProgramsView } from '@/features/admin/components/programs/admin-programs-view'

export const metadata: Metadata = {
  title: 'Courses | Pathway Admin',
  description: 'Courses in the catalogue and the institutions that offer them.',
}

export default function AdminProgramsPage() {
  return (
    <React.Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading courses…</div>}>
      <AdminProgramsView />
    </React.Suspense>
  )
}
