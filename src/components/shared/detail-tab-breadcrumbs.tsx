'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import type { BreadcrumbItemInput } from '@/components/shared'

type Props = {
  /** Crumbs before the entity, e.g. ['Home', { label: 'Colleges', href: '/colleges' }]. */
  trail: BreadcrumbItemInput[]
  entityLabel: string
  base: string
  tabs: { href: string; label: string }[]
}

/** Breadcrumbs inside a shared detail layout: appends the active tab, read from the URL. */
export function DetailTabBreadcrumbs({ trail, entityLabel, base, tabs }: Props) {
  const pathname = usePathname()
  const tab = pathname !== base ? tabs.find((t) => t.href === pathname) : undefined
  return <Breadcrumbs items={tab ? [...trail, { label: entityLabel, href: base }, tab.label] : [...trail, entityLabel]} />
}
