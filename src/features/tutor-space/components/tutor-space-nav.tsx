'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CalendarClock, Inbox, LayoutDashboard, LogOut, Settings, UserRound, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { initialsOf } from '@/features/student/data/student'
import { verificationCopy } from '../data/tutor-account-api'
import { useTutorSpace } from '../state/tutor-space-provider'

export const tutorSpaceNavigation: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/tutor-dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/tutor-dashboard/profile', label: 'Profile', icon: UserRound },
  { href: '/tutor-dashboard/availability', label: 'Availability', icon: CalendarClock },
  { href: '/tutor-dashboard/requests', label: 'Session requests', icon: Inbox },
  { href: '/tutor-dashboard/settings', label: 'Settings', icon: Settings },
]

const groups: { title: string; hrefs: string[] }[] = [
  { title: 'Your tutor space', hrefs: ['/tutor-dashboard', '/tutor-dashboard/profile', '/tutor-dashboard/availability'] },
  { title: 'Students', hrefs: ['/tutor-dashboard/requests'] },
  { title: 'Account', hrefs: ['/tutor-dashboard/settings'] },
]

export const verificationTone = {
  draft: 'bg-muted text-muted-foreground',
  pending_review: 'bg-secondary text-primary',
  changes_requested: 'bg-cta/10 text-cta-hover',
  approved: 'bg-success/15 text-success',
} as const

export function useTutorSignOut() {
  const { signOut } = useTutorSpace()
  const router = useRouter()
  return () => {
    void signOut().then(() => {
      toast.success('Signed out')
      router.push('/login?as=tutor')
    })
  }
}

function TutorCard() {
  const { state, account } = useTutorSpace()
  const checklist = account?.checklist ?? []
  const percent = checklist.length ? Math.round((checklist.filter((item) => item.done).length / checklist.length) * 100) : 0
  const status = account?.verification.status
  return (
    <Link href="/tutor-dashboard/profile" className="group flex items-center gap-3 rounded-xl bg-secondary p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
      <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {initialsOf(state.profile.name || account?.email || 'T')}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary">{state.profile.name || 'Your profile'}</span>
        {status ? <span className={cn('mt-1 inline-flex rounded px-1.5 py-px text-[11px] font-semibold', verificationTone[status])}>{verificationCopy[status].label}</span> : null}
        <span className="mt-1.5 flex items-center gap-2">
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-card">
            <span className="block h-full rounded-full bg-cta" style={{ width: `${percent}%` }} />
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground tabular-nums">{percent}%</span>
        </span>
      </span>
    </Link>
  )
}

export function TutorSpaceNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { state } = useTutorSpace()
  const signOut = useTutorSignOut()
  const newRequests = state.requests.filter((request) => request.status === 'new').length
  const byHref = Object.fromEntries(tutorSpaceNavigation.map((item) => [item.href, item]))

  return (
    <div className="flex h-full flex-col gap-5">
      <TutorCard />
      <nav aria-label="Tutor navigation" className="flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-1.5 text-xs font-semibold text-muted-foreground">{group.title}</p>
            <ul className="flex flex-col gap-0.5">
              {group.hrefs.map((href) => {
                const item = byHref[href]!
                const Icon = item.icon
                const active = pathname === href
                const count = href.endsWith('/requests') && newRequests ? newRequests : null
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                        active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted hover:text-primary',
                      )}
                    >
                      <Icon className={cn('size-4.5 shrink-0', active ? 'text-primary-foreground' : 'text-muted-foreground')} aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate">{item.label}</span>
                      {count ? <span className="rounded-md bg-cta px-1.5 text-xs font-semibold text-white tabular-nums">{count}</span> : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-auto border-t pt-3">
        <button
          type="button"
          onClick={() => {
            onNavigate?.()
            signOut()
          }}
          className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <LogOut className="size-4.5 shrink-0" aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  )
}
