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
  if (!promo) return { title: 'Listing not found | Pathway admin' }

  return {
    title: `Edit ${promo.label || promo.targetName || 'featured listing'} | Pathway admin`,
    description: `Edit the featured listing for ${promo.targetName ?? promo.targetId}.`,
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
