'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, ExternalLink, LogOut } from 'lucide-react'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { useAdminBadges } from '@/features/admin/hooks/use-admin-badges'
import { adminModuleGroups, adminModules, matchAdminRoute, type AdminModule } from '@/features/admin/navigation/modules'
import { cn } from '@/lib/utils'
import { AdminBrand } from './admin-brand'

const row = 'relative flex h-11 items-center gap-3 rounded-lg px-3 text-[14px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/60'

function CountBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-semibold text-primary tabular-nums" aria-label={`${count} new`}>
      {count > 99 ? '99+' : count}
    </span>
  )
}

function NavRow({ module, active, badge, onNavigate, className }: { module: AdminModule; active: boolean; badge?: number; onNavigate?: () => void; className?: string }) {
  const Icon = module.icon
  return (
    <Link
      href={module.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(row, active ? 'bg-admin-sidebar-active font-semibold text-admin-sidebar-active-foreground' : 'text-admin-sidebar-foreground hover:bg-admin-sidebar-hover hover:text-white', className)}
    >
      <Icon className="size-5 shrink-0" strokeWidth={active ? 2.1 : 1.8} aria-hidden="true" />
      <span className="flex-1 truncate">{module.label}</span>
      {badge ? <CountBadge count={badge} /> : null}
    </Link>
  )
}

function SoonRow({ module }: { module: AdminModule }) {
  const Icon = module.icon
  return (
    <Link href={module.href} aria-disabled className={cn(row, 'text-admin-sidebar-muted hover:bg-admin-sidebar-hover')}>
      <Icon className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
      <span className="flex-1 truncate">{module.label}</span>
      <span className="text-[11px] font-medium uppercase tracking-wide text-admin-sidebar-muted">Soon</span>
    </Link>
  )
}

function NavBranch({ module, active, badge, pathname, search, onNavigate }: { module: AdminModule; active: boolean; badge?: number; pathname: string; search: string; onNavigate?: () => void }) {
  const [expanded, setExpanded] = useState<boolean | null>(null)
  const [wasActive, setWasActive] = useState(active)
  if (active !== wasActive) {
    setWasActive(active)
    setExpanded(null)
  }
  const open = expanded ?? active
  const children = module.children ?? []
  return (
    <div className="flex flex-col gap-0.5">
      <div className="relative">
        <NavRow module={module} active={active} badge={badge} onNavigate={onNavigate} className="pr-10" />
        <button
          type="button"
          aria-label={`${open ? 'Collapse' : 'Expand'} ${module.label}`}
          aria-expanded={open}
          onClick={() => setExpanded(!open)}
          className="absolute top-1.5 right-1 flex size-8 items-center justify-center rounded-md text-admin-sidebar-muted outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <ChevronDown className={cn('size-4 transition-transform duration-200 motion-reduce:transition-none', open && 'rotate-180')} aria-hidden="true" />
        </button>
      </div>
      <div inert={!open} className={cn('grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none', open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
        <div className="ml-8 flex min-h-0 flex-col gap-0.5 overflow-hidden">
          {children.map((child) => {
            const current = active && child.match(pathname, search)
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onNavigate}
                aria-current={current ? 'page' : undefined}
                className={cn('flex h-9 items-center rounded-md px-2.5 text-[13px] outline-none focus-visible:ring-2 focus-visible:ring-white/60', current ? 'bg-admin-sidebar-active font-semibold text-admin-sidebar-active-foreground' : 'text-admin-sidebar-muted hover:text-white')}
              >
                {child.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function AdminSidebar({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname()
  const search = useSearchParams().toString()
  const router = useRouter()
  const { signOut } = useAdminSession()
  const badges = useAdminBadges()
  const activeId = matchAdminRoute(pathname, search)?.module.id

  return (
    <aside className={cn('flex h-full flex-col bg-admin-sidebar text-admin-sidebar-foreground', className)} aria-label="Admin">
      <div className="flex h-16 shrink-0 items-center px-5">
        <AdminBrand onClick={onNavigate} tone="inverse" />
      </div>

      <nav aria-label="Admin sections" className="flex flex-1 flex-col gap-5 overflow-y-auto px-3 pb-4">
        {adminModuleGroups.map((group) => {
          const modules = adminModules.filter((module) => module.group === group.id)
          if (!modules.length) return null
          return (
            <div key={group.id} className="flex flex-col gap-0.5">
              {group.id !== 'overview' ? <p className="px-3 pt-1 pb-1.5 text-[11px] font-medium tracking-[0.6px] text-admin-sidebar-muted uppercase">{group.label}</p> : null}
              {modules.map((module) => {
                const active = module.id === activeId
                const badge = module.badge ? badges[module.badge] : undefined
                if (module.status === 'soon') return <SoonRow key={module.id} module={module} />
                if (module.children) return <NavBranch key={module.id} module={module} active={active} badge={badge} pathname={pathname} search={search} onNavigate={onNavigate} />
                return <NavRow key={module.id} module={module} active={active} badge={badge} onNavigate={onNavigate} />
              })}
            </div>
          )
        })}
      </nav>

      <div className="flex shrink-0 flex-col gap-0.5 border-t border-admin-sidebar-border px-3 py-3">
        <Link href="/" target="_blank" onClick={onNavigate} className={cn(row, 'text-admin-sidebar-foreground hover:bg-admin-sidebar-hover hover:text-white')}>
          <ExternalLink className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
          <span className="flex-1 truncate">View public site</span>
        </Link>
        <button
          type="button"
          onClick={() => {
            signOut()
            router.replace('/admin/login')
          }}
          className={cn(row, 'text-left text-[#fecaca] hover:bg-admin-sidebar-hover hover:text-white')}
        >
          <LogOut className="size-5 shrink-0" strokeWidth={1.8} aria-hidden="true" />
          <span className="flex-1 truncate">Sign out</span>
        </button>
      </div>
    </aside>
  )
}
