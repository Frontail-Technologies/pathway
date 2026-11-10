'use client'

import * as React from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import {
  approveTutorAccount,
  findCatalogListing,
  formatDateTime,
  getTutorAccount,
  getTutorAccountHistory,
  historyActionLabels,
  listingLabels,
  publishCatalogListing,
  requestTutorChanges,
  verificationLabels,
  verificationTone,
  type AdminTutorAccount,
  type CatalogTutorListing,
  type HistoryEvent,
} from '@/features/admin/data/admin-tutor-accounts'
import { SLOTS } from '@/features/tutor-space/data/tutor-space'
import { Field } from '../../demo/demo-form'
import { AdminPageHeader, FactList, Panel, StatusBadge, Tag, Monogram, RecordHeader } from '../../kit'

const DAY_LABELS = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' } as const
const SLOT_LABELS: Record<string, string> = Object.fromEntries(SLOTS.map((slot) => [slot.id, slot.label]))
const REASON_MIN = 5
const REASON_MAX = 1000

const messageOf = (error: unknown, fallback: string) => (error instanceof ApiRequestError ? error.message : fallback)

function Terms({ items }: { items: { slug: string; label: string }[] }) {
  if (items.length === 0) return <span className="text-muted-foreground">Not added</span>
  return (
    <span className="flex flex-wrap gap-1">
      {items.map((item) => (
        <Tag key={item.slug}>{item.label}</Tag>
      ))}
    </span>
  )
}

function RequestChangesDialog({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (open: boolean) => void; onSubmit: (reason: string) => Promise<void> }) {
  const [reason, setReason] = React.useState('')
  const [error, setError] = React.useState<string>()
  const [sending, setSending] = React.useState(false)

  React.useEffect(() => {
    if (open) {
      setReason('')
      setError(undefined)
    }
  }, [open])

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    const value = reason.trim()
    if (value.length < REASON_MIN) return setError(`Explain what needs to change (at least ${REASON_MIN} characters).`)
    setSending(true)
    onSubmit(value)
      .then(() => onOpenChange(false))
      .catch((err: unknown) => setError(messageOf(err, 'Could not send the request. Please try again.')))
      .finally(() => setSending(false))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>Request changes</DialogTitle>
            <DialogDescription>The tutor sees this note in Tutor Space and can resubmit after updating their profile.</DialogDescription>
          </DialogHeader>
          <Field id="review-reason" label="What needs to change" required error={error}>
            <Textarea
              id="review-reason"
              autoFocus
              rows={5}
              maxLength={REASON_MAX}
              value={reason}
              onChange={(event) => {
                setReason(event.target.value)
                setError(undefined)
              }}
              placeholder="For example: add the exams you prepare students for and a longer introduction."
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? 'review-reason-error' : undefined}
            />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} disabled={sending}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={sending}>
              {sending ? 'Sending…' : 'Send to tutor'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function HistoryList({ events }: { events: HistoryEvent[] | null }) {
  if (events === null) return <p className="text-sm text-muted-foreground">History could not be loaded.</p>
  if (events.length === 0) return <p className="text-sm text-muted-foreground">No review activity yet.</p>
  return (
    <ol className="space-y-4">
      {events.map((event) => {
        const reason = typeof event.metadata.reason === 'string' ? event.metadata.reason : null
        return (
          <li key={event.id} className="border-l-2 border-border pl-3">
            <p className="text-sm font-medium text-foreground">{historyActionLabels[event.action] ?? event.action}</p>
            <p className="text-[13px] text-muted-foreground">
              {formatDateTime(event.createdAt)}
              {event.actor ? ` · ${event.actor.email}` : ''}
            </p>
            {reason ? <p className="mt-1 text-[13px] leading-5 text-foreground">“{reason}”</p> : null}
          </li>
        )
      })}
    </ol>
  )
}

type Load = { state: 'loading' } | { state: 'error'; message: string } | { state: 'ready'; account: AdminTutorAccount }

export function AdminTutorAccountDetailView({ userId }: { userId: string }) {
  const { hydrated, session } = useAdminSession()
  const isAdmin = session?.role === 'admin'
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const queryClient = useQueryClient()
  const ready = hydrated && Boolean(session)

  const accountQuery = useQuery({ queryKey: queryKeys.adminTutorAccount(userId), queryFn: () => getTutorAccount(userId), enabled: ready })
  const loaded = accountQuery.data
  const historyQuery = useQuery({ queryKey: queryKeys.adminTutorAccountHistory(userId), queryFn: () => getTutorAccountHistory(userId), enabled: ready && Boolean(loaded) })
  const listingSlug = loaded?.listing?.slug
  const listingQuery = useQuery({ queryKey: queryKeys.adminCatalogListing(listingSlug ?? ''), queryFn: () => findCatalogListing(listingSlug!), enabled: ready && Boolean(listingSlug) })

  const load: Load = accountQuery.isError
    ? { state: 'error', message: messageOf(accountQuery.error, 'Could not load this tutor account.') }
    : loaded
      ? { state: 'ready', account: loaded }
      : { state: 'loading' }
  const history: HistoryEvent[] | null = historyQuery.isError ? null : (historyQuery.data ?? [])
  const listing: CatalogTutorListing | null | 'error' = listingQuery.isError ? 'error' : (listingQuery.data ?? null)

  const adopt = (next: AdminTutorAccount) => {
    queryClient.setQueryData(queryKeys.adminTutorAccount(userId), next)
    void queryClient.invalidateQueries({ queryKey: queryKeys.adminTutorAccountHistory(userId) })
    void queryClient.invalidateQueries({ queryKey: ['admin', 'tutor-accounts'], exact: false, predicate: (query) => query.queryKey[2] !== 'detail' })
    void queryClient.invalidateQueries({ queryKey: queryKeys.adminCatalogTutors })
  }

  const approveMutation = useMutation({
    mutationFn: () => approveTutorAccount(userId),
    onSuccess: (next) => {
      adopt(next)
      toast.success('Approved. The catalog listing has been updated.')
    },
    onError: (error) => toast.error(messageOf(error, 'Could not approve this profile.')),
  })
  const changesMutation = useMutation({
    mutationFn: (reason: string) => requestTutorChanges(userId, reason),
    onSuccess: (next) => {
      adopt(next)
      toast.success('Sent back to the tutor with your feedback.')
    },
  })
  const publishMutation = useMutation({
    mutationFn: (id: string) => publishCatalogListing(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.adminTutorAccount(userId) })
      void queryClient.invalidateQueries({ queryKey: ['admin', 'catalog-tutors'] })
      toast.success('The listing is now live.')
    },
    onError: (error) => toast.error(messageOf(error, 'Could not publish the listing.')),
  })

  const busy = approveMutation.isPending ? 'approve' : publishMutation.isPending ? 'publish' : null
  const approve = () => approveMutation.mutate()
  const requestChanges = async (reason: string) => {
    await changesMutation.mutateAsync(reason)
  }
  const publish = (id: string) => publishMutation.mutate(id)
  const retry = () => void accountQuery.refetch()

  const back = { href: '/admin/tutor-accounts', label: 'Tutor reviews' }

  if (load.state !== 'ready') {
    return (
      <div className="space-y-5">
        <AdminPageHeader title="Tutor account" back={back} />
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card shadow-sm px-4 py-14 text-center">
          <p className="text-sm text-muted-foreground">{load.state === 'loading' ? 'Loading tutor account…' : load.message}</p>
          {load.state === 'error' ? (
            <Button variant="outline" size="sm" onClick={retry}>
              Try again
            </Button>
          ) : null}
        </div>
      </div>
    )
  }

  const { account } = load
  const { profile, verification, settings, checklist } = account
  const pending = verification.status === 'pending_review'
  const byDay = Object.entries(DAY_LABELS)
    .map(([day, label]) => ({ label, slots: account.availability.filter((slot) => slot.day === day).map((slot) => SLOT_LABELS[slot.slot] ?? slot.slot) }))
    .filter((day) => day.slots.length > 0)

  return (
    <div className="space-y-5">
      <RecordHeader
        title={profile.displayName || 'Unnamed tutor'}
        media={<Monogram name={profile.displayName || 'Unnamed tutor'} size="lg" />}
        description={account.email}
        back={back}
        chips={
          <>
            <StatusBadge tone={verificationTone[verification.status]}>{verificationLabels[verification.status]}</StatusBadge>
            {account.accountStatus !== 'active' ? <StatusBadge tone="danger">{account.accountStatus === 'suspended' ? 'Account suspended' : 'Account disabled'}</StatusBadge> : null}
          </>
        }
        actions={
          pending ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setDialogOpen(true)} disabled={!isAdmin || busy !== null}>
                Request changes
              </Button>
              <Button size="sm" onClick={approve} disabled={!isAdmin || busy !== null}>
                {busy === 'approve' ? 'Approving…' : 'Approve'}
              </Button>
            </>
          ) : null
        }
      />

      {pending && !isAdmin ? <p className="text-[13px] text-muted-foreground">Only admins can approve or request changes.</p> : null}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Submitted profile" description={verification.submittedAt ? `Submitted ${formatDateTime(verification.submittedAt)}` : 'Not submitted yet'}>
            <FactList
              items={[
                { label: 'Display name', value: profile.displayName || '—' },
                { label: 'City', value: profile.city || '—' },
                { label: 'Headline', value: profile.headline || '—' },
              ]}
            />
            <div className="mt-4">
              <p className="text-[13px] text-muted-foreground">Introduction</p>
              <p className="mt-0.5 text-sm leading-6 whitespace-pre-line text-foreground">{profile.intro || '—'}</p>
            </div>
          </Panel>

          <Panel title="Teaching">
            <FactList
              columns={1}
              items={[
                { label: 'Subjects', value: <Terms items={profile.subjects} /> },
                { label: 'Exams', value: <Terms items={profile.exams} /> },
                { label: 'Levels', value: <Terms items={profile.levels} /> },
                { label: 'Languages', value: <Terms items={profile.languages} /> },
                { label: 'Teaching modes', value: <Terms items={profile.modes} /> },
              ]}
            />
          </Panel>

          <Panel title="Availability" description={settings.acceptingStudents ? 'Accepting new students' : 'Not accepting new students'}>
            {byDay.length === 0 ? (
              <p className="text-sm text-muted-foreground">No weekly time slots added.</p>
            ) : (
              <FactList columns={3} items={byDay.map((day) => ({ label: day.label, value: day.slots.join(', ') }))} />
            )}
          </Panel>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <Panel title="Review">
            <FactList
              columns={1}
              items={[
                { label: 'Status', value: verificationLabels[verification.status] },
                { label: 'Submitted', value: formatDateTime(verification.submittedAt) },
                { label: 'Last reviewed', value: formatDateTime(verification.reviewedAt) },
              ]}
            />
            {verification.reviewNote ? (
              <div className="mt-4 rounded-md border border-border bg-muted/40 p-3">
                <p className="text-[13px] text-muted-foreground">Feedback sent to tutor</p>
                <p className="mt-0.5 text-sm leading-5 text-foreground">{verification.reviewNote}</p>
              </div>
            ) : null}
            <ul className="mt-4 space-y-1">
              {checklist.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-2 text-sm">
                  <span className={item.done ? 'text-foreground' : 'text-muted-foreground'}>{item.label}</span>
                  <StatusBadge tone={item.done ? 'success' : 'warning'}>{item.done ? 'Done' : 'Missing'}</StatusBadge>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Catalog listing">
            {!account.listing ? (
              <p className="text-sm text-muted-foreground">No listing yet. Approving this profile creates it as a draft.</p>
            ) : listing === 'error' ? (
              <p className="text-sm text-muted-foreground">The listing could not be loaded.</p>
            ) : (
              <div className="space-y-3">
                <FactList
                  columns={1}
                  items={[
                    { label: 'Slug', value: account.listing.slug },
                    { label: 'Status', value: <StatusBadge tone={account.listing.status === 'published' ? 'success' : 'neutral'}>{listingLabels[account.listing.status]}</StatusBadge> },
                  ]}
                />
                <div className="flex flex-wrap gap-2">
                  {account.listing.status === 'published' ? (
                    <Link href={`/tutor/${account.listing.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                      View public page
                      <ExternalLink className="size-3.5" aria-hidden="true" />
                    </Link>
                  ) : listing ? (
                    <Button size="sm" onClick={() => publish(listing.id)} disabled={!isAdmin || busy !== null}>
                      {busy === 'publish' ? 'Publishing…' : 'Publish listing'}
                    </Button>
                  ) : null}
                </div>
                {account.listing.status === 'published' ? <p className="text-[13px] text-muted-foreground">Public tutor pages still read the demo catalog until catalog integration (B1), so a newly approved tutor&apos;s page may not render yet.</p> : null}
                {account.listing.status !== 'published' && !isAdmin ? <p className="text-[13px] text-muted-foreground">Only admins can publish listings.</p> : null}
              </div>
            )}
          </Panel>

          <Panel title="History">
            <HistoryList events={history} />
          </Panel>
        </div>
      </div>

      <RequestChangesDialog open={dialogOpen} onOpenChange={setDialogOpen} onSubmit={requestChanges} />
    </div>
  )
}
