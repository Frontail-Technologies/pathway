'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { colleges } from '@/features/colleges/data/colleges'
import { getCollegeDetail } from '@/features/colleges/data/college-detail'
import { coachingProviders, getCoachingDetail } from '@/features/coaching/data/coaching'
import { courses } from '@/features/courses/data/courses'
import { getCourseDetail } from '@/features/courses/data/course-detail'
import { scholarships } from '@/features/scholarships/data/scholarships'
import { getScholarshipDetail } from '@/features/scholarships/data/scholarship-detail'
import { tutors } from '@/features/tutors/data/tutors'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import { savedKinds, useSavedItems, type SavedKind } from '@/features/saved/saved-items-provider'
import { initialsOf } from '../data/student'
import { DashboardSection } from './dashboard-parts'

type Row = { id: string; name: string; meta: string; initials?: string; portraitFor?: (typeof tutors)[number]; href?: string }

const tabs: Record<SavedKind, { label: string; singular: string; emptyTitle: string; cta: string; ctaHref: string }> = {
  college: { label: 'Colleges', singular: 'college', emptyTitle: 'No saved colleges yet.', cta: 'Explore Colleges', ctaHref: '/colleges' },
  course: { label: 'Courses', singular: 'course', emptyTitle: 'No saved courses yet.', cta: 'Explore Courses', ctaHref: '/courses' },
  scholarship: { label: 'Scholarships', singular: 'scholarship', emptyTitle: 'No saved scholarships yet.', cta: 'Explore Scholarships', ctaHref: '/scholarships' },
  coaching: { label: 'Coaching', singular: 'coaching provider', emptyTitle: 'No saved coaching providers yet.', cta: 'Browse Coaching', ctaHref: '/coaching' },
  tutor: { label: 'Tutors', singular: 'tutor', emptyTitle: 'No saved tutors yet.', cta: 'Browse Tutors', ctaHref: '/tutors' },
}

 
function resolve(kind: SavedKind, ids: string[]): Row[] {
  return ids.flatMap((id): Row[] => {
    if (kind === 'college') {
      const item = colleges.find((c) => c.slug === id)
      return item ? [{ id, name: item.name, meta: `${item.city} · ${item.type}`, initials: initialsOf(item.name), href: getCollegeDetail(id) ? `/college/${id}` : undefined }] : []
    }
    if (kind === 'course') {
      const item = courses.find((c) => c.slug === id)
      return item ? [{ id, name: item.name, meta: `${item.level} · ${item.duration}`, initials: item.degree.slice(0, 3).toUpperCase(), href: getCourseDetail(id) ? `/course/${id}` : undefined }] : []
    }
    if (kind === 'scholarship') {
      const item = scholarships.find((s) => s.slug === id)
      return item ? [{ id, name: item.name, meta: item.provider, initials: item.providerInitials, href: getScholarshipDetail(id) ? `/scholarship/${id}` : undefined }] : []
    }
    if (kind === 'coaching') {
      const item = coachingProviders.find((p) => p.slug === id)
      return item ? [{ id, name: item.name, meta: `${item.providerType} · ${item.location}`, initials: initialsOf(item.name), href: getCoachingDetail(id) ? `/coaching/${id}` : undefined }] : []
    }
    const item = tutors.find((t) => t.slug === id)
    return item ? [{ id, name: item.name, meta: item.headline, portraitFor: item, href: item.hasDetailPage ? `/tutor/${id}` : undefined }] : []
  })
}

export function StudentSavedPage() {
  const { saved, remove, hydrated } = useSavedItems()
  const [active, setActive] = useState<SavedKind>('college')
  const rows = resolve(active, saved[active])
  const tab = tabs[active]

  return (
    <div className="w-full">
      <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Saved Items</h1>
      <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">Colleges, courses, scholarships, coaching and tutors you have saved on this device.</p>

      <DashboardSection className="mt-5" title={tab.label}>
        <div role="tablist" aria-label="Saved item types" className="-mt-1 flex gap-1 overflow-x-auto border-b [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {savedKinds.map((kind) => {
            const selected = active === kind
            return (
              <button
                key={kind}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(kind)}
                className={`-mb-px shrink-0 cursor-pointer border-b-2 px-3 py-2 text-sm whitespace-nowrap outline-none transition-colors focus-visible:text-primary ${selected ? 'border-primary font-semibold text-primary' : 'border-transparent font-medium text-muted-foreground hover:text-primary'}`}
              >
                {tabs[kind].label} ({hydrated ? saved[kind].length : 0})
              </button>
            )
          })}
        </div>

        {rows.length === 0 ? (
          <div className="mt-4 flex flex-col items-start gap-3 rounded-[10px] border border-dashed p-5">
            <p className="text-sm font-semibold text-foreground">{tab.emptyTitle}</p>
            <p className="text-sm text-muted-foreground">Use the Save button on any {tab.singular} and it will appear here.</p>
            <Button variant="cta" className="h-9 px-4 text-sm font-semibold" nativeButton={false} render={<Link href={tab.ctaHref} />}>
              {tab.cta}
            </Button>
          </div>
        ) : (
          <ul className="mt-3 grid gap-2.5 md:grid-cols-2 2xl:grid-cols-3">
            {rows.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[10px] border p-3">
                {row.portraitFor ? (
                  <TutorPortrait tutor={row.portraitFor} className="size-11 rounded-full" />
                ) : (
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-[11px] font-bold text-primary">{row.initials}</span>
                )}
                <div className="min-w-0 flex-1 basis-0">
                  <p className="truncate text-sm font-semibold text-foreground">{row.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{row.meta}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1 max-sm:basis-full max-sm:pl-14">
                {row.href ? (
                  <Button variant="outline" className="h-8 shrink-0 px-3 text-xs" nativeButton={false} render={<Link href={row.href} />}>
                    View
                  </Button>
                ) : (
                  <span className="shrink-0 text-[11px] font-medium text-muted-foreground/80">Details soon</span>
                )}
                <Button
                  variant="ghost"
                  className="h-8 shrink-0 px-2.5 text-xs text-muted-foreground"
                  onClick={() => {
                    remove(active, row.id)
                    toast.success(`${row.name} removed from saved items.`)
                  }}
                >
                  Remove
                </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </DashboardSection>
    </div>
  )
}
