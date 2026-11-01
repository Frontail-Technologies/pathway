import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollegeDetail } from '@/features/colleges/data/college-detail'
import { collegeTabMetadata } from '@/features/colleges/config/college-tabs'
import { CollegeReviewsSection } from '@/features/colleges/components/college-reviews-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return collegeTabMetadata(getCollegeDetail(slug), 'reviews')
}

export default async function CollegeReviewsRoute({ params }: Props) {
  const { slug } = await params
  const college = getCollegeDetail(slug)
  if (!college) notFound()
  return (
    <>
      <CollegeReviewsSection college={college} />
    </>
  )
}
