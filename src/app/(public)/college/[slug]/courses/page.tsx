import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollegeDetail } from '@/features/colleges/api/colleges-api'
import { collegeTabMetadata } from '@/features/colleges/config/college-tabs'
import { CollegeCoursesSection } from '@/features/colleges/components/college-courses-section'
import { CollegeFeesSection } from '@/features/colleges/components/college-fees-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return collegeTabMetadata(await getCollegeDetail(slug), 'courses')
}

export default async function CollegeCoursesRoute({ params }: Props) {
  const { slug } = await params
  const college = await getCollegeDetail(slug)
  if (!college) notFound()
  return (
    <>
      <CollegeCoursesSection college={college} />
      <CollegeFeesSection college={college} />
    </>
  )
}
