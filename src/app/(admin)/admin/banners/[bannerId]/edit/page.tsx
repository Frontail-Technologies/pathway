import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminBannerById, getAdminBanners } from '@/features/admin/data/admin-banners'
import { AdminBannerEditorView } from '@/features/admin/components/banners/editor/admin-banner-editor-view'

type Props = {
  params: Promise<{ bannerId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bannerId } = await params
  const banner = getAdminBannerById(bannerId)
  if (!banner) return { title: 'Edit Banner | Pathway Admin' }

  return {
    title: `Edit: ${banner.name} | Banners | Pathway Admin`,
    description: `Edit creative assets, copy, call to action, and schedule for banner ${banner.name}.`,
  }
}

export async function generateStaticParams() {
  const banners = getAdminBanners()
  return banners.map((b) => ({
    bannerId: b.id,
  }))
}

export default async function AdminBannerEditPage({ params }: Props) {
  const { bannerId } = await params
  const banner = getAdminBannerById(bannerId)

  if (!banner) {
    notFound()
  }

  return <AdminBannerEditorView initialBanner={banner} />
}
