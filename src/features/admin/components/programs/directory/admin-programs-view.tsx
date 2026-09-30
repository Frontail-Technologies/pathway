'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  getAdminPrograms,
  getAdminProgramFilterOptions,
} from '@/features/admin/data/admin-programs'
import type { AdminProgram } from '@/features/admin/types/programs'
import { AdminDataTable } from '../../admin-data-table'
import { programTableColumns } from './program-table-columns'
import { ProgramMobileCard } from './program-mobile-card'
import { ProgramFilters } from './program-filters'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, BookOpen } from 'lucide-react'

export function AdminProgramsView() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialInstitution = searchParams.get('institution') || 'all'

  const [data] = React.useState<AdminProgram[]>(() => getAdminPrograms())
  const filterOptions = React.useMemo(() => getAdminProgramFilterOptions(), [])

  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedLevel, setSelectedLevel] = React.useState<string>('all')
  const [selectedStream, setSelectedStream] = React.useState<string>('all')
  const [selectedDuration, setSelectedDuration] = React.useState<string>('all')
  const [selectedQuality, setSelectedQuality] = React.useState<string>('all')
  const [selectedInstitution, setSelectedInstitution] = React.useState<string>(initialInstitution)
  const [selectedDetailPage, setSelectedDetailPage] = React.useState<string>('all')

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedLevel !== 'all' ||
    selectedStream !== 'all' ||
    selectedDuration !== 'all' ||
    selectedQuality !== 'all' ||
    selectedInstitution !== 'all' ||
    selectedDetailPage !== 'all'

  function resetFilters() {
    setSearchQuery('')
    setSelectedLevel('all')
    setSelectedStream('all')
    setSelectedDuration('all')
    setSelectedQuality('all')
    setSelectedInstitution('all')
    setSelectedDetailPage('all')
  }

  const filteredData = React.useMemo(() => {
    return data.filter((item) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(query)
        const matchesDegree = item.degree.toLowerCase().includes(query)
        const matchesStream = item.stream.toLowerCase().includes(query)
        const matchesSpec = item.specialization?.toLowerCase().includes(query)
        if (!matchesName && !matchesDegree && !matchesStream && !matchesSpec) {
          return false
        }
      }

      if (selectedLevel !== 'all' && item.level !== selectedLevel) {
        return false
      }

      if (selectedStream !== 'all' && item.stream !== selectedStream) {
        return false
      }

      if (selectedDuration !== 'all' && item.duration !== selectedDuration) {
        return false
      }

      if (selectedQuality !== 'all' && item.qualityStatus !== selectedQuality) {
        return false
      }

      if (selectedInstitution !== 'all') {
        const offers = item.offerings.some(
          (o) => o.id === selectedInstitution || o.slug === selectedInstitution
        )
        if (!offers) return false
      }

      if (selectedDetailPage === 'live' && !item.hasDetailPage) {
        return false
      }
      if (selectedDetailPage === 'not_available' && item.hasDetailPage) {
        return false
      }

      return true
    })
  }, [
    data,
    searchQuery,
    selectedLevel,
    selectedStream,
    selectedDuration,
    selectedQuality,
    selectedInstitution,
    selectedDetailPage,
  ])

  const levelOptions = React.useMemo(
    () => [{ value: 'all', label: 'All Levels' }, ...filterOptions.levels.map((l) => ({ value: l, label: l }))],
    [filterOptions.levels]
  )
  const streamOptions = React.useMemo(
    () => [{ value: 'all', label: 'All Streams' }, ...filterOptions.streams.map((s) => ({ value: s, label: s }))],
    [filterOptions.streams]
  )
  const durationOptions = React.useMemo(
    () => [{ value: 'all', label: 'All Durations' }, ...filterOptions.durations.map((d) => ({ value: d, label: d }))],
    [filterOptions.durations]
  )
  const qualityOptions = React.useMemo(
    () => filterOptions.qualityStatuses,
    [filterOptions.qualityStatuses]
  )
  const detailPageOptions = React.useMemo(
    () => [
      { value: 'all', label: 'All Pages' },
      { value: 'live', label: 'Live Only' },
      { value: 'not_available', label: 'Not Available' },
    ],
    []
  )

  const selectedInstitutionName = React.useMemo(() => {
    return filterOptions.institutions.find(
      (i) => i.id === selectedInstitution || i.slug === selectedInstitution
    )?.name
  }, [filterOptions.institutions, selectedInstitution])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold font-heading text-foreground">
            Programs & Courses Directory
          </h1>
          <Badge variant="info" size="sm">
            {filteredData.length} records
          </Badge>
        </div>

        <Link
          href="/admin/programs/new"
          className={buttonVariants({
            size: 'sm',
            className: 'text-xs font-semibold gap-1.5 shadow-xs w-full sm:w-auto inline-flex',
          })}
        >
          <Plus className="w-4 h-4" />
          Add Program
        </Link>
      </div>

      <ProgramFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        levelOptions={levelOptions}
        selectedStream={selectedStream}
        onStreamChange={setSelectedStream}
        streamOptions={streamOptions}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        durationOptions={durationOptions}
        selectedQuality={selectedQuality}
        onQualityChange={setSelectedQuality}
        qualityOptions={qualityOptions}
        selectedDetailPage={selectedDetailPage}
        onDetailPageChange={setSelectedDetailPage}
        detailPageOptions={detailPageOptions}
        selectedInstitution={selectedInstitution}
        onInstitutionReset={() => setSelectedInstitution('all')}
        institutionName={selectedInstitutionName}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={resetFilters}
      />

      <AdminDataTable
        columns={programTableColumns}
        data={filteredData}
        mobileCardRender={({ original }) => <ProgramMobileCard program={original} />}
        pageSize={10}
        emptyTitle="No academic programs match these filters"
        emptyDescription="Try adjusting your stream, study level, or search query to find programs."
        onResetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        onRowClick={(program) => router.push(`/admin/programs/${program.id}`)}
        getRowAriaLabel={(program) => `View details for ${program.name}`}
      />
    </div>
  )
}
