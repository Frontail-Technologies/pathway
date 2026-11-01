'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import type { CollegeDetailData } from '../data/college-detail'
import { collegeTabHref, collegeTabs } from '../config/college-tabs'

/** Lives in the shared layout, so it reads the active tab from the URL. */
export function CollegeBreadcrumbs({ college }: { college: CollegeDetailData }) {
  const pathname = usePathname()
  const tab = collegeTabs.find((t) => t.segment && collegeTabHref(college.slug, t.segment) === pathname)
  const base = ['Home', { label: 'Colleges', href: '/colleges' }] as const
  return <Breadcrumbs items={tab ? [...base, { label: college.name, href: collegeTabHref(college.slug, '') }, tab.label] : [...base, college.name]} />
}
