import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminPromotionById, getAdminPromotions } from '@/features/admin/data/admin-promotions'
import { AdminPromotionEditorView } from '@/features/admin/components/promotions/editor/admin-promotion-editor-view'

type Props = {
  params: Promise<{ promotionId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { promotionId } = await params
  const promo = getAdminPromotionById(promotionId)
  if (!promo) return { title: 'Placement Not Found | Pathway Admin' }

  return {
    title: `Edit Placement #${promo.id} | Pathway Admin`,
    description: `Modify placement parameters and schedule for promotion #${promo.id}.`,
  }
}

export async function generateStaticParams() {
  const promotions = getAdminPromotions()
  return promotions.map((p) => ({
    promotionId: p.id,
  }))
}

export default async function AdminEditPromotionPage({ params }: Props) {
  const { promotionId } = await params
  const promo = getAdminPromotionById(promotionId)

  if (!promo) {
    notFound()
  }

  return <AdminPromotionEditorView promotion={promo} isCreate={false} />
}
