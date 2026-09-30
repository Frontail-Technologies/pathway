import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminEnquiryById, getAdminEnquiries } from '@/features/admin/data/admin-enquiries'
import { AdminEnquiryDetailView } from '@/features/admin/components/enquiries/detail/admin-enquiry-detail-view'

type Props = {
  params: Promise<{ enquiryId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { enquiryId } = await params
  const enquiry = getAdminEnquiryById(enquiryId)
  if (!enquiry) return { title: 'Enquiry Not Found | Pathway Admin' }

  return {
    title: `${enquiry.subject || `Enquiry #${enquiry.id}`} | Enquiry Details | Pathway Admin`,
    description: `Administrative overview and follow-up history for enquiry #${enquiry.id}.`,
  }
}

export async function generateStaticParams() {
  const enquiries = getAdminEnquiries()
  return enquiries.map((e) => ({
    enquiryId: e.id,
  }))
}

export default async function AdminEnquiryDetailPage({ params }: Props) {
  const { enquiryId } = await params
  const enquiry = getAdminEnquiryById(enquiryId)

  if (!enquiry) {
    notFound()
  }

  return <AdminEnquiryDetailView enquiry={enquiry} />
}
