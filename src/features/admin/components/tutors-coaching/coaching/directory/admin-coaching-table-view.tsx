'use client'

import { useState, useMemo } from 'react'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'
import type { LearningMode } from '@/features/coaching/data/coaching'
import { coachingColumns } from './coaching-table-columns'
import { CoachingFilters, type CoachingFilterValues } from './coaching-filters'
import { CoachingMobileCard } from './coaching-mobile-card'

const defaultFilters: CoachingFilterValues = {
  search: '',
  providerType: 'All',
  mode: 'All',
  exam: 'All',
  quality: 'All',
  detailStatus: 'All',
  location: '',
}

export function AdminCoachingTableView({ providers }: { providers: AdminCoachingProvider[] }) {
  const [filters, setFilters] = useState<CoachingFilterValues>(defaultFilters)

  const handleFilterChange = (key: keyof CoachingFilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setFilters(defaultFilters)
  }

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const matchName = provider.name.toLowerCase().includes(q)
        const matchLocation = provider.location.toLowerCase().includes(q)
        const matchState = provider.state?.toLowerCase().includes(q) ?? false
        const matchExam = provider.exams.some((e) => e.toLowerCase().includes(q))
        const matchSubject = provider.subjects.some((s) => s.toLowerCase().includes(q))
        if (!matchName && !matchLocation && !matchState && !matchExam && !matchSubject) {
          return false
        }
      }

      if (filters.location) {
        const loc = filters.location.toLowerCase()
        const matchLoc = provider.location.toLowerCase().includes(loc)
        const matchSt = provider.state?.toLowerCase().includes(loc) ?? false
        if (!matchLoc && !matchSt) return false
      }

      if (filters.providerType !== 'All') {
        if (provider.providerType !== filters.providerType) return false
      }

      if (filters.mode !== 'All') {
        if (!provider.modes.includes(filters.mode as LearningMode)) return false
      }

      if (filters.exam !== 'All') {
        if (!provider.exams.includes(filters.exam)) return false
      }

      if (filters.quality !== 'All') {
        if (provider.quality.status !== filters.quality) return false
      }

      if (filters.detailStatus !== 'All') {
        if (filters.detailStatus === 'Has Detail Page' && !provider.hasDetailPage) return false
        if (filters.detailStatus === 'Listing Only' && provider.hasDetailPage) return false
      }

      return true
    })
  }, [providers, filters])

  return (
    <div className="w-full min-w-0 bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
      <CoachingFilters
        values={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
        totalCount={providers.length}
        filteredCount={filteredProviders.length}
      />

      <div className="hidden md:block w-full min-w-0">
        <AdminDataTable
          columns={coachingColumns}
          data={filteredProviders}
          pageSize={10}
        />
      </div>

      <div className="md:hidden space-y-3">
        {filteredProviders.map((provider) => (
          <CoachingMobileCard key={provider.id} provider={provider} />
        ))}
        {filteredProviders.length === 0 && (
          <div className="text-center py-10 bg-muted/20 border border-dashed border-border rounded-xl text-xs text-muted-foreground">
            No coaching providers match the selected filters.
          </div>
        )}
      </div>
    </div>
  )
}
