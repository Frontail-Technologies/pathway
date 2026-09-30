'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessagesSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DashboardSection } from './dashboard-parts'




 
export type Enquiry = {
  id: string
  entity: { kind: 'college' | 'course' | 'coaching' | 'tutor' | 'counselling'; name: string }
  enquiryType: string
  createdAt: string
  status: string
  nextAction?: string
}

 
export function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  return (
    <li className="rounded-[10px] border p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{enquiry.entity.name}</p>
          <p className="text-xs text-muted-foreground">
            {enquiry.enquiryType} · {enquiry.createdAt}
          </p>
        </div>
        <span className="shrink-0 rounded bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">{enquiry.status}</span>
      </div>
      {enquiry.nextAction && <p className="mt-2 text-xs text-muted-foreground">Next: {enquiry.nextAction}</p>}
    </li>
  )
}


const activeEnquiries: Enquiry[] = []
const pastEnquiries: Enquiry[] = []

const tabs = [
  { id: 'active', label: 'Active', list: activeEnquiries, title: 'No active enquiries yet.', text: 'When you send an enquiry to a college, coaching provider or tutor, it will be tracked here.' },
  { id: 'past', label: 'Past', list: pastEnquiries, title: 'No past enquiries yet.', text: 'Completed or closed enquiries will be kept here for reference.' },
] as const

export function StudentEnquiriesPage() {
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('active')
  const tab = tabs.find((item) => item.id === active)!

  return (
    <div className="w-full">
      <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Counselling &amp; Enquiries</h1>
      <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">Keep track of your counselling requests and enquiries.</p>

      <DashboardSection className="mt-5" title={tab.label}>
        <div role="tablist" aria-label="Enquiry status" className="-mt-1 flex gap-1 border-b">
          {tabs.map((item) => {
            const selected = active === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(item.id)}
                className={`-mb-px cursor-pointer border-b-2 px-3 py-2 text-sm outline-none transition-colors focus-visible:text-primary ${selected ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-muted-foreground hover:text-primary'}`}
              >
                {item.label} ({item.list.length})
              </button>
            )
          })}
        </div>

        {tab.list.length === 0 ? (
          <div className="mt-4 flex items-start gap-3 rounded-[10px] border border-dashed p-4 sm:p-6">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
              <MessagesSquare className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{tab.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tab.text}</p>
              {active === 'active' && (
                <div className="mt-3 grid gap-2 sm:flex sm:flex-wrap">
                  <Button variant="cta" className="h-10 w-full px-4 text-sm font-semibold sm:h-9 sm:w-auto" nativeButton={false} render={<Link href="/colleges" />}>
                    Explore Colleges
                  </Button>
                  <Button variant="outline" className="h-10 w-full px-4 text-sm sm:h-9 sm:w-auto" nativeButton={false} render={<Link href="/coaching" />}>
                    Browse Coaching
                  </Button>
                  <Button variant="outline" className="h-10 w-full px-4 text-sm sm:h-9 sm:w-auto" nativeButton={false} render={<Link href="/tutors" />}>
                    Browse Tutors
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
      </DashboardSection>
    </div>
  )
}
