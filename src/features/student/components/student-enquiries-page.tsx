'use client'

import { Illustration } from '@/components/shared/illustration'
import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useRoleSession } from '@/features/auth/state/auth-session-provider'
import { formatDate } from '@/features/catalog/format'
import { listOwnEnquiries, type OwnEnquiry } from '@/features/enquiries/api/enquiries-api'
import { leadStatusMap } from '@/features/enquiries/types/enquiry'
import { queryKeys } from '@/lib/query-client'
import { SpotArt } from '@/components/shared/spot-art'
import { cn } from '@/lib/utils'
import { StudentPageHeader } from './dashboard-parts'

export type Enquiry = {
  id: string
  entity: { name: string; href?: string }
  enquiryType: string
  createdAt: string
  status: string
  nextAction?: string
}

const intentLabels: Record<OwnEnquiry['intent'], string> = { enquiry: 'Enquiry', brochure: 'Brochure request', counselling: 'Counselling call-back' }
const entityPaths: Record<string, string> = { college: '/college', course: '/course', exam: '/exam', scholarship: '/scholarship', coaching: '/coaching', tutor: '/tutor' }
const nextActions: Partial<Record<OwnEnquiry['status'], string>> = { new: 'Our team will contact you shortly.', contacted: 'A counsellor has been in touch.', qualified: 'Your counsellor is shortlisting options with you.' }

function toCard(item: OwnEnquiry): Enquiry {
  const fallback = item.source === 'contact' ? 'Message to Pathway' : item.intent === 'counselling' ? 'Free counselling' : 'General enquiry'
  return {
    id: item.id,
    entity: { name: item.entity?.name ?? (item.topic ? `${fallback}: ${item.topic}` : fallback), href: item.entity ? `${entityPaths[item.entity.kind]}/${item.entity.slug}` : undefined },
    enquiryType: [intentLabels[item.intent], item.interest].filter(Boolean).join(' · '),
    createdAt: formatDate(item.createdAt),
    status: leadStatusMap[item.status].label,
    nextAction: nextActions[item.status],
  }
}

export function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  return (
    <li className="rounded-xl border p-4">
      <div className="flex items-start gap-3">
        <SpotArt name={enquiry.enquiryType.startsWith('Counselling') ? 'guide' : enquiry.enquiryType.startsWith('Brochure') ? 'notes' : 'college'} className="size-11 rounded-lg" />
        <div className="min-w-0 flex-1">
          {enquiry.entity.href ? (
            <Link href={enquiry.entity.href} className="block truncate text-sm font-semibold text-foreground hover:text-primary">
              {enquiry.entity.name}
            </Link>
          ) : (
            <p className="truncate text-sm font-semibold text-foreground">{enquiry.entity.name}</p>
          )}
          <p className="text-xs text-muted-foreground">
            {enquiry.enquiryType} · {enquiry.createdAt}
          </p>
        </div>
        <span className="shrink-0 rounded bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{enquiry.status}</span>
      </div>
      {enquiry.nextAction && <p className="mt-3 rounded-lg bg-muted/50 px-3 py-2 text-xs text-muted-foreground">Next: {enquiry.nextAction}</p>}
    </li>
  )
}


const tabCopy = [
  { id: 'active', label: 'Active', title: 'No active enquiries yet.', text: 'When you send an enquiry to a college, coaching provider or tutor, it will be tracked here.' },
  { id: 'past', label: 'Past', title: 'No past enquiries yet.', text: 'Completed or closed enquiries will be kept here for reference.' },
] as const

const isPast = (item: OwnEnquiry) => item.status === 'converted' || item.status === 'closed'

export function StudentEnquiriesPage() {
  const { user } = useRoleSession('student')
  const query = useQuery({ queryKey: queryKeys.studentEnquiries(user?.id ?? 'none'), queryFn: listOwnEnquiries, enabled: Boolean(user) })
  const items = query.data ?? []
  const tabs = tabCopy.map((copy) => ({ ...copy, list: items.filter((item) => (copy.id === 'past' ? isPast(item) : !isPast(item))).map(toCard) }))
  const [active, setActive] = useState<(typeof tabCopy)[number]['id']>('active')
  const tab = tabs.find((item) => item.id === active)!

  return (
    <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-5">
      <StudentPageHeader
        title="Enquiries"
        subtitle="Counselling requests and messages to colleges, coaching and tutors"
        action={
          <Button variant="cta" className="h-10 px-4 text-sm font-semibold" nativeButton={false} render={<Link href="/counselling" />}>
            Get free counselling
          </Button>
        }
      />

      <section className="rounded-xl border bg-card p-4 sm:p-5">
        <div role="tablist" aria-label="Enquiry status" className="flex gap-2">
          {tabs.map((item) => {
            const selected = active === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(item.id)}
                className={cn('h-9 cursor-pointer rounded-full border px-4 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40', selected ? 'border-primary bg-primary text-primary-foreground' : 'bg-card text-foreground hover:border-primary/50')}
              >
                {item.label} ({item.list.length})
              </button>
            )
          })}
        </div>

        {query.isPending && user ? (
          <p className="mt-4 text-sm text-muted-foreground" role="status">
            Loading your enquiries…
          </p>
        ) : query.isError ? (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[10px] border p-4">
            <p className="text-sm text-muted-foreground">Your enquiries couldn&apos;t load. Check your connection and try again.</p>
            <Button variant="outline" className="h-9 px-4 text-sm" onClick={() => void query.refetch()}>
              Try again
            </Button>
          </div>
        ) : tab.list.length === 0 ? (
          <div className="mt-4 flex flex-col items-center gap-2 rounded-xl bg-muted/40 p-6 text-center">
            <Illustration name="inboxEmpty" width={180} />
            <div className="min-w-0">
              <p className="font-heading text-base font-bold text-foreground">{tab.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tab.text}</p>
              {active === 'active' && (
                <div className="mt-3 grid gap-2 sm:flex sm:flex-wrap sm:justify-center">
                  <Button variant="cta" className="h-10 w-full px-4 text-sm font-semibold sm:h-9 sm:w-auto" nativeButton={false} render={<Link href="/colleges" />}>
                    Explore colleges
                  </Button>
                  <Button variant="outline" className="h-10 w-full px-4 text-sm sm:h-9 sm:w-auto" nativeButton={false} render={<Link href="/coaching" />}>
                    Browse coaching
                  </Button>
                  <Button variant="outline" className="h-10 w-full px-4 text-sm sm:h-9 sm:w-auto" nativeButton={false} render={<Link href="/tutors" />}>
                    Browse tutors
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <ul className="mt-3 flex flex-col gap-2.5">
            {tab.list.map((enquiry) => (
              <EnquiryCard key={enquiry.id} enquiry={enquiry} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
