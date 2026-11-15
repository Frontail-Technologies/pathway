'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bookmark, LayoutDashboard, LogOut, MessagesSquare, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useAuthSession } from '@/features/auth/state/auth-session-provider'
import type { SessionUser } from '@/features/auth/lib/session-client'

const ghostOnBlue = 'text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:border-transparent focus-visible:ring-white/70'

export function accountDisplay(user: SessionUser) {
  const name = user.tutor?.displayName || [user.profile?.firstName, user.profile?.lastName].filter(Boolean).join(' ') || user.email.split('@')[0] || 'Account'
  const initials =
    name
      .split(/\s+/)
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'P'
  const home = user.role === 'tutor' ? '/tutor-dashboard' : user.role === 'student' ? '/student' : '/admin'
  return { name, firstName: name.split(' ')[0], initials, home }
}

export function HeaderAccount() {
  const router = useRouter()
  const { status, user, signOut } = useAuthSession()

  if (status === 'restoring') return <span aria-hidden="true" className="size-10 rounded-full bg-primary-foreground/12" />

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" className={`text-[15px] font-semibold ${ghostOnBlue}`} nativeButton={false} render={<Link href="/login" />}>
          Sign in
        </Button>
        <Button variant="cta" className="h-9 px-4 text-sm font-semibold" nativeButton={false} render={<Link href="/register" />}>
          Create account
        </Button>
      </div>
    )
  }

  const { name, firstName, initials, home } = accountDisplay(user)
  const items =
    user.role === 'tutor'
      ? [
          { label: 'Tutor space', href: '/tutor-dashboard', icon: LayoutDashboard },
          { label: 'Profile', href: '/tutor-dashboard/profile', icon: UserRound },
          { label: 'Requests', href: '/tutor-dashboard/requests', icon: MessagesSquare },
        ]
      : user.role === 'student'
        ? [
            { label: 'Dashboard', href: '/student', icon: LayoutDashboard },
            { label: 'My profile', href: '/student/profile', icon: UserRound },
            { label: 'Saved items', href: '/student/saved', icon: Bookmark },
            { label: 'Enquiries', href: '/student/enquiries', icon: MessagesSquare },
          ]
        : [{ label: 'Admin console', href: '/admin', icon: LayoutDashboard }]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<button type="button" aria-label={`Account menu for ${name}`} className={`flex h-10 cursor-pointer items-center gap-2 rounded-full py-1 pr-3 pl-1 outline-none transition-colors focus-visible:ring-2 ${ghostOnBlue}`} />}>
        <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground text-xs font-bold text-primary">{initials}</span>
        <span className="max-w-32 truncate text-[15px] font-semibold">{firstName}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <div className="flex items-center gap-2.5 px-1.5 py-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{initials}</span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-foreground">{name}</span>
            <span className="block truncate text-xs text-muted-foreground">{user.email}</span>
          </span>
        </div>
        <DropdownMenuSeparator />
        {items.map(({ label, href, icon: Icon }) => (
          <DropdownMenuItem key={href} className="h-9 px-2" render={<Link href={href} />}>
            <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
            {label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="h-9 px-2"
          variant="destructive"
          onClick={async () => {
            await signOut()
            toast.success('Signed out')
            router.push(home === '/admin' ? '/admin/login' : '/')
          }}
        >
          <LogOut className="size-4" aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function MobileAccountLink({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useAuthSession()
  if (!user) {
    return (
      <Link href="/login" onClick={onNavigate} className="flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:bg-muted">
        <UserRound className="size-4.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        Sign in
      </Link>
    )
  }
  const { name, initials, home } = accountDisplay(user)
  return (
    <Link href={home} onClick={onNavigate} className="flex h-12 items-center gap-3 rounded-md px-2 outline-none transition-colors hover:bg-muted focus-visible:bg-muted">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{initials}</span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-foreground">{name}</span>
        <span className="block text-xs text-muted-foreground">Go to your dashboard</span>
      </span>
    </Link>
  )
}

export function AccountBadge() {
  const { user } = useAuthSession()
  if (!user) return <UserRound className="size-5" />
  return <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground text-xs font-bold text-primary">{accountDisplay(user).initials}</span>
}
