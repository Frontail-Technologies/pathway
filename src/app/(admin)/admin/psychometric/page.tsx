import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AdminPsychometricView } from '@/features/admin/components/psychometric/admin-psychometric-view'

export const metadata: Metadata = { title: 'Psychometric test | Pathway Admin' }

export default function AdminPsychometricPage() {
  return (
    <Suspense>
      <AdminPsychometricView />
    </Suspense>
  )
}
