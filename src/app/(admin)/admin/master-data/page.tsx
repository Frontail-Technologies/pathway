import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AdminMasterDataView } from '@/features/admin/components/master-data/admin-master-data-view'

export const metadata: Metadata = {
  title: 'Master data | Pathway Admin',
  description: 'Taxonomy terms, aliases, states and cities.',
}

export default function AdminMasterDataPage() {
  return (
    <Suspense>
      <AdminMasterDataView />
    </Suspense>
  )
}
