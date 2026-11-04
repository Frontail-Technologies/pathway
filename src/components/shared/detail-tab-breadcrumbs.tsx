'use client'

import { usePathname } from 'next/navigation'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import type { BreadcrumbItemInput } from '@/components/shared'

type Props = {
  trail: BreadcrumbItemInput[]
  entityLabel: string
  base: string
  tabs: { href: string; label: string }[]
}

export function DetailTabBreadcrumbs({ trail, entityLabel, base, tabs }: Props) {
  const pathname = usePathname()
  const tab = pathname !== base ? tabs.find((t) => t.href === pathname) : undefined
  return <Breadcrumbs items={tab ? [...trail, { label: entityLabel, href: base }, tab.label] : [...trail, entityLabel]} />
}
