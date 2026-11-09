'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { adminRouteKindLabel, matchAdminRoute } from '@/features/admin/navigation/modules'

export function AdminCrumbs() {
  const pathname = usePathname()
  const search = useSearchParams().toString()
  const match = matchAdminRoute(pathname, search)
  if (!match || match.module.id === 'dashboard') return null
  const trail: { label: string; href?: string }[] = [{ label: 'Admin', href: '/admin' }]
  if (match.kind === 'index' && !match.child) trail.push({ label: match.module.label })
  else {
    trail.push({ label: match.module.label, href: match.module.href })
    if (match.child) trail.push({ label: match.child.label })
    if (match.kind !== 'index') trail.push({ label: adminRouteKindLabel[match.kind] })
  }
  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex min-w-0 items-center gap-1 text-[13px]">
      {trail.map((crumb, index) => {
        const last = index === trail.length - 1
        return (
          <span key={`${crumb.label}-${index}`} className="flex min-w-0 items-center gap-1">
            {index > 0 ? <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" /> : null}
            {crumb.href && !last ? (
              <Link href={crumb.href} className="truncate text-muted-foreground outline-none hover:text-foreground focus-visible:underline">
                {crumb.label}
              </Link>
            ) : (
              <span className="truncate font-medium text-foreground" aria-current={last ? 'page' : undefined}>
                {crumb.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
