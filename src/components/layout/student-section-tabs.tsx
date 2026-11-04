'use client'

import { DetailTabNav } from '@/components/shared/detail-tab-nav'
import { studentNavigation } from '@/config/navigation'

const tabs = studentNavigation.filter((item) => item.available && item.href.startsWith('/student')).map(({ href, label }) => ({ href, label }))

export function StudentSectionTabs() {
  return <DetailTabNav items={tabs} label="Student sections" className="lg:hidden" />
}
