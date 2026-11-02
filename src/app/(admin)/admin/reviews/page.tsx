import { type Metadata } from 'next'
import { getAdminReviews } from '@/features/admin/data/admin-reviews'
import { AdminReviewsView } from '@/features/admin/components/reviews/directory/admin-reviews-view'

export const metadata: Metadata = {
  title: 'Reviews | Pathway Admin',
  description: 'Moderate and manage external Google reviews and Pathway student reviews.',
}

export default function AdminReviewsPage() {
  const reviews = getAdminReviews()

  return <AdminReviewsView initialReviews={reviews} />
}
