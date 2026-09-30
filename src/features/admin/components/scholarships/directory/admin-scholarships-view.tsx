'use client'

import * as React from 'react'
import Link from 'next/link'
import {
  type AdminScholarship,
} from '@/features/admin/data/admin-scholarships'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import { scholarshipTableColumns } from './scholarship-table-columns'
import {
  ScholarshipFilters,
  type ScholarshipFilterState,
} from './scholarship-filters'
import { ScholarshipMobileCard } from './scholarship-mobile-card'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Award } from 'lucide-react'

export function AdminScholarshipsView({
  initialScholarships,
}: {
  initialScholarships: AdminScholarship[]
}) {
  const [filters, setFilters] = React.useState<ScholarshipFilterState>({
    search: '',
    providerType: 'all',
    educationLevel: 'all',
    scholarshipType: 'all',
    applicationStatus: 'all',
    qualityStatus: 'all',
    detailStatus: 'all',
  })

  const handleFilterChange = (key: keyof ScholarshipFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      providerType: 'all',
      educationLevel: 'all',
      scholarshipType: 'all',
      applicationStatus: 'all',
      qualityStatus: 'all',
      detailStatus: 'all',
    })
  }

  const filteredData = React.useMemo(() => {
    return initialScholarships.filter((item) => {
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const matchName = item.name.toLowerCase().includes(query)
        const matchProvider = item.provider.toLowerCase().includes(query)
        const matchType = item.scholarshipType.toLowerCase().includes(query)
        const matchStreams = item.streams.some((s) => s.toLowerCase().includes(query))
        const matchCats = item.categories.some((c) => c.toLowerCase().includes(query))
        if (!matchName && !matchProvider && !matchType && !matchStreams && !matchCats) {
          return false
        }
      }

      if (filters.providerType !== 'all' && item.providerType !== filters.providerType) {
        return false
      }

      if (
        filters.educationLevel !== 'all' &&
        item.educationLevels.length > 0 &&
        !item.educationLevels.includes(filters.educationLevel as any)
      ) {
        return false
      }

      if (filters.scholarshipType !== 'all' && item.scholarshipType !== filters.scholarshipType) {
        return false
      }

      if (filters.applicationStatus !== 'all' && item.applicationStatus !== filters.applicationStatus) {
        return false
      }

      if (filters.qualityStatus !== 'all' && item.qualityStatus !== filters.qualityStatus) {
        return false
      }

      if (filters.detailStatus === 'live' && !item.hasDetailPage) {
        return false
      }

      if (filters.detailStatus === 'not_configured' && item.hasDetailPage) {
        return false
      }

      return true
    })
  }, [initialScholarships, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              Scholarships
            </h1>
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 border-0"
            >
              {initialScholarships.length} Schemes
            </Badge>
          </div>
        </div>

        <Link
          href="/admin/scholarships/new"
          className={buttonVariants({
            size: 'sm',
            className: 'font-semibold text-xs gap-1.5 shadow-xs shrink-0 self-start sm:self-auto',
          })}
        >
          <Plus className="w-4 h-4" />
          Create Scholarship
        </Link>
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
        <ScholarshipFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        <div className="hidden md:block">
          <AdminDataTable
            columns={scholarshipTableColumns}
            data={filteredData}
            pageSize={10}
          />
        </div>

        <div className="md:hidden space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((sch) => (
              <ScholarshipMobileCard key={sch.id} scholarship={sch} />
            ))
          ) : (
            <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground text-xs">
              No scholarships found matching current filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
