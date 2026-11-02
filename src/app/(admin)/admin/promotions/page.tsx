import { type Metadata } from 'next'
import { getAdminPromotions } from '@/features/admin/data/admin-promotions'
import { AdminPromotionsView } from '@/features/admin/components/promotions/directory/admin-promotions-view'

export const metadata: Metadata = {
  title: 'Featured listings | Pathway admin',
  description: 'Records highlighted on the homepage and list pages.',
}

export default function AdminPromotionsPage() {
  const promotions = getAdminPromotions()

  return <AdminPromotionsView initialPromotions={promotions} />
}
