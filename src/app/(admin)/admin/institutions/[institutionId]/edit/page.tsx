import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminInstitutionById, getAdminInstitutions } from '@/features/admin/data/admin-institutions'
import { AdminInstitutionEditor } from '@/features/admin/components/institutions/admin-institution-editor'

type Props = {
  params: Promise<{ institutionId: string }>
}

export async function generateStaticParams() {
  return getAdminInstitutions().flatMap((institution) =>
    institution.slug === institution.id
      ? [{ institutionId: institution.id }]
      : [{ institutionId: institution.id }, { institutionId: institution.slug }]
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { institutionId } = await params
  const record = getAdminInstitutionById(institutionId)

  return {
    title: record
      ? `Edit ${record.institution.name} | Pathway Admin`
      : 'Institution Not Found | Pathway Admin',
  }
}

export default async function AdminInstitutionEditPage({ params }: Props) {
  const { institutionId } = await params
  const record = getAdminInstitutionById(institutionId)

  if (!record) {
    notFound()
  }

  return <AdminInstitutionEditor institution={record.institution} mode="edit" />
}
