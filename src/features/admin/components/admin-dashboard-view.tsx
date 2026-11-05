'use client'

import Link from 'next/link'
import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getAdminCoachingProviders } from '../data/admin-coaching'
import { useAdminEnquiries } from '../hooks/use-admin-enquiries'
import { getAdminInstitutions } from '../data/admin-institutions'
import { getAdminPrograms } from '../data/admin-programs'
import { getAdminScholarships } from '../data/admin-scholarships'
import { getContentCompleteness, getNeedsAttentionTasks } from '../data/admin-stats'
import { getAdminTutors } from '../data/admin-tutors'
import { AdminPageHeader, CompletenessMeter, Panel, StatGrid, StatTile, StatusBadge } from './kit'

const attentionHref: Record<string, string> = {
  'incomplete-college-profiles': '/admin/institutions',
  'incomplete-course-curriculum': '/admin/programs',
  'tutor-portrait-assets': '/admin/tutors-coaching',
  'enquiry-crm-pipeline': '/admin/enquiries',
}

const completenessHref: Record<string, string> = {
  institutions: '/admin/institutions',
  courses: '/admin/programs',
  scholarships: '/admin/scholarships',
  tutors: '/admin/tutors-coaching',
  coaching: '/admin/tutors-coaching',
  exams: '/admin/exams',
}

const newRecords = [
  { label: 'Institution', href: '/admin/institutions/new' },
  { label: 'Course', href: '/admin/programs/new' },
  { label: 'Exam', href: '/admin/exams/new' },
  { label: 'Scholarship', href: '/admin/scholarships/new' },
  { label: 'Tutor', href: '/admin/tutors-coaching/tutors/new' },
  { label: 'Coaching provider', href: '/admin/tutors-coaching/coaching/new' },
  { label: 'Article', href: '/admin/content/new' },
]

export function AdminDashboardView() {
  const institutions = getAdminInstitutions()
  const programs = getAdminPrograms()
  const scholarships = getAdminScholarships()
  const tutors = getAdminTutors()
  const coaching = getAdminCoachingProviders()
  const enquiriesQuery = useAdminEnquiries()
  const enquiries = enquiriesQuery.data ?? []
  const completeness = getContentCompleteness()
  const tasks = getNeedsAttentionTasks()
  const incomplete = (list: { completeness?: unknown }[]) =>
    list.filter((item) => {
      const value = typeof item.completeness === 'number' ? item.completeness : (item.completeness as { percentage?: number } | undefined)?.percentage
      return typeof value === 'number' && value < 100
    }).length

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Catalogue health and what needs your attention."
        actions={
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button size="sm" className="gap-1.5" />}>
              <Plus className="size-4" aria-hidden="true" />
              New
              <ChevronDown className="size-3.5 opacity-80" aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {newRecords.map((record) => (
                <DropdownMenuItem key={record.href} render={<Link href={record.href} />}>
                  {record.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      <StatGrid>
        <StatTile label="Institutions" value={institutions.length} hint={`${incomplete(institutions)} incomplete`} href="/admin/institutions" />
        <StatTile label="Courses" value={programs.length} hint={`${incomplete(programs)} incomplete`} href="/admin/programs" />
        <StatTile label="Scholarships" value={scholarships.length} hint="Open, upcoming and closed" href="/admin/scholarships" />
        <StatTile label="Tutors & coaching" value={tutors.length + coaching.length} hint={`${tutors.length} tutors · ${coaching.length} providers`} href="/admin/tutors-coaching" />
      </StatGrid>

      <div className="grid gap-6 lg:grid-cols-12">
        <Panel title="Needs attention" className="lg:col-span-7" bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {tasks.map((task) => (
              <li key={task.id}>
                <Link href={attentionHref[task.id] ?? '/admin'} className="group flex items-start gap-3 px-5 py-3.5 outline-none hover:bg-muted/40 focus-visible:bg-muted/60">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{task.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-[13px] text-muted-foreground">{task.description}</p>
                  </div>
                  <StatusBadge tone={task.severity === 'warning' ? 'warning' : task.severity === 'info' ? 'info' : 'neutral'} className="mt-0.5">
                    {task.badgeText}
                  </StatusBadge>
                  <ChevronRight className="mt-0.5 size-4 shrink-0 text-muted-foreground group-hover:text-foreground" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Detail pages" description={`${completeness.overallCompleted} of ${completeness.overallTotal} records have a full public page`} className="lg:col-span-5">
          <ul className="space-y-3.5">
            {completeness.items.map((item) => (
              <li key={item.id}>
                <Link href={completenessHref[item.id] ?? '/admin'} className="block rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
                  <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-foreground">{item.label}</span>
                    <span className="text-[13px] text-muted-foreground tabular-nums">
                      {item.completedCount} / {item.totalCount}
                    </span>
                  </div>
                  <CompletenessMeter value={item.percentage} />
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel
        title="Enquiries"
        action={
          <Link href="/admin/enquiries" className="text-sm font-medium text-primary hover:underline">
            Open enquiries
          </Link>
        }
      >
        {enquiriesQuery.isError ? (
          <p className="text-sm text-muted-foreground">Enquiries couldn&apos;t load right now.</p>
        ) : !enquiriesQuery.data ? (
          <p className="text-sm text-muted-foreground">Loading enquiries…</p>
        ) : enquiries.length === 0 ? (
          <p className="text-sm text-muted-foreground">No enquiries yet. Student enquiries, brochure requests and counselling call-backs from the website and app will appear here as they arrive.</p>
        ) : (
          <ul className="divide-y divide-border">
            {enquiries.slice(0, 5).map((enquiry) => (
              <li key={enquiry.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                <Link href={`/admin/enquiries/${enquiry.id}`} className="truncate font-medium text-foreground hover:underline">
                  {enquiry.contactName}
                  {enquiry.targetName ? <span className="font-normal text-muted-foreground"> · {enquiry.targetName}</span> : null}
                </Link>
                <StatusBadge tone={enquiry.status === 'new' ? 'info' : 'neutral'}>{enquiry.statusLabel}</StatusBadge>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  )
}
