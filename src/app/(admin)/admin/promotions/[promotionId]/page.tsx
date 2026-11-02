import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminPromotionById, getAdminPromotions } from '@/features/admin/data/admin-promotions'
import { AdminPromotionDetailView } from '@/features/admin/components/promotions/detail/admin-promotion-detail-view'

type Props = {
  params: Promise<{ promotionId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { promotionId } = await params
  const promo = getAdminPromotionById(promotionId)
  if (!promo) return { title: 'Listing not found | Pathway admin' }

  return {
    title: `${promo.label || promo.targetName || 'Featured listing'} | Featured listings | Pathway admin`,
    description: `${promo.kind === 'sponsored' ? 'Sponsored' : 'Featured'} listing for ${promo.targetName ?? promo.targetId}.`,
  }
}

export async function generateStaticParams() {
  const promotions = getAdminPromotions()
  return promotions.map((p) => ({
    promotionId: p.id,
  }))
}

export default async function AdminPromotionDetailPage({ params }: Props) {
  const { promotionId } = await params
  const promo = getAdminPromotionById(promotionId)

  if (!promo) {
    notFound()
  }

  return <AdminPromotionDetailView promotion={promo} />
}
