import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminBannerById, getAdminBanners } from '@/features/admin/data/admin-banners'
import { AdminBannerDetailView } from '@/features/admin/components/banners/detail/admin-banner-detail-view'

type Props = {
  params: Promise<{ bannerId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bannerId } = await params
  const banner = getAdminBannerById(bannerId)
  if (!banner) return { title: 'Banner not found | Pathway admin' }

  return {
    title: `${banner.name} | Banners | Pathway admin`,
    description: banner.title,
  }
}

export async function generateStaticParams() {
  const banners = getAdminBanners()
  return banners.map((b) => ({
    bannerId: b.id,
  }))
}

export default async function AdminBannerDetailPage({ params }: Props) {
  const { bannerId } = await params
  const banner = getAdminBannerById(bannerId)

  if (!banner) {
    notFound()
  }

  return <AdminBannerDetailView banner={banner} />
}
