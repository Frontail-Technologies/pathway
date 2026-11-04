'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { catalogList } from '@/services/api/catalog'
import { toCollegeListItem, type InstitutionListDto } from '@/features/colleges/api/colleges-api'
import { toCoachingListItem, type CoachingListDto } from '@/features/coaching/api/coaching-api'
import { toCourseListItem, type ProgramListDto } from '@/features/courses/api/courses-api'
import { toScholarshipListItem, type ScholarshipListDto } from '@/features/scholarships/api/scholarships-api'
import { toTutor, type TutorListDto } from '@/features/tutors/api/tutors-api'
import type { Tutor } from '@/features/tutors/data/tutors'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import { savedKinds, useSavedItems, type SavedKind } from '@/features/saved/saved-items-provider'
import { initialsOf } from '../data/student'
import { DashboardSection } from './dashboard-parts'

type Row = { id: string; name: string; meta: string; initials?: string; portraitFor?: Tutor; href?: string }

const tabs: Record<SavedKind, { label: string; singular: string; emptyTitle: string; cta: string; ctaHref: string }> = {
  college: { label: 'Colleges', singular: 'college', emptyTitle: 'No saved colleges yet.', cta: 'Explore Colleges', ctaHref: '/colleges' },
  course: { label: 'Courses', singular: 'course', emptyTitle: 'No saved courses yet.', cta: 'Explore Courses', ctaHref: '/courses' },
  scholarship: { label: 'Scholarships', singular: 'scholarship', emptyTitle: 'No saved scholarships yet.', cta: 'Explore Scholarships', ctaHref: '/scholarships' },
  coaching: { label: 'Coaching', singular: 'coaching provider', emptyTitle: 'No saved coaching providers yet.', cta: 'Browse Coaching', ctaHref: '/coaching' },
  tutor: { label: 'Tutors', singular: 'tutor', emptyTitle: 'No saved tutors yet.', cta: 'Browse Tutors', ctaHref: '/tutors' },
}

async function resolve(kind: SavedKind, ids: string[]): Promise<Row[]> {
  if (ids.length === 0) return []
  const query = { slugs: ids.slice(0, 100).join(','), limit: '100' }
  let rows: Row[]
  if (kind === 'college') {
    const list = await catalogList('/institutions', query, (dto: InstitutionListDto) => toCollegeListItem(dto))
    rows = list.items.map((item) => ({ id: item.slug, name: item.name, meta: `${item.city} · ${item.type}`, initials: initialsOf(item.name), href: item.hasDetailPage ? `/college/${item.slug}` : undefined }))
  } else if (kind === 'course') {
    const list = await catalogList('/programs', query, (dto: ProgramListDto) => toCourseListItem(dto))
    rows = list.items.map((item) => ({ id: item.slug, name: item.name, meta: `${item.level} · ${item.duration}`, initials: item.degree.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase(), href: item.hasDetailPage ? `/course/${item.slug}` : undefined }))
  } else if (kind === 'scholarship') {
    const list = await catalogList('/scholarships', query, (dto: ScholarshipListDto) => toScholarshipListItem(dto))
    rows = list.items.map((item) => ({ id: item.slug, name: item.name, meta: item.provider, initials: item.providerInitials, href: item.hasDetailPage ? `/scholarship/${item.slug}` : undefined }))
  } else if (kind === 'coaching') {
    const list = await catalogList('/coaching', query, (dto: CoachingListDto) => toCoachingListItem(dto))
    rows = list.items.map((item) => ({ id: item.slug, name: item.name, meta: `${item.providerType} · ${item.location}`, initials: initialsOf(item.name), href: item.hasDetailPage ? `/coaching/${item.slug}` : undefined }))
  } else {
    const list = await catalogList('/tutors', query, (dto: TutorListDto) => toTutor(dto))
    rows = list.items.map((item) => ({ id: item.slug, name: item.name, meta: item.headline, portraitFor: item, href: `/tutor/${item.slug}` }))
  }
  const byId = new Map(rows.map((row) => [row.id, row]))
  return ids.flatMap((id) => byId.get(id) ?? [])
}

function useResolvedSaved(kind: SavedKind, ids: string[], ready: boolean) {
  const query = useQuery({ queryKey: queryKeys.savedResolve(kind, ids), queryFn: () => resolve(kind, ids),
    enabled: ready,
    placeholderData: (previous, previousQuery) => (previousQuery?.queryKey[2] === kind ? previous?.filter((row) => ids.includes(row.id)) : undefined),
  })
  return {
    status: query.isError ? ('error' as const) : query.isPending ? ('loading' as const) : ('ready' as const),
    rows: query.data ?? [],
    retry: () => void query.refetch(),
  }
}

export function StudentSavedPage() {
  const { saved, remove, hydrated } = useSavedItems()
  const [active, setActive] = useState<SavedKind>('college')
  const resolved = useResolvedSaved(active, saved[active], hydrated)
  const rows = resolved.rows
  const unavailable = resolved.status === 'ready' ? saved[active].length - rows.length : 0
  const tab = tabs[active]

  return (
    <div className="w-full">
      <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-3xl">Saved Items</h1>
      <p className="mt-1 text-sm text-muted-foreground sm:text-[15px]">Colleges, courses, scholarships, coaching and tutors you have saved.</p>

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

        {hydrated && saved[active].length > 0 && resolved.status === 'loading' ? (
          <p role="status" className="mt-4 text-sm text-muted-foreground">Loading saved {tab.label.toLowerCase()}…</p>
        ) : resolved.status === 'error' ? (
          <div role="alert" className="mt-4 flex flex-wrap items-center gap-3 rounded-[10px] border border-destructive/30 bg-destructive/5 p-4">
            <p className="text-sm text-foreground">Your saved {tab.label.toLowerCase()} couldn&apos;t be loaded.</p>
            <Button variant="outline" className="h-8 px-3 text-xs" onClick={resolved.retry}>
              Try again
            </Button>
          </div>
        ) : rows.length === 0 && unavailable === 0 ? (
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
        {unavailable > 0 ? (
          <div className="mt-3 flex flex-wrap items-center gap-3 rounded-[10px] border border-dashed p-3">
            <p className="text-xs text-muted-foreground">
              {unavailable} saved {unavailable === 1 ? tab.singular + ' is' : tab.label.toLowerCase() + ' are'} no longer listed on Pathway.
            </p>
            <Button
              variant="ghost"
              className="h-7 px-2 text-xs"
              onClick={() => {
                const shown = new Set(rows.map((row) => row.id))
                saved[active].filter((id) => !shown.has(id)).forEach((id) => remove(active, id))
              }}
            >
              Remove them
            </Button>
          </div>
        ) : null}
      </DashboardSection>
    </div>
  )
}
