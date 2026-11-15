'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, ChevronRight, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Illustration } from '@/components/shared/illustration'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { cn } from '@/lib/utils'
import { DashboardSection, ActionButton } from '@/features/student/components/dashboard-parts'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { initialsOf } from '@/features/student/data/student'
import { checklistHref, verificationCopy } from '../data/tutor-account-api'
import { useTutorSpace } from '../state/tutor-space-provider'
import { verificationTone } from './tutor-space-nav'

const reviewArt: Record<keyof typeof verificationCopy, SpotArtName> = { draft: 'notes', pending_review: 'search', changes_requested: 'exam', approved: 'verified' }

function StrengthRing({ percent }: { percent: number }) {
  const radius = 34
  const circumference = 2 * Math.PI * radius
  return (
    <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Profile strength" className="relative size-24 shrink-0">
      <svg viewBox="0 0 80 80" className="size-full -rotate-90">
        <circle cx={40} cy={40} r={radius} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={8} />
        <circle cx={40} cy={40} r={radius} fill="none" stroke="var(--brand-orange)" strokeWidth={8} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - percent / 100)} />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-xl font-extrabold">{percent}%</span>
        <span className="text-[11px] text-primary-foreground/80">profile</span>
      </span>
    </div>
  )
}

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
  const firstName = state.profile.name.split(' ')[0] || 'there'
  const copy = verificationCopy[verification.status]
  const canSubmit = verification.status === 'draft' || verification.status === 'changes_requested'

  const stats: { label: string; value: number; href: string; art: SpotArtName }[] = [
    { label: 'New requests', value: newRequests.length, href: '/tutor-dashboard/requests', art: 'notes' },
    { label: 'Active students', value: accepted, href: '/tutor-dashboard/requests', art: 'tutor' },
    { label: 'Weekly time slots', value: weeklySlots, href: '/tutor-dashboard/availability', art: 'updated' },
  ]

  const submit = () => {
    setSubmitting(true)
    submitForReview()
      .then(() => toast.success('Submitted for review. We’ll let you know when it’s approved.'))
      .catch((error: unknown) => toast.error(error instanceof ApiRequestError ? error.message : 'Could not submit your profile. Please try again.'))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-5">
      <section aria-label="Tutor summary" className="relative overflow-hidden rounded-2xl bg-primary p-5 text-primary-foreground sm:p-6">
        <span aria-hidden="true" className="absolute -top-16 -right-10 size-56 rounded-full bg-primary-foreground/10" />
        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span aria-hidden="true" className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary-foreground text-xl font-bold text-primary ring-4 ring-primary-foreground/20">
              {initialsOf(state.profile.name || account.email)}
            </span>
            <div className="min-w-0">
              <h1 className="font-heading text-2xl leading-tight font-extrabold sm:text-[28px]">Welcome back, {firstName}</h1>
              <p className="mt-1 truncate text-sm text-primary-foreground/85">{state.profile.headline || 'Add a headline so students know what you teach'}</p>
              <label className="mt-3 inline-flex cursor-pointer items-center gap-3 rounded-lg bg-primary-foreground/12 px-3 py-2">
                <span className="text-sm font-medium">Accepting new students</span>
                <Switch
                  checked={state.acceptingStudents}
                  onCheckedChange={(checked) => saveSettings({ acceptingStudents: checked }).catch(() => toast.error('Could not update this setting. Please try again.'))}
                />
              </label>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StrengthRing percent={completion} />
            <div className="flex flex-col gap-2">
              <p className="text-sm text-primary-foreground/85">
                {done} of {checklist.length} profile items done
              </p>
              <Button variant="cta" className="h-10 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/tutor-dashboard/profile" />}>
                Edit profile
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <li key={stat.label}>
            <Link href={stat.href} className="group flex h-full items-center gap-3 rounded-xl border bg-card p-4 outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-primary/40">
              <SpotArt name={stat.art} className="size-12" />
              <span>
                <span className="block font-heading text-2xl font-extrabold text-foreground tabular-nums">{stat.value}</span>
                <span className="block text-[13px] text-muted-foreground group-hover:text-primary">{stat.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-5">
          <section className="rounded-xl border bg-card p-4 sm:p-5">
            <div className="flex items-start gap-4">
              <SpotArt name={reviewArt[verification.status]} className="size-14" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-lg font-bold text-foreground">Profile review</h2>
                  <span className={cn('rounded-md px-2 py-0.5 text-xs font-semibold', verificationTone[verification.status])}>{copy.label}</span>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy.description}</p>
                {verification.submittedAt ? <p className="mt-1 text-xs text-muted-foreground">Submitted {new Date(verification.submittedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p> : null}
              </div>
            </div>
            {verification.status === 'changes_requested' && verification.reviewNote ? (
              <div className="mt-4 rounded-lg border border-cta/30 bg-cta/5 p-3">
                <p className="text-xs font-semibold text-foreground">Reviewer feedback</p>
                <p className="mt-1 text-sm leading-6 text-foreground">{verification.reviewNote}</p>
              </div>
            ) : null}
            {canSubmit ? (
              <div className="mt-4 flex flex-wrap items-center gap-3 border-t pt-4">
                <Button variant="cta" className="h-10 px-5 text-sm font-semibold" disabled={!verification.canSubmit || submitting} onClick={submit}>
                  {submitting ? 'Submitting…' : 'Submit for review'}
                </Button>
                {!verification.canSubmit ? <span className="text-sm text-muted-foreground">Finish the checklist to submit</span> : null}
              </div>
            ) : null}
          </section>

          <DashboardSection title="New session requests" action={<ActionButton href="/tutor-dashboard/requests">View all</ActionButton>}>
            {newRequests.length === 0 ? (
              <div className="flex flex-col items-center gap-1 py-2 text-center sm:flex-row sm:gap-5 sm:text-left">
                <Illustration name="inboxEmpty" width={150} />
                <div>
                  <p className="font-semibold text-foreground">No requests yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">Students can request sessions once your profile is approved and you are accepting new students.</p>
                </div>
              </div>
            ) : (
              <ul className="divide-y rounded-lg border">
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
          <DashboardSection title="Profile checklist">
            <ul className="flex flex-col gap-1">
              {checklist.map((item) => (
                <li key={item.id}>
                  <Link href={checklistHref(item.id)} className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40">
                    {item.done ? (
                      <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                    ) : (
                      <span aria-hidden="true" className="size-4 shrink-0 rounded-full border-2 border-primary/40" />
                    )}
                    <span className={cn('min-w-0 flex-1', item.done ? 'text-muted-foreground' : 'font-medium text-foreground group-hover:text-primary')}>{item.label}</span>
                    <span className="sr-only">{item.done ? '(done)' : '(to do)'}</span>
                    {!item.done ? <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" /> : null}
                  </Link>
                </li>
              ))}
            </ul>
          </DashboardSection>

          <section className="rounded-xl bg-secondary p-5">
            <SpotArt name="tutor" className="size-12 bg-card" />
            <h2 className="mt-3 font-heading text-base font-bold text-foreground">Your public profile</h2>
            {listing?.status === 'published' ? (
              <>
                <p className="mt-1 text-sm text-muted-foreground">This is what students see. It shows your last approved profile.</p>
                <Link href={`/tutor/${listing.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  View public profile
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </Link>
              </>
            ) : (
              <>
                <p className="mt-1 text-sm text-muted-foreground">{listing ? 'Your approved profile is being prepared for publishing.' : 'Your public page is created when Pathway approves your profile.'}</p>
                <Link href="/tutors" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  See how tutor pages look
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
