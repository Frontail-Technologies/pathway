import { type Metadata } from 'next'
import { getAdminBanners } from '@/features/admin/data/admin-banners'
import { AdminBannersView } from '@/features/admin/components/banners/directory/admin-banners-view'

export const metadata: Metadata = {
  title: 'Banners | Pathway admin',
  description: 'Promotional strips shown on the homepage and study abroad page.',
}

export default function AdminBannersPage() {
  const banners = getAdminBanners()

  return <AdminBannersView initialBanners={banners} />
}
