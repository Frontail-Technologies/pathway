'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarClock, Check, ChevronRight, CircleDashed, ExternalLink, Inbox, UserRound } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { DashboardSection, ActionButton } from '@/features/student/components/dashboard-parts'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { initialsOf } from '@/features/student/data/student'
import { checklistHref, verificationCopy } from '../data/tutor-account-api'
import { useTutorSpace } from '../state/tutor-space-provider'

const statusTone = {
  draft: 'bg-muted text-muted-foreground',
  pending_review: 'bg-primary/10 text-primary',
  changes_requested: 'bg-warning/15 text-foreground',
  approved: 'bg-success/15 text-success',
} as const

export function TutorOverviewPage() {
  const { state, account, saveSettings, submitForReview } = useTutorSpace()
  const [submitting, setSubmitting] = useState(false)
  if (!account) return <p className="text-sm text-muted-foreground">Your tutor account couldn&apos;t be loaded. Refresh the page to try again.</p>

  const { verification, checklist, listing } = account
  const done = checklist.filter((item) => item.done).length
  const completion = Math.round((done / checklist.length) * 100)
  const newRequests = state.requests.filter((r) => r.status === 'new')
  const accepted = state.requests.filter((r) => r.status === 'accepted').length
  const weeklySlots = account.availability.length
  const firstName = state.profile.name.split(' ')[0]
  const copy = verificationCopy[verification.status]

  const stats = [
    { label: 'New requests', value: newRequests.length, icon: Inbox, href: '/tutor-dashboard/requests' },
    { label: 'Active students', value: accepted, icon: UserRound, href: '/tutor-dashboard/requests' },
    { label: 'Weekly time slots', value: weeklySlots, icon: CalendarClock, href: '/tutor-dashboard/availability' },
  ]

  const submit = () => {
    setSubmitting(true)
    submitForReview()
      .then(() => toast.success('Submitted for review. We’ll let you know when it’s approved.'))
      .catch((error: unknown) => toast.error(error instanceof ApiRequestError ? error.message : 'Could not submit your profile. Please try again.'))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="flex min-w-0 flex-col gap-5">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Welcome back, {firstName}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Keep your profile and availability current so students can find you.</p>
        </div>

        <section className="flex flex-col gap-4 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:p-5">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-secondary font-heading text-lg font-bold text-primary" aria-hidden="true">
            {initialsOf(state.profile.name || account.email)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-lg font-bold text-foreground">{state.profile.name}</p>
            <p className="text-sm text-muted-foreground">{state.profile.headline || 'Add a headline to your profile'}</p>
          </div>
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border bg-muted/40 px-3 py-2.5 sm:justify-start">
            <span className="text-sm font-medium text-foreground">Accepting new students</span>
            <Switch
              checked={state.acceptingStudents}
              onCheckedChange={(checked) => saveSettings({ acceptingStudents: checked }).catch(() => toast.error('Could not update this setting. Please try again.'))}
            />
          </label>
        </section>

        <DashboardSection title="Profile review" description="Students only see your profile after Pathway approves it.">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[verification.status]}`}>{copy.label}</span>
              {verification.submittedAt ? <span className="text-xs text-muted-foreground">Submitted {new Date(verification.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span> : null}
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{copy.description}</p>
            {verification.status === 'changes_requested' && verification.reviewNote ? (
              <div className="rounded-lg border border-warning/30 bg-warning/10 p-3">
                <p className="text-xs font-semibold text-foreground">Reviewer feedback</p>
                <p className="mt-1 text-sm leading-6 text-foreground">{verification.reviewNote}</p>
              </div>
            ) : null}
            {verification.status === 'draft' || verification.status === 'changes_requested' ? (
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="cta" className="h-10 px-4 text-sm font-semibold" disabled={!verification.canSubmit || submitting} onClick={submit}>
                  {submitting ? 'Submitting…' : 'Submit for review'}
                </Button>
                {!verification.canSubmit ? <span className="text-xs text-muted-foreground">Complete the profile checklist first.</span> : null}
              </div>
            ) : null}
          </div>
        </DashboardSection>

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
                <Link href={checklistHref(item.id)} className="flex items-center gap-2 rounded-md px-1 py-1 text-sm outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-primary/40">
                  {item.done ? <Check className="size-4 shrink-0 text-success" aria-hidden="true" /> : <CircleDashed className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />}
                  <span className={item.done ? 'text-muted-foreground' : 'font-medium text-foreground'}>{item.label}</span>
                  <span className="sr-only">{item.done ? '(done)' : '(to do)'}</span>
                </Link>
              </li>
            ))}
          </ul>
        </DashboardSection>

        <DashboardSection title="Public profile">
          {listing?.status === 'published' ? (
            <>
              <p className="text-sm leading-6 text-muted-foreground">This is the page students see. It shows your last approved profile.</p>
              <Link href={`/tutor/${listing.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary outline-none hover:underline focus-visible:ring-2 focus-visible:ring-primary/40">
                View public profile
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </Link>
            </>
          ) : (
            <p className="text-sm leading-6 text-muted-foreground">
              {listing ? 'Your approved profile is being prepared for publishing.' : 'You don’t have a public profile yet. It is created when Pathway approves your profile.'}
            </p>
          )}
        </DashboardSection>
      </div>
    </div>
  )
}
