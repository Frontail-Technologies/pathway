import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getCollegeDetail, getCollegeDetailSlugs } from '@/features/colleges/data/college-detail'
import { CollegeDetailShell } from '@/features/colleges/components/college-detail-shell'

// Params generated here cover every sub-page under /college/[slug]/*.
export function generateStaticParams() {
  return getCollegeDetailSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false

export default async function CollegeLayout({ children, params }: { children: ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const college = getCollegeDetail(slug)
  if (!college) notFound()
  return <CollegeDetailShell college={college}>{children}</CollegeDetailShell>
}
