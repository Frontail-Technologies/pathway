'use client'

import type { ComponentType } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Bookmark, BookOpen, FileText, LayoutDashboard, LogOut, MessagesSquare, SlidersHorizontal, UserRound } from 'lucide-react'
import { studentNavigation } from '@/config/navigation'
import { cn } from '@/lib/utils'
import { savedKinds, useSavedItems } from '@/features/saved/saved-items-provider'
import { getProfileCompletion, initialsOf } from '@/features/student/data/student'
import { useStudentProfile } from '@/features/student/state/student-profile-provider'
import { useStudentSession } from '@/features/student/state/student-session'

type NavId = (typeof studentNavigation)[number]['id']

const icons: Record<NavId, ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>> = {
  dashboard: LayoutDashboard,
  profile: UserRound,
  preferences: SlidersHorizontal,
  saved: Bookmark,
  notes: BookOpen,
  enquiries: MessagesSquare,
  resume: FileText,
}

const groups: { title: string; ids: NavId[] }[] = [
  { title: 'Account', ids: ['dashboard', 'profile', 'preferences'] },
  { title: 'Your activity', ids: ['saved', 'notes', 'enquiries'] },
  { title: 'Tools', ids: ['resume'] },
]

const labels: Partial<Record<NavId, string>> = { enquiries: 'Enquiries' }

function StudentCard() {
  const { profile, photoUrl } = useStudentProfile()
  const completion = getProfileCompletion(profile)
  return (
    <Link href="/student/profile" className="group flex items-center gap-3 rounded-xl bg-secondary p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
      <span className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-primary-foreground">
        {photoUrl ? <Image src={photoUrl} alt="" fill className="object-cover" /> : <span aria-hidden="true">{initialsOf(profile.name || profile.email)}</span>}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary">{profile.name || 'Your profile'}</span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-card">
            <span className="block h-full rounded-full bg-cta" style={{ width: `${completion.percent}%` }} />
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground tabular-nums">{completion.percent}%</span>
        </span>
      </span>
    </Link>
  )
}

export function StudentNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut } = useStudentSession()
  const { saved } = useSavedItems()
  const savedCount = savedKinds.reduce((sum, kind) => sum + (saved[kind]?.length ?? 0), 0)
  const byId = Object.fromEntries(studentNavigation.map((item) => [item.id, item])) as Record<NavId, (typeof studentNavigation)[number]>

  const logOut = async () => {
    await signOut()
    onNavigate?.()
    toast.success('Signed out')
    router.push('/login')
  }

  return (
    <div className="flex h-full flex-col gap-5">
      <StudentCard />
      <nav aria-label="Student navigation" className="flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.title}>
            <p className="px-3 pb-1.5 text-xs font-semibold text-muted-foreground">{group.title}</p>
            <ul className="flex flex-col gap-0.5">
              {group.ids.map((id) => {
                const item = byId[id]
                if (!item?.available) return null
                const Icon = icons[id]
                const active = pathname === item.href
                const count = id === 'saved' && savedCount ? savedCount : null
                return (
                  <li key={id}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
                        active ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-muted hover:text-primary',
                      )}
                    >
                      <Icon className={cn('size-4.5 shrink-0', active ? 'text-primary-foreground' : 'text-muted-foreground')} aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate">{labels[id] ?? item.label}</span>
                      {count ? <span className={cn('rounded-md px-1.5 text-xs font-semibold tabular-nums', active ? 'bg-primary-foreground/20' : 'bg-secondary text-primary')}>{count}</span> : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-auto border-t pt-3">
        <button type="button" onClick={logOut} className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-lg px-3 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary/40">
          <LogOut className="size-4.5 shrink-0" aria-hidden="true" />
          Log out
        </button>
      </div>
    </div>
  )
}
