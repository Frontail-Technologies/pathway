'use client'

import * as React from 'react'
import type { AdminStudent } from '@/features/admin/data/admin-students'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import { studentTableColumns } from './student-table-columns'
import { StudentFilters, type StudentFilterState } from './student-filters'
import { StudentMobileCard } from './student-mobile-card'
import { Badge } from '@/components/ui/badge'

export function AdminStudentsView({
  initialStudents,
}: {
  initialStudents: AdminStudent[]
}) {
  const [filters, setFilters] = React.useState<StudentFilterState>({
    search: '',
    studyLevel: 'all',
    stream: 'all',
    accountStatus: 'all',
  })

  const handleFilterChange = (key: keyof StudentFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      studyLevel: 'all',
      stream: 'all',
      accountStatus: 'all',
    })
  }

  const filteredData = React.useMemo(() => {
    return initialStudents.filter((student) => {
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const matchName = student.name.toLowerCase().includes(query)
        const matchEmail = student.email.toLowerCase().includes(query)
        if (!matchName && !matchEmail) {
          return false
        }
      }

      if (filters.studyLevel !== 'all' && student.studyLevel !== filters.studyLevel) {
        return false
      }

      if (filters.stream !== 'all' && student.stream !== filters.stream) {
        return false
      }

      if (filters.accountStatus !== 'all' && student.accountStatus !== filters.accountStatus) {
        return false
      }

      return true
    })
  }, [initialStudents, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              Students
            </h1>
            <Badge variant="info" size="sm">
              {initialStudents.length} {initialStudents.length === 1 ? 'Demo Profile' : 'Profiles'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
        <StudentFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        <div className="hidden md:block">
          <AdminDataTable
            columns={studentTableColumns}
            data={filteredData}
            pageSize={10}
          />
        </div>

        <div className="md:hidden space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((student) => (
              <StudentMobileCard key={student.id} student={student} />
            ))
          ) : (
            <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground text-xs">
              No students found matching current filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
