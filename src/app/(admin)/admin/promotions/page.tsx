import { type Metadata } from 'next'
import { getAdminPromotions } from '@/features/admin/data/admin-promotions'
import { AdminPromotionsView } from '@/features/admin/components/promotions/directory/admin-promotions-view'

export const metadata: Metadata = {
  title: 'Featured & Sponsored | Admin Console',
  description: 'Manage featured editorial highlights and sponsored entity placements across public discovery surfaces.',
}

export default function AdminPromotionsPage() {
  const promotions = getAdminPromotions()

  return <AdminPromotionsView initialPromotions={promotions} />
}
