import { Suspense } from 'react'
import type { Metadata } from 'next'
import { AdminTutorAccountsView } from '@/features/admin/components/tutor-accounts/directory/admin-tutor-accounts-view'

export const metadata: Metadata = {
  title: 'Tutor reviews | Pathway Admin',
  description: 'Review tutor profiles submitted from Tutor Space.',
}

export default function AdminTutorAccountsPage() {
  return (
    <Suspense>
      <AdminTutorAccountsView />
    </Suspense>
  )
}
