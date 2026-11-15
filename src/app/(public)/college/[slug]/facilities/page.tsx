import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ScrollToSection } from '@/components/shared/scroll-to-section'
import { findTab, tabSection } from '@/lib/detail-tabs'
import { getCollegeDetail } from '@/features/colleges/api/colleges-api'
import { collegeTabMetadata, collegeTabs } from '@/features/colleges/config/college-tabs'

type Props = { params: Promise<{ slug: string }> }

const SEGMENT = 'facilities'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return collegeTabMetadata(await getCollegeDetail(slug), SEGMENT)
}

export default async function CollegeFacilitiesRoute({ params }: Props) {
  const { slug } = await params
  const college = await getCollegeDetail(slug)
  const tab = college ? findTab(collegeTabs, college, SEGMENT) : undefined
  if (!tab) notFound()
  return <ScrollToSection id={tabSection(tab)} />
}
