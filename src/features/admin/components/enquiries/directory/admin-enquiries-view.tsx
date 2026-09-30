'use client'

import * as React from 'react'
import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import { enquiryTableColumns } from './enquiry-table-columns'
import { EnquiryFilters, type EnquiryFilterState } from './enquiry-filters'
import { EnquiryMobileCard } from './enquiry-mobile-card'
import { Badge } from '@/components/ui/badge'
import { Inbox } from 'lucide-react'

export function AdminEnquiriesView({
  initialEnquiries,
}: {
  initialEnquiries: AdminEnquiry[]
}) {
  const [filters, setFilters] = React.useState<EnquiryFilterState>({
    search: '',
    status: 'all',
    source: 'all',
    assignedTo: 'all',
  })

  const handleFilterChange = (key: keyof EnquiryFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'all',
      source: 'all',
      assignedTo: 'all',
    })
  }

  const filteredData = React.useMemo(() => {
    return initialEnquiries.filter((enquiry) => {
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const matchName = enquiry.contactName.toLowerCase().includes(query)
        const matchEmail = enquiry.contactEmail?.toLowerCase().includes(query)
        const matchSubject = enquiry.subject?.toLowerCase().includes(query)
        const matchTarget = enquiry.targetName?.toLowerCase().includes(query)
        if (!matchName && !matchEmail && !matchSubject && !matchTarget) {
          return false
        }
      }

      if (filters.status !== 'all' && enquiry.status !== filters.status) {
        return false
      }

      if (filters.source !== 'all' && enquiry.source !== filters.source) {
        return false
      }

      if (filters.assignedTo !== 'all') {
        if (filters.assignedTo === 'unassigned' && enquiry.assignedTo) {
          return false
        }
      }

      return true
    })
  }, [initialEnquiries, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              Enquiries & Leads
            </h1>
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 border-0"
            >
              {initialEnquiries.length} Enquiries
            </Badge>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
        <EnquiryFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {initialEnquiries.length === 0 ? (
          <div className="p-12 text-center bg-muted/10 rounded-xl border border-dashed border-border/80 space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
              <Inbox className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">No enquiries yet.</h3>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <AdminDataTable
                columns={enquiryTableColumns}
                data={filteredData}
                pageSize={10}
              />
            </div>

            <div className="md:hidden space-y-3">
              {filteredData.length > 0 ? (
                filteredData.map((enquiry) => (
                  <EnquiryMobileCard key={enquiry.id} enquiry={enquiry} />
                ))
              ) : (
                <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground text-xs">
                  No enquiries found matching current filter criteria.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
