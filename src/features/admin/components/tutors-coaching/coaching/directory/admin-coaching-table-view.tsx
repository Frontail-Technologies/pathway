'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import type { LearningMode } from '@/features/coaching/data/coaching'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../../admin-data-table'
import { AdminFilterSelect, AdminToolbar } from '../../../kit'
import { COACHING_EXAM_OPTIONS, COACHING_MODE_OPTIONS, COACHING_PROVIDER_TYPES, PUBLIC_PAGE_FILTER_OPTIONS, sentenceCase, toOptions } from '../../shared/tutor-coaching-constants'
import { QUALITY_FILTER_OPTIONS } from '../../shared/tutor-status-badge'
import { coachingColumns } from './coaching-table-columns'
import { CoachingMobileCard } from './coaching-mobile-card'

const DEFAULT_FILTERS = { q: '', type: 'all', mode: 'all', exam: 'all', location: 'all', quality: 'all', page: 'all' }

const TYPE_OPTIONS = COACHING_PROVIDER_TYPES.map((value) => ({ value, label: sentenceCase(value) }))

export function AdminCoachingTableView({ providers }: { providers: AdminCoachingProvider[] }) {
  const router = useRouter()
  const { values: f, set, active } = useUrlFilters(DEFAULT_FILTERS)
  // Reset only this list's filters so ?tab=coaching stays (the hook's own reset clears the whole query).
  const reset = () => set(DEFAULT_FILTERS)
  const locationOptions = useMemo(() => toOptions([...new Set(providers.map((provider) => provider.location))].sort()), [providers])

  const filtered = useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return providers.filter((provider) => {
      if (query && ![provider.name, provider.location, provider.state ?? '', ...provider.exams, ...provider.subjects].some((value) => value.toLowerCase().includes(query))) return false
      if (f.type !== 'all' && provider.providerType !== f.type) return false
      if (f.mode !== 'all' && !provider.modes.includes(f.mode as LearningMode)) return false
      if (f.exam !== 'all' && !provider.exams.includes(f.exam)) return false
      if (f.location !== 'all' && provider.location !== f.location) return false
      if (f.quality !== 'all' && provider.quality.status !== f.quality) return false
      if (f.page === 'live' && !provider.hasDetailPage) return false
      if (f.page === 'none' && provider.hasDetailPage) return false
      return true
    })
  }, [providers, f])

  return (
    <div className="space-y-4">
      <AdminToolbar
        search={f.q}
        onSearchChange={(q) => set({ q })}
        searchPlaceholder="Search name, city, exam or subject"
        hasActiveFilters={active}
        onReset={reset}
        summary={active ? `${filtered.length} of ${providers.length} match` : undefined}
      >
        <AdminFilterSelect label="Type" value={f.type} onChange={(type) => set({ type })} options={TYPE_OPTIONS} />
        <AdminFilterSelect label="Exam" value={f.exam} onChange={(exam) => set({ exam })} options={toOptions(COACHING_EXAM_OPTIONS)} />
        <AdminFilterSelect label="Mode" value={f.mode} onChange={(mode) => set({ mode })} options={toOptions(COACHING_MODE_OPTIONS)} />
        <AdminFilterSelect label="Location" value={f.location} onChange={(location) => set({ location })} options={locationOptions} />
        <AdminFilterSelect label="Status" value={f.quality} onChange={(quality) => set({ quality })} options={QUALITY_FILTER_OPTIONS} />
        <AdminFilterSelect label="Public page" value={f.page} onChange={(page) => set({ page })} options={PUBLIC_PAGE_FILTER_OPTIONS} />
      </AdminToolbar>

      <AdminDataTable
        columns={coachingColumns}
        data={filtered}
        onRowClick={(provider) => router.push(`/admin/tutors-coaching/coaching/${provider.id}`)}
        getRowAriaLabel={(provider) => `Open ${provider.name}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No coaching providers match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => <CoachingMobileCard provider={row.original} />}
      />
    </div>
  )
}
