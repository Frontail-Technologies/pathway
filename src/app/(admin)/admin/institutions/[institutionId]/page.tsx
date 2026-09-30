import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminInstitutions, getAdminInstitutionById } from '@/features/admin/data/admin-institutions'
import { AdminInstitutionDetailView } from '@/features/admin/components/institutions/admin-institution-detail-view'

type Props = {
  params: Promise<{ institutionId: string }>
}

export async function generateStaticParams() {
  const institutions = getAdminInstitutions()
  const params: { institutionId: string }[] = []
  for (const inst of institutions) {
    params.push({ institutionId: inst.id })
    if (inst.slug !== inst.id) {
      params.push({ institutionId: inst.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { institutionId } = await params
  const record = getAdminInstitutionById(institutionId)
  if (!record) {
    return {
      title: 'Institution Not Found | Pathway Admin',
    }
  }
  return {
    title: `${record.institution.name} | Institution Details | Pathway Admin`,
    description: `Administrative view and content completeness for ${record.institution.name}.`,
  }
}

export default async function AdminInstitutionDetailPage({ params }: Props) {
  const { institutionId } = await params
  const record = getAdminInstitutionById(institutionId)

  if (!record) {
    notFound()
  }

  return <AdminInstitutionDetailView data={record} />
}
