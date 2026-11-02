import { type Metadata } from 'next'
import { getAdminEnquiries } from '@/features/admin/data/admin-enquiries'
import { AdminEnquiriesView } from '@/features/admin/components/enquiries/directory/admin-enquiries-view'

export const metadata: Metadata = {
  title: 'Enquiries | Pathway Admin',
  description: 'Student enquiries, brochure requests and call-backs.',
}

export default function AdminEnquiriesPage() {
  const enquiries = getAdminEnquiries()

  return <AdminEnquiriesView initialEnquiries={enquiries} />
}
