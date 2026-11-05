import type { Metadata } from 'next'
import { AdminEnquiryDetailView } from '@/features/admin/components/enquiries/detail/admin-enquiry-detail-view'

type Props = {
  params: Promise<{ enquiryId: string }>
}

export const metadata: Metadata = {
  title: 'Enquiry | Pathway Admin',
  description: 'Contact details, status and follow-up history for a student enquiry.',
}

export default async function AdminEnquiryDetailPage({ params }: Props) {
  const { enquiryId } = await params
  return <AdminEnquiryDetailView enquiryId={enquiryId} />
}
