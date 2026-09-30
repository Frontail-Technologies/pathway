'use client'

import * as React from 'react'
import type { AdminBanner } from '@/features/admin/data/admin-banners'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import { bannerTableColumns } from './banner-table-columns'
import { BannerFilters, type BannerFilterState } from './banner-filters'
import { BannerMobileCard } from './banner-mobile-card'
import { Badge } from '@/components/ui/badge'
import { Image as ImageIcon, Plus } from 'lucide-react'
import Link from 'next/link'

export function AdminBannersView({
  initialBanners,
}: {
  initialBanners: AdminBanner[]
}) {
  const [filters, setFilters] = React.useState<BannerFilterState>({
    search: '',
    placement: 'all',
    status: 'all',
  })

  const handleFilterChange = (key: keyof BannerFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      placement: 'all',
      status: 'all',
    })
  }

  const filteredData = React.useMemo(() => {
    return initialBanners.filter((banner) => {
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const matchName = banner.name.toLowerCase().includes(query)
        const matchTitle = banner.title.toLowerCase().includes(query)
        const matchDesc = banner.description?.toLowerCase().includes(query)
        const matchEyebrow = banner.eyebrow?.toLowerCase().includes(query)
        const matchCta = banner.ctaLabel?.toLowerCase().includes(query)
        if (!matchName && !matchTitle && !matchDesc && !matchEyebrow && !matchCta) {
          return false
        }
      }

      if (filters.placement !== 'all' && banner.placement !== filters.placement) {
        return false
      }

      if (filters.status !== 'all' && banner.effectiveStatus !== filters.status) {
        return false
      }

      return true
    })
  }, [initialBanners, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              Banners
            </h1>
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 border-0"
            >
              {initialBanners.length} Banners
            </Badge>
          </div>
        </div>

        <Link
          href="/admin/banners/new"
          className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Banner</span>
        </Link>
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
        <BannerFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {initialBanners.length === 0 ? (
          <div className="p-12 text-center bg-muted/10 rounded-xl border border-dashed border-border/80 space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
              <ImageIcon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">No banners yet.</h3>
            <div className="pt-2">
              <Link
                href="/admin/banners/new"
                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Banner</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <AdminDataTable
                columns={bannerTableColumns}
                data={filteredData}
                pageSize={10}
              />
            </div>

            <div className="md:hidden space-y-3">
              {filteredData.length > 0 ? (
                filteredData.map((banner) => (
                  <BannerMobileCard key={banner.id} banner={banner} />
                ))
              ) : (
                <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground text-xs">
                  No banners found matching current filter criteria.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
