import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminSeoRecordById, getAdminSeoRecords } from '@/features/admin/data/admin-seo'
import { AdminSeoDetailView } from '@/features/admin/components/seo/detail/admin-seo-detail-view'

type Props = {
  params: Promise<{ seoId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoId } = await params
  const record = getAdminSeoRecordById(seoId)
  if (!record) return { title: 'SEO Details | Admin' }
  return {
    title: `${record.targetLabel} — SEO Details | Admin`,
    description: `Administrative SEO metadata details and preview for ${record.targetLabel}.`,
  }
}

export async function generateStaticParams() {
  const records = getAdminSeoRecords()
  return records.map((r) => ({
    seoId: r.id,
  }))
}

export default async function AdminSeoDetailPage({ params }: Props) {
  const { seoId } = await params
  const record = getAdminSeoRecordById(seoId)

  if (!record) {
    notFound()
  }

  return <AdminSeoDetailView record={record} />
}
