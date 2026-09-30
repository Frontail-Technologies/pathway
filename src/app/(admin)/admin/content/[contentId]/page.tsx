import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminContentById, getAdminContent } from '@/features/admin/data/admin-content'
import { AdminContentDetailView } from '@/features/admin/components/content/detail/admin-content-detail-view'

type Props = {
  params: Promise<{ contentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { contentId } = await params
  const entry = getAdminContentById(contentId)
  if (!entry) return { title: 'Content Not Found | Pathway Admin' }

  return {
    title: `${entry.title} | Content Details | Pathway Admin`,
    description: `Administrative overview and metadata for editorial piece ${entry.title}.`,
  }
}

export async function generateStaticParams() {
  const content = getAdminContent()
  return content.map((c) => ({
    contentId: c.id,
  }))
}

export default async function AdminContentDetailPage({ params }: Props) {
  const { contentId } = await params
  const entry = getAdminContentById(contentId)

  if (!entry) {
    notFound()
  }

  return <AdminContentDetailView entry={entry} />
}
