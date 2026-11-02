'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Award,
  Banknote,
  BarChart3,
  BookMarked,
  BookOpen,
  ClipboardList,
  Compass,
  ExternalLink,
  FileText,
  GraduationCap,
  History,
  Image,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  SearchCode,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { adminNavigationGroups, findAdminNavItem } from '@/features/admin/data/admin-stats'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  Award,
  Banknote,
  BarChart3,
  BookMarked,
  BookOpen,
  ClipboardList,
  Compass,
  FileText,
  GraduationCap,
  History,
  Image,
  Inbox,
  LayoutDashboard,
  MessageSquare,
  SearchCode,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
}

export function AdminSidebar({ onItemClick, className }: { onItemClick?: () => void; className?: string }) {
  const pathname = usePathname()
  const activeId = findAdminNavItem(pathname)?.item.id

  return (
    <aside className={cn('flex h-full flex-col bg-admin-sidebar text-admin-sidebar-foreground', className)} aria-label="Admin">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-admin-sidebar-border px-5">
        <Link href="/admin" onClick={onItemClick} className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Pathway admin home">
          <span className="font-heading text-lg font-extrabold tracking-tight text-foreground">Pathway</span>
          <span className="text-sm font-medium text-muted-foreground">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {adminNavigationGroups.map((group) => (
          <div key={group.id}>
            {group.id !== 'overview' ? <p className="mb-1 px-2.5 text-xs font-medium text-admin-sidebar-muted">{group.title}</p> : null}
            <ul className="space-y-px">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] ?? LayoutDashboard
                const active = item.id === activeId
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={onItemClick}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
                        active ? 'bg-admin-sidebar-active font-medium text-primary' : 'text-admin-sidebar-foreground hover:bg-admin-sidebar-hover hover:text-foreground',
                      )}
                    >
                      <Icon className={cn('size-4 shrink-0', active ? 'text-primary' : 'text-admin-sidebar-muted')} aria-hidden="true" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-admin-sidebar-border p-3">
        <Link href="/" target="_blank" className="flex h-8 items-center gap-2.5 rounded-md px-2.5 text-sm text-admin-sidebar-foreground outline-none hover:bg-admin-sidebar-hover focus-visible:ring-2 focus-visible:ring-ring">
          <ExternalLink className="size-4 text-admin-sidebar-muted" aria-hidden="true" />
          View public site
        </Link>
      </div>
    </aside>
  )
}
