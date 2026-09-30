import { type Metadata } from 'next'
import { getAdminEnquiries } from '@/features/admin/data/admin-enquiries'
import { AdminEnquiriesView } from '@/features/admin/components/enquiries/directory/admin-enquiries-view'

export const metadata: Metadata = {
  title: 'Enquiries & Leads | Admin Console',
  description: 'Manage incoming student enquiries, academic counselling requests, and lead pipeline.',
}

export default function AdminEnquiriesPage() {
  const enquiries = getAdminEnquiries()

  return <AdminEnquiriesView initialEnquiries={enquiries} />
}
