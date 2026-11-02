import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminContentById, getAdminContent } from '@/features/admin/data/admin-content'
import { AdminContentEditorView } from '@/features/admin/components/content/editor/admin-content-editor-view'

type Props = {
  params: Promise<{ contentId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { contentId } = await params
  const entry = getAdminContentById(contentId)
  if (!entry) return { title: 'Edit article | Pathway admin' }

  return {
    title: `Edit ${entry.title} | Articles | Pathway admin`,
    description: `Edit ${entry.title}.`,
  }
}

export async function generateStaticParams() {
  const content = getAdminContent()
  return content.map((c) => ({
    contentId: c.id,
  }))
}

export default async function AdminContentEditPage({ params }: Props) {
  const { contentId } = await params
  const entry = getAdminContentById(contentId)

  if (!entry) {
    notFound()
  }

  return <AdminContentEditorView initialEntry={entry} />
}
