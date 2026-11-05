import { Suspense } from 'react'
import { type Metadata } from 'next'
import { AdminEnquiriesView } from '@/features/admin/components/enquiries/directory/admin-enquiries-view'

export const metadata: Metadata = {
  title: 'Enquiries | Pathway Admin',
  description: 'Student enquiries, brochure requests and call-backs.',
}

export default function AdminEnquiriesPage() {
  return (
    <Suspense>
      <AdminEnquiriesView />
    </Suspense>
  )
}
