import { PlatformReportsData } from '../../data/admin-reports'
import { CheckCircle2, AlertTriangle, AlertCircle, FileQuestion } from 'lucide-react'

export function DataQualityReportSection({ data }: { data: PlatformReportsData['quality'] }) {
  const { overallDistribution, institutionsCompleteness, programsCompleteness, scholarshipsCompleteness } = data
  const assessableTotal = overallDistribution.assessableTotal || 1

  const readyPct = Math.round((overallDistribution.ready / assessableTotal) * 100)
  const needsReviewPct = Math.round((overallDistribution.needsReview / assessableTotal) * 100)
  const conflictPct = Math.round((overallDistribution.conflict / assessableTotal) * 100)
  const notAssessedPct = Math.round((overallDistribution.notAssessed / assessableTotal) * 100)

  return (
    <section className="space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Completeness & Data Quality Audit
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-foreground">Catalog Quality Review Status</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Ready</span>
              </div>
              <div className="text-xl font-bold text-foreground">{overallDistribution.ready}</div>
              <div className="text-[11px] text-muted-foreground">{readyPct}% of assessed</div>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-600">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Needs Review</span>
              </div>
              <div className="text-xl font-bold text-foreground">{overallDistribution.needsReview}</div>
              <div className="text-[11px] text-muted-foreground">{needsReviewPct}% of assessed</div>
            </div>

            <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20 space-y-1">
              <div className="flex items-center gap-1.5 text-destructive">
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Conflict</span>
              </div>
              <div className="text-xl font-bold text-foreground">{overallDistribution.conflict}</div>
              <div className="text-[11px] text-muted-foreground">{conflictPct}% of assessed</div>
            </div>

            <div className="p-3 bg-muted/60 rounded-lg border border-border/60 space-y-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <FileQuestion className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Not Assessed</span>
              </div>
              <div className="text-xl font-bold text-foreground">{overallDistribution.notAssessed}</div>
              <div className="text-[11px] text-muted-foreground">{notAssessedPct}% of assessed</div>
            </div>
          </div>

        </div>

        { }
        <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-foreground">Domain Completeness Levels</h3>

          <div className="space-y-4">
            { }
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-foreground">Institutions with Public Detail Pages</span>
                <span className="text-muted-foreground">
                  {institutionsCompleteness.liveDetailPage} / {institutionsCompleteness.total} (
                  {Math.round((institutionsCompleteness.liveDetailPage / (institutionsCompleteness.total || 1)) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${(institutionsCompleteness.liveDetailPage / (institutionsCompleteness.total || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            { }
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-foreground">Academic Programs with Full Curriculum</span>
                <span className="text-muted-foreground">
                  {programsCompleteness.liveDetailPage} / {programsCompleteness.total} (
                  {Math.round((programsCompleteness.liveDetailPage / (programsCompleteness.total || 1)) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{
                    width: `${(programsCompleteness.liveDetailPage / (programsCompleteness.total || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            { }
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-foreground">Scholarships with Explicit Deadlines</span>
                <span className="text-muted-foreground">
                  {scholarshipsCompleteness.withDeadlines} / {scholarshipsCompleteness.total} (
                  {Math.round((scholarshipsCompleteness.withDeadlines / (scholarshipsCompleteness.total || 1)) * 100)}%)
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{
                    width: `${(scholarshipsCompleteness.withDeadlines / (scholarshipsCompleteness.total || 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
