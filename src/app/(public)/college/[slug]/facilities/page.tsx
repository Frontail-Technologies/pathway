import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollegeDetail } from '@/features/colleges/data/college-detail'
import { collegeTabMetadata } from '@/features/colleges/config/college-tabs'
import { CollegeFacilitiesSection } from '@/features/colleges/components/college-facilities-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return collegeTabMetadata(getCollegeDetail(slug), 'facilities')
}

export default async function CollegeFacilitiesRoute({ params }: Props) {
  const { slug } = await params
  const college = getCollegeDetail(slug)
  if (!college) notFound()
  return (
    <>
      <CollegeFacilitiesSection college={college} />
    </>
  )
}
