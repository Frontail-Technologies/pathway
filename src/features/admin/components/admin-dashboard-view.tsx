'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { Award, BookOpen, ChevronRight, FileText, GraduationCap, Inbox, ShieldCheck } from 'lucide-react'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { listTutorAccounts } from '@/features/admin/data/admin-tutor-accounts'
import { queryKeys } from '@/lib/query-client'
import { useAdminEnquiries } from '../hooks/use-admin-enquiries'
import { getAdminInstitutions } from '../data/admin-institutions'
import { getAdminPrograms } from '../data/admin-programs'
import { getContentCompleteness, getNeedsAttentionTasks } from '../data/admin-stats'
import { formatRelative } from './demo/relative-time'
import { CoverageDonut, EnquiriesTrendChart, weekOverWeek } from './dashboard/dashboard-charts'
import { leadStatusTones } from './enquiries/shared/enquiry-constants'
import { AdminPageHeader, Monogram, Panel, ProgressList, QuickActionTiles, StatGrid, StatTile, StatusBadge, WorkList, type StatusTone } from './kit'

const attentionHref: Record<string, string> = {
  'incomplete-college-profiles': '/admin/institutions?quality=incomplete',
  'incomplete-course-curriculum': '/admin/programs',
  'tutor-portrait-assets': '/admin/tutors-coaching',
}

const completenessHref: Record<string, string> = {
  institutions: '/admin/institutions',
  courses: '/admin/programs',
  scholarships: '/admin/scholarships',
  tutors: '/admin/tutors-coaching',
  coaching: '/admin/tutors-coaching?tab=coaching',
  exams: '/admin/exams',
}

const quickActions = [
  { id: 'institution', label: 'Add institution', subtitle: 'College or university', icon: GraduationCap, href: '/admin/institutions/new' },
  { id: 'course', label: 'Add course', subtitle: 'Degree or programme', icon: BookOpen, tone: 'success' as StatusTone, href: '/admin/programs/new' },
  { id: 'scholarship', label: 'Add scholarship', subtitle: 'Grant or fee waiver', icon: Award, tone: 'warning' as StatusTone, href: '/admin/scholarships/new' },
  { id: 'article', label: 'Write an article', subtitle: 'Guide or explainer', icon: FileText, tone: 'neutral' as StatusTone, href: '/admin/content/new' },
]

const severityTone: Record<string, StatusTone> = { warning: 'warning', info: 'info', neutral: 'neutral' }

export function AdminDashboardView() {
  const { session, hydrated } = useAdminSession()
  const institutions = getAdminInstitutions()
  const programs = getAdminPrograms()
  const enquiriesQuery = useAdminEnquiries()
  const enquiries = enquiriesQuery.data ?? []
  const reviews = useQuery({ queryKey: queryKeys.adminTutorAccounts('pending_review'), queryFn: () => listTutorAccounts('pending_review'), enabled: hydrated && Boolean(session), staleTime: 60_000 })
  const completeness = getContentCompleteness()
  const tasks = getNeedsAttentionTasks()
  const incomplete = (list: { completeness?: unknown }[]) =>
    list.filter((item) => {
      const value = typeof item.completeness === 'number' ? item.completeness : (item.completeness as { percentage?: number } | undefined)?.percentage
      return typeof value === 'number' && value < 100
    }).length

  const timestamps = enquiries.map((enquiry) => enquiry.createdAt)
  const weekly = weekOverWeek(timestamps)
  const newEnquiries = enquiries.filter((enquiry) => enquiry.status === 'new').length
  const pendingReviews = reviews.data?.length ?? 0
  const firstName = session?.name.split(' ')[0]

  return (
    <div className="space-y-6">
      <AdminPageHeader title={firstName ? `Hello, ${firstName}` : 'Dashboard'} description="Catalogue health, new leads and what needs your attention." />

      <StatGrid>
        <StatTile icon={GraduationCap} label="Institutions" value={institutions.length} hint={`${incomplete(institutions)} incomplete`} href="/admin/institutions" />
        <StatTile icon={BookOpen} tone="success" label="Courses" value={programs.length} hint={`${incomplete(programs)} incomplete`} href="/admin/programs" />
        <StatTile
          icon={Inbox}
          tone="warning"
          label="Enquiries this week"
          value={enquiriesQuery.data ? weekly.thisWeek : '—'}
          trend={enquiriesQuery.data && (weekly.lastWeek > 0 || weekly.thisWeek > 0) ? { value: `${weekly.change >= 0 ? '+' : ''}${weekly.change}%`, up: weekly.change >= 0, label: `vs ${weekly.lastWeek} last week` } : undefined}
          hint={enquiriesQuery.data ? `${newEnquiries} new, waiting for a reply` : 'Loading…'}
          href="/admin/enquiries"
        />
        <StatTile icon={ShieldCheck} tone="neutral" label="Tutor reviews" value={reviews.data ? pendingReviews : '—'} hint={reviews.data ? (pendingReviews ? 'Profiles waiting for approval' : 'Nothing waiting') : 'Loading…'} href="/admin/tutor-accounts" />
      </StatGrid>

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
        <Panel title="Enquiries, last 14 days" description={enquiriesQuery.data ? `${enquiries.length} in total since launch` : undefined} className="lg:col-span-8">
          {enquiriesQuery.isError ? (
            <p className="text-sm text-muted-foreground">Enquiries couldn&apos;t load right now.</p>
          ) : !enquiriesQuery.data ? (
            <div className="h-56 animate-pulse rounded-lg bg-muted" aria-label="Loading" />
          ) : (
            <EnquiriesTrendChart timestamps={timestamps} />
          )}
        </Panel>

        <Panel title="Detail pages" description={`${completeness.overallCompleted} of ${completeness.overallTotal} records have a full public page`} className="lg:col-span-4">
          <CoverageDonut
            centerLabel="With a page"
            total={completeness.overallCompleted}
            slices={[
              { id: 'live', label: 'Full public page', value: completeness.overallCompleted },
              { id: 'listing', label: 'Listing only', value: Math.max(0, completeness.overallTotal - completeness.overallCompleted), color: 'var(--muted)' },
            ]}
          />
          <ul className="mt-5 flex flex-col gap-2 text-sm">
            {completeness.items.map((item) => (
              <li key={item.id}>
                <Link href={completenessHref[item.id] ?? '/admin'} className="flex items-center justify-between gap-3 rounded-md outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40">
                  <span className="text-foreground">{item.label}</span>
                  <span className="text-[13px] text-muted-foreground tabular-nums">
                    {item.completedCount} / {item.totalCount}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
        <WorkList
          className="lg:col-span-7"
          title="Needs attention"
          count={tasks.length}
          items={tasks.map((task) => ({
            id: task.id,
            href: attentionHref[task.id] ?? '/admin',
            title: task.title,
            subtitle: task.description,
            meta: (
              <>
                <StatusBadge tone={severityTone[task.severity] ?? 'neutral'}>{task.badgeText}</StatusBadge>
                <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
              </>
            ),
          }))}
          emptyText="Nothing needs attention right now."
        />

        <WorkList
          className="lg:col-span-5"
          title="Recent enquiries"
          count={newEnquiries}
          href="/admin/enquiries"
          items={enquiries.slice(0, 5).map((enquiry) => ({
            id: enquiry.id,
            href: `/admin/enquiries/${enquiry.id}`,
            title: enquiry.contactName,
            subtitle: `${enquiry.targetName ?? 'General counselling'} · ${formatRelative(enquiry.createdAt)}`,
            meta: (
              <span className="flex items-center gap-3">
                <StatusBadge tone={leadStatusTones[enquiry.status]}>{enquiry.statusLabel}</StatusBadge>
                <Monogram name={enquiry.contactName} size="sm" className="rounded-full" />
              </span>
            ),
          }))}
          emptyText={enquiriesQuery.isError ? "Enquiries couldn't load right now." : enquiriesQuery.data ? 'No enquiries yet. Leads from the website and app will appear here as they arrive.' : 'Loading enquiries…'}
        />
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-foreground">Quick actions</h2>
        <QuickActionTiles items={quickActions} />
      </section>

      <Panel title="Catalogue completeness" description="Share of records with every section filled in" bodyClassName="p-(--admin-pad)">
        <ProgressList
          max={100}
          items={completeness.items.map((item) => ({ label: item.label, value: item.percentage, display: `${item.percentage}%`, tone: item.percentage >= 100 ? 'success' : item.percentage >= 40 ? 'info' : 'warning' }))}
        />
      </Panel>

      <p className="text-xs text-muted-foreground">Enquiries and tutor reviews are live. Catalogue counts come from demo data until the admin catalogue screens read the API.</p>
    </div>
  )
}
