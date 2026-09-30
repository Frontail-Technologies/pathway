'use client'

import * as React from 'react'
import { getPlatformReports } from '../../data/admin-reports'
import { ReportsSummary } from './reports-summary'
import { CatalogReportSection } from './catalog-report-section'
import { DataQualityReportSection } from './data-quality-report-section'
import { ContentReportSection } from './content-report-section'
import { PeopleCommerceReportSection } from './people-commerce-report-section'
import { DataAvailabilitySection } from './data-availability-section'
import { BarChart3, Database, ShieldCheck, FileText, Users, Layers, Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type ReportTab = 'all' | 'catalog' | 'quality' | 'content' | 'people' | 'availability'

export function AdminReportsView() {
  const data = React.useMemo(() => getPlatformReports(), [])
  const [activeTab, setActiveTab] = React.useState<ReportTab>('all')

  return (
    <div className="space-y-6">
      { }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold font-heading text-foreground">
            Reports
          </h1>
          <Badge
            variant="secondary"
            className="text-xs font-semibold bg-primary/10 text-primary border-0 ml-1"
          >
            ADM-23
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1.5 h-8 px-3 rounded-md border border-border/80 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      { }
      <ReportsSummary data={data} />

      { }
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-border/60">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={cn(
            'px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap',
            activeTab === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          All Reports
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('catalog')}
          className={cn(
            'px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5',
            activeTab === 'catalog'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          <Database className="w-3.5 h-3.5" />
          Catalog Distribution
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quality')}
          className={cn(
            'px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5',
            activeTab === 'quality'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Quality & Completeness
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('content')}
          className={cn(
            'px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5',
            activeTab === 'content'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          <FileText className="w-3.5 h-3.5" />
          Content & SEO
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('people')}
          className={cn(
            'px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5',
            activeTab === 'people'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          <Users className="w-3.5 h-3.5" />
          Users & Notes
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('availability')}
          className={cn(
            'px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5',
            activeTab === 'availability'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          Data Availability Matrix
        </button>
      </div>

      { }
      <div className="space-y-8">
        {(activeTab === 'all' || activeTab === 'catalog') && (
          <CatalogReportSection data={data.catalog} />
        )}

        {(activeTab === 'all' || activeTab === 'quality') && (
          <DataQualityReportSection data={data.quality} />
        )}

        {(activeTab === 'all' || activeTab === 'content') && (
          <ContentReportSection data={data.content} />
        )}

        {(activeTab === 'all' || activeTab === 'people') && (
          <PeopleCommerceReportSection data={data.peopleAndCommerce} />
        )}

        {(activeTab === 'all' || activeTab === 'availability') && (
          <DataAvailabilitySection items={data.availability.items} />
        )}
      </div>
    </div>
  )
}
