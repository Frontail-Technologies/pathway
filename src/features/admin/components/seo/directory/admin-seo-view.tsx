'use client'

import * as React from 'react'
import type { AdminSeoRecord } from '@/features/admin/data/admin-seo'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import { seoTableColumns } from './seo-table-columns'
import { SeoFilters, type SeoFilterState } from './seo-filters'
import { SeoMobileCard } from './seo-mobile-card'
import { Badge } from '@/components/ui/badge'
import { SearchCode, Plus, Globe, CheckCircle2, AlertTriangle, Layers } from 'lucide-react'
import Link from 'next/link'

export function AdminSeoView({
  initialRecords,
}: {
  initialRecords: AdminSeoRecord[]
}) {
  const [filters, setFilters] = React.useState<SeoFilterState>({
    search: '',
    targetType: 'all',
    indexing: 'all',
  })

  const handleFilterChange = (key: keyof SeoFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      targetType: 'all',
      indexing: 'all',
    })
  }

  const filteredData = React.useMemo(() => {
    return initialRecords.filter((record) => {
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const matchTitle = (record.title || record.effectiveTitle).toLowerCase().includes(query)
        const matchDesc = (record.description || record.effectiveDescription).toLowerCase().includes(query)
        const matchTarget = record.targetLabel.toLowerCase().includes(query)
        const matchRoute = record.targetRoutePath.toLowerCase().includes(query)
        const matchCanonical = (record.canonicalPath || record.effectiveCanonical).toLowerCase().includes(query)
        const matchPrimaryKw = record.primaryKeyword?.toLowerCase().includes(query) || false
        const matchSecondaryKw = record.secondaryKeywords?.some((k) => k.toLowerCase().includes(query)) || false
        if (!matchTitle && !matchDesc && !matchTarget && !matchRoute && !matchCanonical && !matchPrimaryKw && !matchSecondaryKw) {
          return false
        }
      }

      if (filters.targetType !== 'all' && record.targetType !== filters.targetType) {
        return false
      }

      if (filters.indexing !== 'all') {
        if (filters.indexing === 'inherited' && record.robotsIndex !== undefined) return false
        if (filters.indexing === 'indexable' && record.robotsIndex !== true) return false
        if (filters.indexing === 'noindex' && record.robotsIndex !== false) return false
      }

      return true
    })
  }, [initialRecords, filters])

  const indexableCount = initialRecords.filter((r) => r.robotsIndex === true).length
  const noindexCount = initialRecords.filter((r) => r.robotsIndex === false).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              SEO Metadata
            </h1>
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 border-0"
            >
              {initialRecords.length} Overrides
            </Badge>
          </div>
        </div>

        <Link
          href="/admin/seo/new"
          className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create SEO Override</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-card rounded-xl p-3.5 border-0 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Configured Overrides</span>
            <SearchCode className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-lg font-bold font-heading text-foreground">
            {initialRecords.length}
          </div>
          <p className="text-[11px] text-muted-foreground">Active Admin overrides</p>
        </div>

        <div className="bg-card rounded-xl p-3.5 border-0 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Indexable Overrides</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-bold font-heading text-foreground">
            {indexableCount}
          </div>
          <p className="text-[11px] text-muted-foreground">Search indexing allowed</p>
        </div>

        <div className="bg-card rounded-xl p-3.5 border-0 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Noindex Overrides</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-lg font-bold font-heading text-foreground">
            {noindexCount}
          </div>
          <p className="text-[11px] text-muted-foreground">Excluded from search</p>
        </div>

        <div className="bg-card rounded-xl p-3.5 border-0 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium">Supported Target Types</span>
            <Layers className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-lg font-bold font-heading text-foreground">
            8
          </div>
          <p className="text-[11px] text-muted-foreground">Pages & canonical entities</p>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
        <SeoFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {initialRecords.length === 0 ? (
          <div className="p-12 text-center bg-muted/10 rounded-xl border border-dashed border-border/80 space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">No SEO metadata overrides yet.</h3>
            <div className="pt-2">
              <Link
                href="/admin/seo/new"
                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create SEO Override</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <AdminDataTable
                columns={seoTableColumns}
                data={filteredData}
                pageSize={10}
              />
            </div>

            <div className="md:hidden space-y-3">
              {filteredData.length > 0 ? (
                filteredData.map((record) => (
                  <SeoMobileCard key={record.id} record={record} />
                ))
              ) : (
                <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground text-xs">
                  No SEO overrides found matching current filter criteria.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
