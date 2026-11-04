import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { getCollegeDetail } from '@/features/colleges/api/colleges-api'
import { CollegeDetailShell } from '@/features/colleges/components/college-detail-shell'

export default async function CollegeLayout({ children, params }: { children: ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const college = await getCollegeDetail(slug)
  if (!college) notFound()
  return <CollegeDetailShell college={college}>{children}</CollegeDetailShell>
}
