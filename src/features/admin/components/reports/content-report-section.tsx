import { PlatformReportsData } from '../../data/admin-reports'
import { FileText, Image, Sparkles, SearchCode } from 'lucide-react'

export function ContentReportSection({ data }: { data: PlatformReportsData['content'] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Content, Placements & SEO
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Articles & Guides
            </span>
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-bold font-heading text-foreground">{data.articlesCount}</div>
          <div className="p-2.5 bg-muted/40 rounded-lg text-[11px] text-muted-foreground">
            No editorial content configured
          </div>
        </div>

        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Banners
            </span>
            <Image className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold font-heading text-foreground">{data.bannersCount}</div>
          <div className="p-2.5 bg-muted/40 rounded-lg text-[11px] text-muted-foreground space-y-0.5">
            <div>No banners configured</div>
            <div className="text-[10px] text-muted-foreground/80">Performance tracking not connected</div>
          </div>
        </div>

        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Featured Placements
            </span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold font-heading text-foreground">{data.promotionsCount}</div>
          <div className="p-2.5 bg-muted/40 rounded-lg text-[11px] text-muted-foreground space-y-0.5">
            <div>No placements configured</div>
            <div className="text-[10px] text-muted-foreground/80">Performance tracking not connected</div>
          </div>
        </div>

        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              SEO Overrides
            </span>
            <SearchCode className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold font-heading text-foreground">{data.seoOverridesCount}</div>
          <div className="p-2.5 bg-muted/40 rounded-lg text-[11px] text-muted-foreground space-y-0.5">
            <div>No SEO overrides configured</div>
            <div className="text-[10px] text-muted-foreground/80">
              Supports {data.supportedSeoTargetTypesCount} target types · Search Console not connected
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
