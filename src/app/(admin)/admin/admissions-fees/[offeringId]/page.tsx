import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAdminOfferings,
  getAdminOfferingById,
} from '@/features/admin/data/admin-admissions-fees'
import { AdminAdmissionsFeesDetailView } from '@/features/admin/components/admissions-fees/detail/admin-admissions-fees-detail-view'

type Props = {
  params: Promise<{ offeringId: string }>
}

export async function generateStaticParams() {
  const offerings = getAdminOfferings()
  const params: { offeringId: string }[] = []
  for (const off of offerings) {
    params.push({ offeringId: off.id })
    if (off.slug !== off.id) {
      params.push({ offeringId: off.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { offeringId } = await params
  const record = getAdminOfferingById(offeringId)
  if (!record) {
    return {
      title: 'Offering not found | Pathway Admin',
    }
  }
  return {
    title: `${record.offering.programName} at ${record.offering.institutionName} | Admissions & fees | Pathway Admin`,
    description: `Admission rules and fees for ${record.offering.programName} at ${record.offering.institutionName}.`,
  }
}

export default async function AdminAdmissionsFeesDetailPage({ params }: Props) {
  const { offeringId } = await params
  const record = getAdminOfferingById(offeringId)

  if (!record) {
    notFound()
  }

  return <AdminAdmissionsFeesDetailView data={record} />
}
