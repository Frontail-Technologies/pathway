'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, ChevronDown, ExternalLink, GraduationCap, LogOut, Moon, PanelLeft, Plus, Rows3, Sun } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { useAdminBadges } from '@/features/admin/hooks/use-admin-badges'
import { adminQuickAdd } from '@/features/admin/navigation/modules'
import { useAdminShell } from '@/features/admin/state/admin-shell-store'
import { cn } from '@/lib/utils'
import { AdminBrand } from './admin-brand'
import { AdminQuickSearch } from './admin-quick-search'

const roleLabel = { staff: 'Staff', admin: 'Administrator' } as const

function QuickAdd() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button size="default" className="h-9 gap-1.5 px-3" aria-label="Quick add" />}>
        <Plus className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">Quick add</span>
        <ChevronDown className="size-3.5 opacity-80" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {adminQuickAdd.map((item) => {
          const Icon = item.icon
          return (
            <DropdownMenuItem key={item.id} render={<Link href={item.href} />}>
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function NotificationBell() {
  const badges = useAdminBadges()
  const total = badges.enquiries + badges.tutorReviews
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="relative size-9" aria-label={total ? `${total} items need attention` : 'Notifications'} />}>
        <Bell className="size-[18px]" aria-hidden="true" />
        {total ? <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cta px-1 text-[10px] font-semibold text-white tabular-nums">{total > 9 ? '9+' : total}</span> : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Needs attention</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem render={<Link href="/admin/enquiries?status=new" />}>
          <span className="flex-1">New enquiries</span>
          <span className="text-xs font-semibold text-muted-foreground tabular-nums">{badges.enquiries}</span>
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/admin/tutor-accounts" />}>
          <span className="flex-1">Tutor profiles to review</span>
          <span className="text-xs font-semibold text-muted-foreground tabular-nums">{badges.tutorReviews}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ProfileMenu() {
  const router = useRouter()
  const { session, signOut } = useAdminSession()
  const { density, setDensity } = useAdminShell()
  const name = session?.name ?? 'Administrator'
  const initials = name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<button type="button" className="flex h-9 items-center gap-2.5 rounded-md px-1 outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Account menu" />}>
        <Avatar size="default">
          <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">{initials}</AvatarFallback>
        </Avatar>
        <span className="hidden flex-col items-start leading-tight md:flex">
          <span className="text-[13px] font-semibold text-foreground">{name}</span>
          <span className="text-[11px] text-muted-foreground">{session ? roleLabel[session.role] : ''}</span>
        </span>
        <ChevronDown className="hidden size-3.5 text-muted-foreground md:block" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <span className="block text-sm font-medium text-foreground">{name}</span>
          <span className="mt-0.5 block truncate text-xs text-muted-foreground">{session?.email ?? ''}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setDensity(density === 'compact' ? 'comfortable' : 'compact')}>
          <Rows3 className="size-4" aria-hidden="true" />
          {density === 'compact' ? 'Comfortable density' : 'Compact density'}
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/" target="_blank" />}>
          <ExternalLink className="size-4" aria-hidden="true" />
          View public site
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/student" />}>
          <GraduationCap className="size-4" aria-hidden="true" />
          Student space
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut()
            router.replace('/admin/login')
          }}
        >
          <LogOut className="size-4" aria-hidden="true" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function AdminTopbar() {
  const { collapsed, toggleCollapsed, setMenuOpen, mode, setMode } = useAdminShell()
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="size-9"
        aria-label="Toggle navigation"
        aria-expanded={!collapsed}
        onClick={() => {
          if (window.matchMedia('(min-width: 1024px)').matches) toggleCollapsed()
          else setMenuOpen(true)
        }}
      >
        <PanelLeft className="size-[18px]" aria-hidden="true" />
      </Button>
      <div className={cn('hidden shrink-0', collapsed ? 'lg:block' : 'sm:block lg:hidden')}>
        <AdminBrand />
      </div>
      <div className="hidden w-full max-w-md md:block">
        <AdminQuickSearch />
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <QuickAdd />
        <Button variant="ghost" size="icon" className="size-9" aria-label={mode === 'dark' ? 'Use light theme' : 'Use dark theme'} onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
          {mode === 'dark' ? <Sun className="size-[18px]" aria-hidden="true" /> : <Moon className="size-[18px]" aria-hidden="true" />}
        </Button>
        <NotificationBell />
        <ProfileMenu />
      </div>
    </header>
  )
}
