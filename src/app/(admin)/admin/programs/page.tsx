import * as React from 'react'
import type { Metadata } from 'next'
import { AdminProgramsView } from '@/features/admin/components/programs/admin-programs-view'

export const metadata: Metadata = {
  title: 'Programs & Courses | Pathway Admin',
  description: 'Manage academic program catalog records, degree taxonomy, and institution relationships.',
}

export default function AdminProgramsPage() {
  return (
    <React.Suspense fallback={<div className="p-6 text-xs text-muted-foreground">Loading programs...</div>}>
      <AdminProgramsView />
    </React.Suspense>
  )
}
