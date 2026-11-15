'use client'

import { Illustration } from '@/components/shared/illustration'
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
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { cn } from '@/lib/utils'
import { StudentPageHeader } from './dashboard-parts'

const kindArt: Record<SavedKind, SpotArtName> = { college: 'college', course: 'courses', scholarship: 'scholarship', coaching: 'presentation', tutor: 'tutor' }

type Row = { id: string; name: string; meta: string; initials?: string; portraitFor?: Tutor; href?: string }

const tabs: Record<SavedKind, { label: string; singular: string; emptyTitle: string; cta: string; ctaHref: string }> = {
  college: { label: 'Colleges', singular: 'college', emptyTitle: 'No saved colleges yet.', cta: 'Explore colleges', ctaHref: '/colleges' },
  course: { label: 'Courses', singular: 'course', emptyTitle: 'No saved courses yet.', cta: 'Explore courses', ctaHref: '/courses' },
  scholarship: { label: 'Scholarships', singular: 'scholarship', emptyTitle: 'No saved scholarships yet.', cta: 'Explore scholarships', ctaHref: '/scholarships' },
  coaching: { label: 'Coaching', singular: 'coaching provider', emptyTitle: 'No saved coaching providers yet.', cta: 'Browse coaching', ctaHref: '/coaching' },
  tutor: { label: 'Tutors', singular: 'tutor', emptyTitle: 'No saved tutors yet.', cta: 'Browse tutors', ctaHref: '/tutors' },
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
    <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-5">
      <StudentPageHeader title="Saved items" subtitle="Everything you have shortlisted, in one place" />

      <div role="tablist" aria-label="Saved item types" className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        {savedKinds.map((kind) => {
          const selected = active === kind
          return (
            <button
              key={kind}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(kind)}
              className={cn('flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40', selected ? 'border-primary bg-primary text-primary-foreground' : 'bg-card hover:border-primary/50')}
            >
              <SpotArt name={kindArt[kind]} className={cn('size-10 rounded-lg', selected && 'bg-card')} />
              <span className="min-w-0">
                <span className="block font-heading text-lg leading-tight font-extrabold tabular-nums">{hydrated ? saved[kind].length : 0}</span>
                <span className={cn('block truncate text-xs', selected ? 'text-primary-foreground/85' : 'text-muted-foreground')}>{tabs[kind].label}</span>
              </span>
            </button>
          )
        })}
      </div>

      <section className="rounded-xl border bg-card p-4 sm:p-5">
        <h2 className="font-heading text-lg font-bold text-foreground">{tab.label}</h2>

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
          <div className="mt-4 flex flex-col items-center gap-2 rounded-xl bg-muted/40 p-6 text-center">
            <Illustration name="savedEmpty" width={180} />
            <p className="font-heading text-base font-bold text-foreground">{tab.emptyTitle}</p>
            <p className="text-sm text-muted-foreground">Tap Save on any {tab.singular} and it shows up here.</p>
            <Button variant="cta" className="h-9 px-4 text-sm font-semibold" nativeButton={false} render={<Link href={tab.ctaHref} />}>
              {tab.cta}
            </Button>
          </div>
        ) : (
          <ul className="mt-3 grid gap-2.5 md:grid-cols-2 2xl:grid-cols-3">
            {rows.map((row) => (
              <li key={row.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border p-3 transition-colors hover:border-primary/40">
                {row.portraitFor ? (
                  <TutorPortrait tutor={row.portraitFor} className="size-11 rounded-full" />
                ) : (
                  <SpotArt name={kindArt[active]} className="size-11 rounded-lg" />
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
      </section>
    </div>
  )
}
