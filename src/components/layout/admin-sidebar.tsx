'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Banknote,
  Award,
  Users,
  UserCheck,
  Inbox,
  MessageSquare,
  Sparkles,
  FileText,
  Image,
  BookMarked,
  SearchCode,
  BarChart3,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react'
import { adminNavigationGroups } from '@/features/admin/data/admin-stats'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Banknote,
  Award,
  Users,
  UserCheck,
  Inbox,
  MessageSquare,
  Sparkles,
  FileText,
  Image,
  BookMarked,
  SearchCode,
  BarChart3,
}

export function AdminSidebar({
  onItemClick,
  className,
}: {
  onItemClick?: () => void
  className?: string
}) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'flex flex-col h-full bg-admin-sidebar text-admin-sidebar-foreground select-none',
        className
      )}
      aria-label="Admin Navigation"
    >
      <div className="h-16 px-6 flex items-center justify-between border-b border-admin-sidebar-border shrink-0">
        <Link
          href="/admin"
          onClick={onItemClick}
          className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
          aria-label="Pathway Admin home"
        >
          <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
            Pathway
          </span>
          <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
            Admin
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        {adminNavigationGroups.map((group) => (
          <div key={group.id} className="space-y-1">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-admin-sidebar-muted mb-1.5">
              {group.title}
            </p>
            <nav className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = iconMap[item.icon] || LayoutDashboard
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`))

                if (!item.available) {
                  return (
                    <div
                      key={item.id}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground/60 cursor-not-allowed select-none"
                      title={`${item.label} (${item.badge || 'Coming Soon'})`}
                      aria-disabled="true"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className="w-4 h-4 shrink-0 text-muted-foreground/60" />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-semibold bg-muted text-muted-foreground px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={onItemClick}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      isActive
                        ? 'bg-admin-sidebar-active text-primary font-semibold'
                        : 'text-admin-sidebar-foreground hover:text-foreground hover:bg-admin-sidebar-hover'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={cn(
                          'w-4 h-4 shrink-0',
                          isActive ? 'text-primary' : 'text-admin-sidebar-muted'
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-admin-sidebar-border shrink-0">
        <Link
          href="/"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-admin-sidebar-foreground hover:text-foreground hover:bg-admin-sidebar-hover transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span>View Public Portal</span>
          <ExternalLink className="w-3.5 h-3.5 text-admin-sidebar-muted" />
        </Link>
      </div>
    </aside>
  )
}
