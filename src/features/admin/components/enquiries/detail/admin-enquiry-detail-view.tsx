'use client'

import * as React from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Check, Copy } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { AdminEnquiry, LeadStatus } from '@/features/admin/data/admin-enquiries'
import { AdminPageHeader, FactList, Panel, Tag } from '../../kit'
import { LeadStatusBadge } from '../shared/lead-status-badge'
import { enquirySourceLabels, enquiryTitle, leadStatusDescriptions, leadStatusLabels, leadStatusOptions } from '../shared/enquiry-constants'

const followupLabels: Record<string, string> = {
  call: 'Call',
  email: 'Email',
  note: 'Note',
  status_change: 'Status change',
}

const priorityLabels: Record<string, string> = {
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
}

function StatusControl({ value, onChange }: { value: LeadStatus; onChange: (value: LeadStatus) => void }) {
  return (
    <Select value={value} onValueChange={(next) => next && onChange(next as LeadStatus)} items={leadStatusOptions}>
      <SelectTrigger size="sm" aria-label="Lead status" className="h-9 min-w-44 gap-1.5 bg-card text-sm">
        <span className="text-muted-foreground">Status:</span>
        <SelectValue>{leadStatusLabels[value]}</SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} side="bottom" align="end" sideOffset={4}>
        {leadStatusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function NotProvided() {
  return <span className="font-normal text-muted-foreground">Not provided</span>
}

export function AdminEnquiryDetailView({ enquiry }: { enquiry: AdminEnquiry }) {
  const [status, setStatus] = React.useState<LeadStatus>(enquiry.status)
  const [noteText, setNoteText] = React.useState('')
  const [copied, setCopied] = React.useState(false)
  const followups = enquiry.followups ?? []
  const notes = enquiry.notes ?? []

  function changeStatus(next: LeadStatus) {
    if (next === status) return
    setStatus(next)
    toast(`Status set to ${leadStatusLabels[next].toLowerCase()}`, {
      description: 'This change is not saved yet: the admin API is not connected.',
    })
  }

  async function copyId() {
    try {
      await navigator.clipboard.writeText(enquiry.id)
    } catch {
      /* clipboard unavailable; still confirm so the button doesn't feel broken */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        back={{ href: '/admin/enquiries', label: 'Enquiries' }}
        title={enquiryTitle(enquiry)}
        meta={
          <>
            <LeadStatusBadge status={status} />
            <Tag>{enquirySourceLabels[enquiry.source] ?? enquiry.sourceLabel}</Tag>
            <span className="text-[13px] text-muted-foreground">Received {enquiry.createdAt}</span>
          </>
        }
        actions={
          <>
            {enquiry.studentId ? (
              <Link href={`/admin/students/${enquiry.studentId}`} className={buttonVariants({ variant: 'outline', size: 'sm', className: 'h-9' })}>
                Open student
              </Link>
            ) : null}
            <StatusControl value={status} onChange={changeStatus} />
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel title="Message">
            {enquiry.message ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground">{enquiry.message}</p>
            ) : (
              <p className="text-sm text-muted-foreground">No message was included with this enquiry.</p>
            )}
          </Panel>

          <Panel
            title="Contact"
            action={
              enquiry.isRegisteredStudent && enquiry.studentId ? (
                <Link href={`/admin/students/${enquiry.studentId}`} className="text-sm font-medium text-primary hover:underline">
                  View student
                </Link>
              ) : undefined
            }
          >
            <FactList
              items={[
                { label: 'Name', value: enquiry.contactName },
                { label: 'Contact type', value: enquiry.isRegisteredStudent ? 'Registered student' : 'Guest' },
                { label: 'Email', value: enquiry.contactEmail ?? <NotProvided /> },
                { label: 'Phone', value: enquiry.contactPhone ?? <NotProvided /> },
              ]}
            />
          </Panel>

          <Panel
            title="Enquiry"
            action={
              enquiry.targetAdminUrl ? (
                <Link href={enquiry.targetAdminUrl} className="text-sm font-medium text-primary hover:underline">
                  Open record
                </Link>
              ) : undefined
            }
          >
            <FactList
              items={[
                { label: 'About', value: enquiry.targetName ?? 'General guidance' },
                { label: 'Source', value: enquirySourceLabels[enquiry.source] ?? enquiry.sourceLabel },
                { label: 'Subject', value: enquiry.subject ?? 'General counselling request' },
                { label: 'Priority', value: enquiry.priority ? priorityLabels[enquiry.priority] : 'Standard' },
              ]}
            />
          </Panel>

          <Panel title="Activity" bodyClassName={followups.length > 0 ? 'p-0' : undefined}>
            {followups.length > 0 ? (
              <ul className="divide-y divide-border">
                {followups.map((item) => (
                  <li key={item.id} className="px-5 py-3.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <p className="text-sm font-medium text-foreground">
                        {followupLabels[item.type] ?? item.type}
                        <span className="font-normal text-muted-foreground"> by {item.performedBy}</span>
                      </p>
                      <span className="text-[13px] text-muted-foreground tabular-nums">{item.performedAt}</span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.summary}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No follow-up activity yet.</p>
            )}
          </Panel>

          <Panel title="Internal notes" description="Only visible to the admin team.">
            <div className="space-y-4">
              {notes.length > 0 ? (
                <ul className="space-y-3">
                  {notes.map((note) => (
                    <li key={note.id} className="rounded-md border border-border p-3">
                      <div className="flex items-baseline justify-between gap-3 text-[13px]">
                        <span className="font-medium text-foreground">{note.author}</span>
                        <span className="text-muted-foreground tabular-nums">{note.createdAt}</span>
                      </div>
                      <p className="mt-1 text-sm whitespace-pre-wrap text-foreground">{note.content}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
              <Textarea value={noteText} onChange={(event) => setNoteText(event.target.value)} placeholder="Add a note or next step for this enquiry" className="min-h-20" aria-label="New note" />
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-muted-foreground">Saving notes needs the admin API, which is not connected yet.</p>
                <Button size="sm" disabled className="self-end sm:self-auto">
                  Add note
                </Button>
              </div>
            </div>
          </Panel>
        </div>

        <div className="lg:sticky lg:top-[4.5rem] lg:col-span-4">
          <Panel title="Details">
            <FactList
              columns={1}
              items={[
                { label: 'Status', value: <span className="font-normal text-muted-foreground">{leadStatusDescriptions[status]}</span> },
                { label: 'Assigned to', value: enquiry.assignedTo ?? <span className="font-normal text-muted-foreground">Unassigned</span> },
                { label: 'Received', value: enquiry.createdAt },
                { label: 'Last updated', value: enquiry.updatedAt ?? enquiry.createdAt },
                {
                  label: 'Enquiry ID',
                  value: (
                    <button type="button" onClick={copyId} className="inline-flex items-center gap-1.5 rounded font-mono text-[13px] font-normal text-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40">
                      {enquiry.id}
                      {copied ? <Check className="size-3.5 text-success" aria-hidden="true" /> : <Copy className="size-3.5 text-muted-foreground" aria-hidden="true" />}
                      <span className="sr-only">{copied ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  ),
                },
              ]}
            />
            <p className="mt-4 text-[13px] text-muted-foreground">Assigning enquiries to team members will be available once staff accounts are set up.</p>
          </Panel>
        </div>
      </div>
    </div>
  )
}
