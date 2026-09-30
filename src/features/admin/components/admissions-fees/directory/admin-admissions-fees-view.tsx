'use client'

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  getAdminOfferings,
  type AdminProgramOffering,
} from '@/features/admin/data/admin-admissions-fees'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Banknote } from 'lucide-react'
import { getAdmissionsFeesColumns } from './admissions-fees-table-columns'
import { AdmissionsFeesMobileCard } from './admissions-fees-mobile-card'
import {
  AdmissionsFeesFilters,
  type AdmissionsFeesFilterState,
} from './admissions-fees-filters'

export function AdminAdmissionsFeesView() {
  const searchParams = useSearchParams()
  const initialInstitutionParam = searchParams.get('institution') || 'all'
  const initialProgramParam = searchParams.get('program') || 'all'

  const allOfferings = React.useMemo(() => getAdminOfferings(), [])

  const institutions = React.useMemo(() => {
    const map = new Map<string, string>()
    for (const o of allOfferings) {
      if (!map.has(o.institutionId)) {
        map.set(o.institutionId, o.institutionName)
      }
    }
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
  }, [allOfferings])

  const programs = React.useMemo(() => {
    const map = new Map<string, string>()
    for (const o of allOfferings) {
      if (!map.has(o.programId)) {
        map.set(o.programId, o.programName)
      }
    }
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
  }, [allOfferings])

  const [filters, setFilters] = React.useState<AdmissionsFeesFilterState>({
    search: '',
    institutionId: initialInstitutionParam,
    programId: initialProgramParam,
    level: 'all',
    admissionMode: 'all',
    qualityStatus: 'all',
  })

  React.useEffect(() => {
    if (initialInstitutionParam !== 'all' || initialProgramParam !== 'all') {
      setFilters((prev) => ({
        ...prev,
        institutionId: initialInstitutionParam !== 'all' ? initialInstitutionParam : prev.institutionId,
        programId: initialProgramParam !== 'all' ? initialProgramParam : prev.programId,
      }))
    }
  }, [initialInstitutionParam, initialProgramParam])

  function handleFilterChange(key: keyof AdmissionsFeesFilterState, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  function handleResetFilters() {
    setFilters({
      search: '',
      institutionId: 'all',
      programId: 'all',
      level: 'all',
      admissionMode: 'all',
      qualityStatus: 'all',
    })
  }

  const hasActiveFilters = React.useMemo(() => {
    return (
      filters.institutionId !== 'all' ||
      filters.programId !== 'all' ||
      filters.level !== 'all' ||
      filters.admissionMode !== 'all' ||
      filters.qualityStatus !== 'all' ||
      filters.search.trim() !== ''
    )
  }, [filters])

  const filteredOfferings = React.useMemo(() => {
    return allOfferings.filter((off) => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const matchesProgram = off.programName.toLowerCase().includes(q)
        const matchesInst = off.institutionName.toLowerCase().includes(q)
        const matchesExam = off.entranceExams.some((ex) => ex.toLowerCase().includes(q))
        const matchesCounselling = off.counsellingBody.toLowerCase().includes(q)
        if (!matchesProgram && !matchesInst && !matchesExam && !matchesCounselling) return false
      }

      if (filters.institutionId !== 'all') {
        if (off.institutionId !== filters.institutionId && off.institutionSlug !== filters.institutionId) {
          return false
        }
      }

      if (filters.programId !== 'all') {
        if (off.programId !== filters.programId && off.programSlug !== filters.programId) {
          return false
        }
      }

      if (filters.level !== 'all' && off.level !== filters.level) {
        return false
      }

      if (filters.admissionMode !== 'all' && off.admissionMode !== filters.admissionMode) {
        return false
      }

      if (filters.qualityStatus !== 'all' && off.qualityStatus !== filters.qualityStatus) {
        return false
      }

      return true
    })
  }, [allOfferings, filters])

  const columns = React.useMemo(() => getAdmissionsFeesColumns(), [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              Admissions & Fees
            </h1>
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-0.5 bg-primary/10 text-primary border-0"
            >
              {allOfferings.length} Offerings
            </Badge>
          </div>
        </div>

        <Link
          href="/admin/admissions-fees/new"
          className={buttonVariants({
            size: 'sm',
            className: 'text-xs font-semibold gap-1.5 self-start sm:self-auto shadow-xs',
          })}
        >
          <Plus className="w-3.5 h-3.5" />
          Create Offering
        </Link>
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
        <AdmissionsFeesFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          institutions={institutions}
          programs={programs}
        />
      </div>

      <AdminDataTable
        columns={columns}
        data={filteredOfferings}
        mobileCardRender={({ original }) => <AdmissionsFeesMobileCard offering={original} />}
        pageSize={10}
        emptyTitle="No program offerings match these filters"
        emptyDescription="Try adjusting your institution, program, or search query to find offerings."
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  )
}
