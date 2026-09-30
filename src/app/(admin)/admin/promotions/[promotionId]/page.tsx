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
  if (!promo) return { title: 'Placement Not Found | Pathway Admin' }

  return {
    title: `${promo.label || `Placement #${promo.id}`} | Placement Details | Pathway Admin`,
    description: `Administrative overview and schedule status for promotion placement #${promo.id}.`,
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
