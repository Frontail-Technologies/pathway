import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminSeoRecordById, getAdminSeoRecords } from '@/features/admin/data/admin-seo'
import { AdminSeoEditorView } from '@/features/admin/components/seo/editor/admin-seo-editor-view'

type Props = {
  params: Promise<{ seoId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoId } = await params
  const record = getAdminSeoRecordById(seoId)
  if (!record) return { title: 'Edit SEO Override | Admin' }
  return {
    title: `Edit ${record.targetLabel} — SEO Override | Admin`,
    description: `Edit search engine and social metadata overrides for ${record.targetLabel}.`,
  }
}

export async function generateStaticParams() {
  const records = getAdminSeoRecords()
  return records.map((r) => ({
    seoId: r.id,
  }))
}

export default async function AdminSeoEditPage({ params }: Props) {
  const { seoId } = await params
  const record = getAdminSeoRecordById(seoId)

  if (!record) {
    notFound()
  }

  return <AdminSeoEditorView initialRecord={record} />
}
