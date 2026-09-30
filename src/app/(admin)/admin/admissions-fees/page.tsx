import * as React from 'react'
import type { Metadata } from 'next'
import { AdminAdmissionsFeesView } from '@/features/admin/components/admissions-fees/directory/admin-admissions-fees-view'

export const metadata: Metadata = {
  title: 'Admissions & Fees | Pathway Admin',
  description: 'Manage institution-specific program fee schedules, entrance exams, and admission workflows.',
}

export default function AdminAdmissionsFeesPage() {
  return (
    <React.Suspense fallback={<div className="p-6 text-xs text-muted-foreground">Loading admissions & fees...</div>}>
      <AdminAdmissionsFeesView />
    </React.Suspense>
  )
}
