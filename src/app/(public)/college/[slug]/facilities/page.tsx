import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollegeDetail } from '@/features/colleges/api/colleges-api'
import { collegeTabMetadata } from '@/features/colleges/config/college-tabs'
import { CollegeFacilitiesSection } from '@/features/colleges/components/college-facilities-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return collegeTabMetadata(await getCollegeDetail(slug), 'facilities')
}

export default async function CollegeFacilitiesRoute({ params }: Props) {
  const { slug } = await params
  const college = await getCollegeDetail(slug)
  if (!college) notFound()
  return (
    <>
      <CollegeFacilitiesSection college={college} />
    </>
  )
}
