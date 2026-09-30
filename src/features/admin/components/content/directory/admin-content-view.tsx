'use client'

import * as React from 'react'
import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import { contentTableColumns } from './content-table-columns'
import { ContentFilters, type ContentFilterState } from './content-filters'
import { ContentMobileCard } from './content-mobile-card'
import { Badge } from '@/components/ui/badge'
import { FileText, Plus } from 'lucide-react'
import Link from 'next/link'

export function AdminContentView({
  initialContent,
}: {
  initialContent: AdminContentEntry[]
}) {
  const [filters, setFilters] = React.useState<ContentFilterState>({
    search: '',
    type: 'all',
    category: 'all',
    status: 'all',
  })

  const handleFilterChange = (key: keyof ContentFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      category: 'all',
      status: 'all',
    })
  }

  const filteredData = React.useMemo(() => {
    return initialContent.filter((entry) => {
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const matchTitle = entry.title.toLowerCase().includes(query)
        const matchSlug = entry.slug.toLowerCase().includes(query)
        const matchExcerpt = entry.excerpt?.toLowerCase().includes(query)
        const matchAuthor = entry.authorName?.toLowerCase().includes(query)
        if (!matchTitle && !matchSlug && !matchExcerpt && !matchAuthor) {
          return false
        }
      }

      if (filters.type !== 'all' && entry.type !== filters.type) {
        return false
      }

      if (filters.category !== 'all' && entry.category !== filters.category) {
        return false
      }

      if (filters.status !== 'all' && entry.status !== filters.status) {
        return false
      }

      return true
    })
  }, [initialContent, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              Articles & Content Management
            </h1>
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 border-0"
            >
              {initialContent.length} Entries
            </Badge>
          </div>
        </div>

        <Link
          href="/admin/content/new"
          className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Content</span>
        </Link>
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
        <ContentFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {initialContent.length === 0 ? (
          <div className="p-12 text-center bg-muted/10 rounded-xl border border-dashed border-border/80 space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">No editorial content yet.</h3>
            <div className="pt-2">
              <Link
                href="/admin/content/new"
                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Content</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <AdminDataTable
                columns={contentTableColumns}
                data={filteredData}
                pageSize={10}
              />
            </div>

            <div className="md:hidden space-y-3">
              {filteredData.length > 0 ? (
                filteredData.map((entry) => (
                  <ContentMobileCard key={entry.id} entry={entry} />
                ))
              ) : (
                <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground text-xs">
                  No content found matching current filter criteria.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
