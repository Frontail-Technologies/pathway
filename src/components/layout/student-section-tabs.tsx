'use client'

import { DetailTabNav } from '@/components/shared/detail-tab-nav'
import { studentNavigation } from '@/config/navigation'

// Pages inside the student space; Resume Builder lives outside it and stays in the menu.
const tabs = studentNavigation.filter((item) => item.available && item.href.startsWith('/student')).map(({ href, label }) => ({ href, label }))

/**
 * Sticky section tabs for phones and tablets. In the app (where the native
 * top bar replaces the student header and its menu) this is the only way to
 * move between student pages, so it shows in both web and app-shell mode.
 */
export function StudentSectionTabs() {
  return <DetailTabNav items={tabs} label="Student sections" className="lg:hidden" />
}
