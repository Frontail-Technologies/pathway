'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { CalendarClock, MonitorSmartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Illustration } from '@/components/shared/illustration'
import type { RequestStatus } from '../data/tutor-space'
import { useTutorSpace } from '../state/tutor-space-provider'

const filters: { value: RequestStatus | 'all'; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
  { value: 'all', label: 'All' },
]

const statusStyle: Record<RequestStatus, string> = {
  new: 'bg-cta/10 text-cta-hover',
  accepted: 'bg-success-surface text-success',
  declined: 'bg-muted text-muted-foreground',
}

export function TutorRequestsPage() {
  const { state, updateRequests } = useTutorSpace()
  const [filter, setFilter] = useState<RequestStatus | 'all'>('new')
  const list = state.requests.filter((r) => filter === 'all' || r.status === filter)

  const setStatus = (id: string, status: RequestStatus) => {
    updateRequests((current) => current.map((r) => (r.id === id ? { ...r, status } : r)))
    toast.success(status === 'accepted' ? 'Request accepted. Messaging students is coming soon.' : status === 'declined' ? 'Request declined.' : 'Moved back to new.')
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Session requests</h1>
        <p className="mt-1 text-sm text-muted-foreground">Review requests from students and decide which to take on.</p>
      </div>

      <div role="tablist" aria-label="Filter requests" className="-mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        {filters.map((f) => {
          const count = f.value === 'all' ? state.requests.length : state.requests.filter((r) => r.status === f.value).length
          const active = filter === f.value
          return (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f.value)}
              className={`shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${active ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary'}`}
            >
              {f.label} · {count}
            </button>
          )
        })}
      </div>

      {list.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border bg-card px-6 py-10 text-center">
          <Illustration name="inboxEmpty" width={200} />
          <p className="mt-2 font-heading text-lg font-bold text-foreground">{state.requests.length ? 'Nothing in this list' : 'No session requests yet'}</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">{state.requests.length ? 'Requests you mark this way will show up here.' : 'When students ask for a session after your profile is approved, their requests land here.'}</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {list.map((request) => (
            <li key={request.id} className="rounded-xl border bg-card p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-foreground">
                    {request.student} · {request.subject}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {request.level} · Received {request.receivedOn}
                  </p>
                </div>
                <span className={`rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${statusStyle[request.status]}`}>{request.status}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-foreground">{request.message}</p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MonitorSmartphone className="size-3.5" aria-hidden="true" />
                  {request.mode}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarClock className="size-3.5" aria-hidden="true" />
                  {request.preferredTime}
                </span>
              </div>
              <div className="mt-4 flex gap-2 border-t pt-3">
                {request.status === 'new' ? (
                  <>
                    <Button variant="cta" className="h-10 flex-1 text-sm font-semibold sm:flex-none sm:px-5" onClick={() => setStatus(request.id, 'accepted')}>
                      Accept
                    </Button>
                    <Button variant="outline" className="h-10 flex-1 text-sm sm:flex-none sm:px-5" onClick={() => setStatus(request.id, 'declined')}>
                      Decline
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="h-10 text-sm" onClick={() => setStatus(request.id, 'new')}>
                    Undo
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
