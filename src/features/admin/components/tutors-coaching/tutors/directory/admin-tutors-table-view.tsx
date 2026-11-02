'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'
import type { TutorExam, TutorLanguage, TutorLevel, TutorMode, TutorSubject } from '@/features/tutors/data/tutors'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { AdminDataTable } from '../../../admin-data-table'
import { AdminFilterSelect, AdminToolbar } from '../../../kit'
import { PUBLIC_PAGE_FILTER_OPTIONS, toOptions, TUTOR_EXAM_OPTIONS, TUTOR_LANGUAGE_OPTIONS, TUTOR_LEVEL_OPTIONS, TUTOR_MODE_OPTIONS, TUTOR_SUBJECT_OPTIONS } from '../../shared/tutor-coaching-constants'
import { portraitLabel, QUALITY_FILTER_OPTIONS } from '../../shared/tutor-status-badge'
import { tutorColumns } from './tutor-table-columns'
import { TutorMobileCard } from './tutor-mobile-card'

const DEFAULT_FILTERS = { q: '', subject: 'all', exam: 'all', mode: 'all', level: 'all', language: 'all', portrait: 'all', quality: 'all', page: 'all' }

const PORTRAIT_OPTIONS = (Object.keys(portraitLabel) as (keyof typeof portraitLabel)[]).map((value) => ({ value, label: portraitLabel[value] }))

export function AdminTutorsTableView({ tutors }: { tutors: AdminTutor[] }) {
  const router = useRouter()
  const { values: f, set, active } = useUrlFilters(DEFAULT_FILTERS)
  // Reset only this list's filters; the hook's own reset would also drop the active tab.
  const reset = () => set(DEFAULT_FILTERS)

  const filtered = useMemo(() => {
    const query = f.q.trim().toLowerCase()
    return tutors.filter((tutor) => {
      if (query && ![tutor.name, tutor.headline, ...tutor.subjects, ...tutor.exams].some((value) => value.toLowerCase().includes(query))) return false
      if (f.subject !== 'all' && !tutor.subjects.includes(f.subject as TutorSubject)) return false
      if (f.exam !== 'all' && !tutor.exams.includes(f.exam as TutorExam)) return false
      if (f.mode !== 'all' && !tutor.modes.includes(f.mode as TutorMode)) return false
      if (f.level !== 'all' && !tutor.studyLevels.includes(f.level as TutorLevel)) return false
      if (f.language !== 'all' && !tutor.languages.includes(f.language as TutorLanguage)) return false
      if (f.portrait !== 'all' && tutor.portraitStatus !== f.portrait) return false
      if (f.quality !== 'all' && tutor.quality.status !== f.quality) return false
      if (f.page === 'live' && !tutor.hasDetailPage) return false
      if (f.page === 'none' && tutor.hasDetailPage) return false
      return true
    })
  }, [tutors, f])

  return (
    <div className="space-y-4">
      <AdminToolbar
        search={f.q}
        onSearchChange={(q) => set({ q })}
        searchPlaceholder="Search name, subject or exam"
        hasActiveFilters={active}
        onReset={reset}
        summary={active ? `${filtered.length} of ${tutors.length} match` : undefined}
      >
        <AdminFilterSelect label="Subject" value={f.subject} onChange={(subject) => set({ subject })} options={toOptions(TUTOR_SUBJECT_OPTIONS)} />
        <AdminFilterSelect label="Exam" value={f.exam} onChange={(exam) => set({ exam })} options={toOptions(TUTOR_EXAM_OPTIONS)} />
        <AdminFilterSelect label="Mode" value={f.mode} onChange={(mode) => set({ mode })} options={toOptions(TUTOR_MODE_OPTIONS)} />
        <AdminFilterSelect label="Level" value={f.level} onChange={(level) => set({ level })} options={toOptions(TUTOR_LEVEL_OPTIONS)} />
        <AdminFilterSelect label="Language" value={f.language} onChange={(language) => set({ language })} options={toOptions(TUTOR_LANGUAGE_OPTIONS)} />
        <AdminFilterSelect label="Portrait" value={f.portrait} onChange={(portrait) => set({ portrait })} options={PORTRAIT_OPTIONS} />
        <AdminFilterSelect label="Status" value={f.quality} onChange={(quality) => set({ quality })} options={QUALITY_FILTER_OPTIONS} />
        <AdminFilterSelect label="Public page" value={f.page} onChange={(page) => set({ page })} options={PUBLIC_PAGE_FILTER_OPTIONS} />
      </AdminToolbar>

      <AdminDataTable
        columns={tutorColumns}
        data={filtered}
        onRowClick={(tutor) => router.push(`/admin/tutors-coaching/tutors/${tutor.id}`)}
        getRowAriaLabel={(tutor) => `Open ${tutor.name}`}
        hasActiveFilters={active}
        onResetFilters={reset}
        emptyTitle="No tutors match"
        emptyDescription="Try a different search or clear the filters."
        mobileCardRender={(row) => <TutorMobileCard tutor={row.original} />}
      />
    </div>
  )
}
