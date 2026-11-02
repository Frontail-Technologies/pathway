import * as React from 'react'
import type { Metadata } from 'next'
import { AdminAdmissionsFeesView } from '@/features/admin/components/admissions-fees/directory/admin-admissions-fees-view'

export const metadata: Metadata = {
  title: 'Admissions & fees | Pathway Admin',
  description: 'Fees and admission rules for each course at each institution.',
}

export default function AdminAdmissionsFeesPage() {
  return (
    <React.Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading admissions and fees…</div>}>
      <AdminAdmissionsFeesView />
    </React.Suspense>
  )
}
