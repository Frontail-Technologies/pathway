import { PlatformReportsData } from '../../data/admin-reports'
import { Database, FileText, Users, Link2Off, Layers } from 'lucide-react'

export function ReportsSummary({ data }: { data: PlatformReportsData }) {
  const { availableCount, notConnectedCount, totalCount } = data.availability

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      { }
      <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Catalog Inventory
          </span>
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Database className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold font-heading text-foreground">
          {data.catalog.totalCatalogRecords.toLocaleString()}
        </div>
        <div className="pt-2 border-t border-border/60 flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground">{data.catalog.totalInstitutions}</span> Inst. ·{' '}
          <span className="font-medium text-foreground">{data.catalog.totalPrograms}</span> Prog. ·{' '}
          <span className="font-medium text-foreground">{data.catalog.totalOfferings}</span> Off. ·{' '}
          <span className="font-medium text-foreground">{data.catalog.totalScholarships}</span> Schol.
        </div>
      </div>

      { }
      <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Content & Placements
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
            <FileText className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold font-heading text-foreground">
          {data.content.articlesCount +
            data.content.bannersCount +
            data.content.promotionsCount +
            data.content.seoOverridesCount}
        </div>
        <div className="pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
          4 managed areas · 0 configured items
        </div>
      </div>

      { }
      <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Profiles & Accounts
          </span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold font-heading text-foreground">
          {data.peopleAndCommerce.studentsCount}
        </div>
        <div className="pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
          Avg Profile Completion: <span className="font-semibold text-foreground">{data.peopleAndCommerce.studentsAverageCompletion}%</span>
        </div>
      </div>

      { }
      <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Data Availability
          </span>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl font-bold font-heading text-foreground">
          {availableCount} / {totalCount}
        </div>
        <div className="pt-2 border-t border-border/60 text-[11px] text-muted-foreground flex items-center gap-1">
          <Link2Off className="w-3 h-3 text-amber-500" />
          <span>{notConnectedCount} integrations not connected</span>
        </div>
      </div>
    </div>
  )
}
