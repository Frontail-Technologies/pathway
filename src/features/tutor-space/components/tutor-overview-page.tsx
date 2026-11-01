'use client'

import Link from 'next/link'
import { CalendarClock, Check, ChevronRight, CircleDashed, ExternalLink, Inbox, UserRound } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { DashboardSection, ActionButton } from '@/features/student/components/dashboard-parts'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import { DEMO_TUTOR_SLUG, demoTutor, profileChecklist } from '../data/tutor-space'
import { useTutorSpace } from '../state/tutor-space-provider'

export function TutorOverviewPage() {
  const { state, update } = useTutorSpace()
  const checklist = profileChecklist(state)
  const done = checklist.filter((item) => item.done).length
  const completion = Math.round((done / checklist.length) * 100)
  const newRequests = state.requests.filter((r) => r.status === 'new')
  const accepted = state.requests.filter((r) => r.status === 'accepted').length
  const weeklySlots = Object.values(state.availability).reduce((sum, slots) => sum + slots.length, 0)
  const firstName = state.profile.name.split(' ')[0]

  const stats = [
    { label: 'New requests', value: newRequests.length, icon: Inbox, href: '/tutor-dashboard/requests' },
    { label: 'Active students', value: accepted, icon: UserRound, href: '/tutor-dashboard/requests' },
    { label: 'Weekly time slots', value: weeklySlots, icon: CalendarClock, href: '/tutor-dashboard/availability' },
  ]

  return (
    <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="flex min-w-0 flex-col gap-5">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Welcome back, {firstName}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Keep your profile and availability current so students can find you.</p>
        </div>

        <section className="flex flex-col gap-4 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:p-5">
          <TutorPortrait tutor={demoTutor} className="size-16 rounded-xl" />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold text-foreground">{state.profile.name}</p>
            <p className="text-sm text-muted-foreground">{state.profile.headline}</p>
          </div>
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border bg-muted/40 px-3 py-2.5 sm:justify-start">
            <span className="text-sm font-medium text-foreground">Accepting new students</span>
            <Switch checked={state.acceptingStudents} onCheckedChange={(checked) => update({ acceptingStudents: checked })} />
          </label>
        </section>

        <ul className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {stats.map(({ label, value, icon: Icon, href }) => (
            <li key={label}>
              <Link href={href} className="flex h-full flex-col gap-2 rounded-[12px] border bg-card p-3 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40 sm:p-4">
                <Icon className="size-4.5 text-primary" aria-hidden="true" />
                <span className="font-heading text-2xl font-bold text-foreground">{value}</span>
                <span className="text-xs leading-4 text-muted-foreground">{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <DashboardSection title="New session requests" description="Sample requests while public requests are being built." action={<ActionButton href="/tutor-dashboard/requests">View all</ActionButton>}>
          {newRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground">No new requests. You’re all caught up.</p>
          ) : (
            <ul className="divide-y rounded-[10px] border">
              {newRequests.slice(0, 3).map((request) => (
                <li key={request.id}>
                  <Link href="/tutor-dashboard/requests" className="flex items-center gap-3 px-4 py-3 outline-none hover:bg-muted/50 focus-visible:bg-muted">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">
                        {request.student} · {request.subject}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {request.level} · {request.mode} · {request.preferredTime}
                      </p>
                    </div>
                    <ChevronRight className="size-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </DashboardSection>
      </div>

      <div className="flex min-w-0 flex-col gap-5">
        <DashboardSection title="Profile strength" description={`${done} of ${checklist.length} items complete`}>
          <div className="flex items-center gap-3">
            <Progress value={completion} className="flex-1" aria-label="Profile completion" />
            <span className="text-sm font-bold text-foreground">{completion}%</span>
          </div>
          <ul className="mt-4 flex flex-col gap-1.5">
            {checklist.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="flex items-center gap-2 rounded-md px-1 py-1 text-sm outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/40">
                  {item.done ? <Check className="size-4 shrink-0 text-success" aria-hidden="true" /> : <CircleDashed className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
                  <span className={item.done ? 'text-muted-foreground' : 'font-medium text-foreground'}>{item.label}</span>
                  <span className="sr-only">{item.done ? '(done)' : '(to do)'}</span>
                </Link>
              </li>
            ))}
          </ul>
        </DashboardSection>

        <DashboardSection title="Public profile">
          <p className="text-sm leading-6 text-muted-foreground">This is the page students see. Edits made here are saved on this device; publishing changes is not connected yet.</p>
          <Link href={`/tutor/${DEMO_TUTOR_SLUG}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
            View public profile
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </Link>
        </DashboardSection>
      </div>
    </div>
  )
}
