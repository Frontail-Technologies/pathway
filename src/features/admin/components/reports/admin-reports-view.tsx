'use client'

import * as React from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getPlatformReports, type PlatformReportsData } from '../../data/admin-reports'
import { useUrlFilters } from '../../hooks/use-url-filters'
import { AdminPageHeader, StatGrid, StatTile } from '../kit'
import { CatalogReportSection } from './catalog-report-section'
import { DataQualityReportSection } from './data-quality-report-section'
import { DataAvailabilitySection } from './data-availability-section'

const TABS = [
  { value: 'catalogue', label: 'Catalogue' },
  { value: 'quality', label: 'Data quality' },
  { value: 'sources', label: 'Data sources' },
] as const

const DEFAULT_FILTERS = { tab: 'catalogue' }

const pct = (part: number, total: number) => (total > 0 ? Math.round((part / total) * 100) : 0)

function toCsv(data: PlatformReportsData) {
  const rows: (string | number)[][] = [['Report', 'Item', 'Count', 'Percent']]
  const add = (report: string, items: { name: string; count: number; percentage: number }[]) => items.forEach((item) => rows.push([report, item.name, item.count, item.percentage]))
  add('Institutions by type', data.catalog.institutionsByType)
  add('Courses by level', data.catalog.programsByLevel)
  add('Courses by stream', data.catalog.programsByStream)
  add('Scholarships by provider', data.catalog.scholarshipsByProvider)
  add('Scholarships by status', data.catalog.scholarshipsByStatus)
  add('Tutors by mode', data.catalog.tutorsByMode)
  add('Coaching by mode', data.catalog.coachingByMode)
  const q = data.quality.overallDistribution
  ;[
    ['Ready', q.ready],
    ['Needs review', q.needsReview],
    ['Conflict', q.conflict],
    ['Not assessed', q.notAssessed],
  ].forEach(([label, value]) => rows.push(['Review status', label, value, pct(value as number, q.assessableTotal)]))
  data.availability.items.forEach((item) => rows.push(['Data sources', item.domain, item.recordCount, item.statusLabel]))
  return rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n')
}

export function AdminReportsView() {
  const data = React.useMemo(() => getPlatformReports(), [])
  const { values, set } = useUrlFilters(DEFAULT_FILTERS)
  const tab = TABS.some((t) => t.value === values.tab) ? values.tab : 'catalogue'
  const { catalog, quality, availability } = data
  const q = quality.overallDistribution

  function exportCsv() {
    const blob = new Blob([toCsv(data)], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `pathway-reports-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Reports"
        actions={
          <Button size="sm" variant="outline" className="h-9 gap-1.5" onClick={exportCsv}>
            <Download className="size-4" aria-hidden="true" />
            Export
          </Button>
        }
      />

      <StatGrid>
        <StatTile label="Catalogue records" value={catalog.totalCatalogRecords.toLocaleString('en-IN')} hint={`${catalog.totalInstitutions} institutions · ${catalog.totalPrograms} courses`} />
        <StatTile label="Ready to publish" value={q.ready} hint={`${pct(q.ready, q.assessableTotal)}% of ${q.assessableTotal} checked`} />
        <StatTile label="Institution pages live" value={`${quality.institutionsCompleteness.liveDetailPage} / ${quality.institutionsCompleteness.total}`} hint="Full public profile" />
        <StatTile label="Data sources with data" value={`${availability.availableCount} / ${availability.totalCount}`} hint={`${availability.notConnectedCount} not connected yet`} />
      </StatGrid>

      <div>
        <div role="tablist" aria-label="Report" className="flex gap-6 overflow-x-auto border-b border-border">
          {TABS.map((t) => {
            const selected = tab === t.value
            return (
              <button
                key={t.value}
                type="button"
                role="tab"
                id={`report-tab-${t.value}`}
                aria-selected={selected}
                aria-controls={`report-panel-${t.value}`}
                onClick={() => set({ tab: t.value })}
                className={cn(
                  '-mb-px border-b-2 pb-2.5 text-sm font-medium whitespace-nowrap outline-none focus-visible:text-foreground',
                  selected ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        <div role="tabpanel" id={`report-panel-${tab}`} aria-labelledby={`report-tab-${tab}`} className="pt-6">
          {tab === 'catalogue' ? <CatalogReportSection data={catalog} /> : null}
          {tab === 'quality' ? <DataQualityReportSection data={quality} /> : null}
          {tab === 'sources' ? <DataAvailabilitySection items={availability.items} /> : null}
        </div>
      </div>
    </div>
  )
}
