import { type Metadata } from 'next'
import { getAdminBanners } from '@/features/admin/data/admin-banners'
import { AdminBannersView } from '@/features/admin/components/banners/directory/admin-banners-view'

export const metadata: Metadata = {
  title: 'Banners | Admin Console',
  description: 'Manage standalone promotional, admissions, counselling, and informational banners.',
}

export default function AdminBannersPage() {
  const banners = getAdminBanners()

  return <AdminBannersView initialBanners={banners} />
}
