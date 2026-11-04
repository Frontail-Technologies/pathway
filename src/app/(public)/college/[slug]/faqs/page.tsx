import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCollegeDetail } from '@/features/colleges/api/colleges-api'
import { collegeTabMetadata } from '@/features/colleges/config/college-tabs'
import { CollegeFaqSection } from '@/features/colleges/components/college-faq-section'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return collegeTabMetadata(await getCollegeDetail(slug), 'faqs')
}

export default async function CollegeFaqsRoute({ params }: Props) {
  const { slug } = await params
  const college = await getCollegeDetail(slug)
  if (!college) notFound()
  return (
    <>
      <CollegeFaqSection college={college} />
    </>
  )
}
