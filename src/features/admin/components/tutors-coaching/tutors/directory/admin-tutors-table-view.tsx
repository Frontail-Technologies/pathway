'use client'

import { useState, useMemo } from 'react'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import { tutorColumns } from './tutor-table-columns'
import { TutorFilters, type TutorFilterValues } from './tutor-filters'
import { TutorMobileCard } from './tutor-mobile-card'

const defaultFilters: TutorFilterValues = {
  search: '',
  subject: 'All',
  exam: 'All',
  mode: 'All',
  level: 'All',
  language: 'All',
  portrait: 'All',
  quality: 'All',
  detailStatus: 'All',
}

export function AdminTutorsTableView({ tutors }: { tutors: AdminTutor[] }) {
  const [filters, setFilters] = useState<TutorFilterValues>(defaultFilters)

  const handleFilterChange = (key: keyof TutorFilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setFilters(defaultFilters)
  }

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const matchName = tutor.name.toLowerCase().includes(q)
        const matchSubject = tutor.subjects.some((s) => s.toLowerCase().includes(q))
        const matchExam = tutor.exams.some((e) => e.toLowerCase().includes(q))
        const matchHeadline = tutor.headline.toLowerCase().includes(q)
        if (!matchName && !matchSubject && !matchExam && !matchHeadline) return false
      }

      if (filters.subject !== 'All') {
        if (!tutor.subjects.includes(filters.subject as any)) return false
      }

      if (filters.exam !== 'All') {
        if (!tutor.exams.includes(filters.exam as any)) return false
      }

      if (filters.mode !== 'All') {
        if (!tutor.modes.includes(filters.mode as any)) return false
      }

      if (filters.level !== 'All') {
        if (!tutor.studyLevels.includes(filters.level as any)) return false
      }

      if (filters.language !== 'All') {
        if (!tutor.languages.includes(filters.language as any)) return false
      }

      if (filters.portrait !== 'All') {
        if (filters.portrait === 'Real Portrait' && tutor.portraitStatus !== 'real') return false
        if (filters.portrait === 'Illustration Avatar' && tutor.portraitStatus !== 'illustration') return false
        if (filters.portrait === 'Missing' && tutor.portraitStatus !== 'missing') return false
      }

      if (filters.quality !== 'All') {
        if (tutor.quality.status !== filters.quality) return false
      }

      if (filters.detailStatus !== 'All') {
        if (filters.detailStatus === 'Has Detail Page' && !tutor.hasDetailPage) return false
        if (filters.detailStatus === 'Listing Only' && tutor.hasDetailPage) return false
      }

      return true
    })
  }, [tutors, filters])

  return (
    <div className="w-full min-w-0 bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
      <TutorFilters
        values={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
        totalCount={tutors.length}
        filteredCount={filteredTutors.length}
      />

      <div className="hidden md:block w-full min-w-0">
        <AdminDataTable
          columns={tutorColumns}
          data={filteredTutors}
          pageSize={10}
        />
      </div>

      <div className="md:hidden space-y-3">
        {filteredTutors.map((tutor) => (
          <TutorMobileCard key={tutor.id} tutor={tutor} />
        ))}
        {filteredTutors.length === 0 && (
          <div className="text-center py-10 bg-muted/20 border border-dashed border-border rounded-xl text-xs text-muted-foreground">
            No tutors match the selected filters.
          </div>
        )}
      </div>
    </div>
  )
}
