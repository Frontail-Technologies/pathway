import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollegeDetail } from '@/features/colleges/api/colleges-api'
import { collegeTabMetadata } from '@/features/colleges/config/college-tabs'
import { CollegeScholarshipsSection } from '@/features/colleges/components/college-scholarships-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return collegeTabMetadata(await getCollegeDetail(slug), 'scholarships')
}

export default async function CollegeScholarshipsRoute({ params }: Props) {
  const { slug } = await params
  const college = await getCollegeDetail(slug)
  if (!college) notFound()
  return (
    <>
      <CollegeScholarshipsSection college={college} />
    </>
  )
}
