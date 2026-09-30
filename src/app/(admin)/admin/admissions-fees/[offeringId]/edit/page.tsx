import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAdminOfferings,
  getAdminOfferingById,
} from '@/features/admin/data/admin-admissions-fees'
import { AdminAdmissionsFeesEditor } from '@/features/admin/components/admissions-fees/editor/admin-admissions-fees-editor'

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
      title: 'Offering Not Found | Pathway Admin',
    }
  }
  return {
    title: `Edit ${record.offering.programName} @ ${record.offering.institutionName} | Admissions & Fees | Pathway Admin`,
    description: `Edit fee schedules, entrance exams, and admission workflows for ${record.offering.programName} at ${record.offering.institutionName}.`,
  }
}

export default async function AdminAdmissionsFeesEditPage({ params }: Props) {
  const { offeringId } = await params
  const record = getAdminOfferingById(offeringId)

  if (!record) {
    notFound()
  }

  return <AdminAdmissionsFeesEditor offering={record.offering} mode="edit" />
}
