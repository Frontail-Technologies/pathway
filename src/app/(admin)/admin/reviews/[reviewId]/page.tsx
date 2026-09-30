import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAdminReviewById, getAdminReviews } from '@/features/admin/data/admin-reviews'
import { AdminReviewDetailView } from '@/features/admin/components/reviews/detail/admin-review-detail-view'

type Props = {
  params: Promise<{ reviewId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { reviewId } = await params
  const review = getAdminReviewById(reviewId)
  if (!review) return { title: 'Review Not Found | Pathway Admin' }

  return {
    title: `${review.title || `Review #${review.id}`} | Review Details | Pathway Admin`,
    description: `Administrative moderation and detail overview for review #${review.id}.`,
  }
}

export async function generateStaticParams() {
  const reviews = getAdminReviews()
  return reviews.map((r) => ({
    reviewId: r.id,
  }))
}

export default async function AdminReviewDetailPage({ params }: Props) {
  const { reviewId } = await params
  const review = getAdminReviewById(reviewId)

  if (!review) {
    notFound()
  }

  return <AdminReviewDetailView review={review} />
}
