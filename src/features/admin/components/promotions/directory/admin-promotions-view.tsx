'use client'

import * as React from 'react'
import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { AdminDataTable } from '@/features/admin/components/admin-data-table'
import { promotionTableColumns } from './promotion-table-columns'
import { PromotionFilters, type PromotionFilterState } from './promotion-filters'
import { PromotionMobileCard } from './promotion-mobile-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sparkles, Plus } from 'lucide-react'
import Link from 'next/link'

export function AdminPromotionsView({
  initialPromotions,
}: {
  initialPromotions: AdminPromotion[]
}) {
  const [filters, setFilters] = React.useState<PromotionFilterState>({
    search: '',
    kind: 'all',
    targetType: 'all',
    placement: 'all',
    status: 'all',
  })

  const handleFilterChange = (key: keyof PromotionFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleResetFilters = () => {
    setFilters({
      search: '',
      kind: 'all',
      targetType: 'all',
      placement: 'all',
      status: 'all',
    })
  }

  const filteredData = React.useMemo(() => {
    return initialPromotions.filter((promo) => {
      if (filters.search) {
        const query = filters.search.toLowerCase()
        const matchLabel = promo.label?.toLowerCase().includes(query)
        const matchTarget = promo.targetName?.toLowerCase().includes(query)
        const matchPlacement = promo.placementLabel?.toLowerCase().includes(query)
        if (!matchLabel && !matchTarget && !matchPlacement) {
          return false
        }
      }

      if (filters.kind !== 'all' && promo.kind !== filters.kind) {
        return false
      }

      if (filters.targetType !== 'all' && promo.targetType !== filters.targetType) {
        return false
      }

      if (filters.placement !== 'all' && promo.placement !== filters.placement) {
        return false
      }

      if (filters.status !== 'all' && promo.effectiveStatus !== filters.status) {
        return false
      }

      return true
    })
  }, [initialPromotions, filters])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              Featured / Sponsored Placements
            </h1>
            <Badge
              variant="secondary"
              className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 border-0"
            >
              {initialPromotions.length} Placements
            </Badge>
          </div>
        </div>

        <Link
          href="/admin/promotions/new"
          className="inline-flex items-center justify-center gap-1.5 h-9 px-3.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Placement</span>
        </Link>
      </div>

      <div className="bg-card rounded-xl p-4 sm:p-5 shadow-xs border-0 space-y-4">
        <PromotionFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />

        {initialPromotions.length === 0 ? (
          <div className="p-12 text-center bg-muted/10 rounded-xl border border-dashed border-border/80 space-y-3">
            <div className="w-10 h-10 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-foreground">No placements yet.</h3>
            <div className="pt-2">
              <Link
                href="/admin/promotions/new"
                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Placement</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <AdminDataTable
                columns={promotionTableColumns}
                data={filteredData}
                pageSize={10}
              />
            </div>

            <div className="md:hidden space-y-3">
              {filteredData.length > 0 ? (
                filteredData.map((promotion) => (
                  <PromotionMobileCard key={promotion.id} promotion={promotion} />
                ))
              ) : (
                <div className="p-8 text-center bg-muted/20 rounded-xl border border-dashed border-border text-muted-foreground text-xs">
                  No placements found matching current filter criteria.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
