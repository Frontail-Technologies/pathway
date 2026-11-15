import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { findTab } from '@/lib/detail-tabs'
import { getCollegeDetail } from '@/features/colleges/api/colleges-api'
import { collegeTabMetadata, collegeTabs } from '@/features/colleges/config/college-tabs'

type Props = { params: Promise<{ slug: string }> }

const SEGMENT = ''

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return collegeTabMetadata(await getCollegeDetail(slug), SEGMENT)
}

export default async function CollegeOverviewRoute({ params }: Props) {
  const { slug } = await params
  const college = await getCollegeDetail(slug)
  const tab = college ? findTab(collegeTabs, college, SEGMENT) : undefined
  if (!tab) notFound()
  return null
}
