'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, ExternalLink, GraduationCap } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { findAdminNavItem } from '@/features/admin/data/admin-stats'
import { AdminMobileNav } from './admin-mobile-nav'
import { AdminQuickSearch } from './admin-quick-search'

const kindLabel = { new: 'New', edit: 'Edit', detail: 'Details' } as const

/** Breadcrumb derived from the nav config, so new pages never need a hand-written title map. */
function Breadcrumb() {
  const pathname = usePathname()
  const match = findAdminNavItem(pathname)
  if (!match || match.item.id === 'dashboard') return <span className="text-sm font-medium text-foreground">Dashboard</span>
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 text-sm">
      {match.kind === 'index' ? (
        <span className="truncate font-medium text-foreground" aria-current="page">
          {match.item.label}
        </span>
      ) : (
        <>
          <Link href={match.item.href} className="truncate text-muted-foreground outline-none hover:text-foreground focus-visible:underline">
            {match.item.label}
          </Link>
          <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="truncate font-medium text-foreground" aria-current="page">
            {kindLabel[match.kind]}
          </span>
        </>
      )}
    </nav>
  )
}

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 sm:px-6">
      <AdminMobileNav />
      <div className="min-w-0 flex-1 lg:flex-none lg:basis-60">
        <Breadcrumb />
      </div>
      <div className="hidden flex-1 justify-center md:flex">
        <AdminQuickSearch />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<button type="button" className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Account menu" />}
        >
          <Avatar size="sm">
            <AvatarFallback className="bg-muted text-xs font-semibold text-foreground">DA</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuLabel className="font-normal">
            <span className="block text-sm font-medium text-foreground">Demo administrator</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">Sample data · not connected to a server</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href="/" target="_blank" />}>
            <ExternalLink className="size-4" aria-hidden="true" />
            View public site
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/student" />}>
            <GraduationCap className="size-4" aria-hidden="true" />
            Student space
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
