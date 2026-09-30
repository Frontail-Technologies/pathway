import { Type, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'

export function SeoMetadataSection({ record }: { record: AdminSeoRecord }) {
  const meta = record.resolvedMetadata

  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-blue-600" />
          <CardTitle className="text-sm font-semibold">Metadata Fields & Overrides</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 pt-2 space-y-4">
        <div className="space-y-1.5 p-3 rounded-lg bg-muted/20 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              Meta Title
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground">
                {meta.title.length} characters
              </span>
              {meta.isOverrideTitle ? (
                <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                  Custom Override
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-600 border-slate-200">
                  Generated Default
                </Badge>
              )}
            </div>
          </div>
          <p className="text-xs font-medium text-foreground leading-relaxed">
            {meta.title}
          </p>
        </div>

        <div className="space-y-1.5 p-3 rounded-lg bg-muted/20 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              Meta Description
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted-foreground">
                {meta.description.length} characters
              </span>
              {meta.isOverrideDescription ? (
                <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                  Custom Override
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-600 border-slate-200">
                  Generated Default
                </Badge>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {meta.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-lg bg-muted/20 border border-border/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">OG Title</span>
              {meta.isOverrideOgTitle ? (
                <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                  Custom
                </Badge>
              ) : (
                <span className="text-[10px] text-muted-foreground">Inherits title</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {meta.ogTitle}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-muted/20 border border-border/60 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground">OG Description</span>
              {meta.isOverrideOgDescription ? (
                <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                  Custom
                </Badge>
              ) : (
                <span className="text-[10px] text-muted-foreground">Inherits desc</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {meta.ogDescription}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-border/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              Focus Keywords (Editorial Planning)
            </span>
            <span className="text-[10px] text-muted-foreground">
              Internal planning metadata
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/20 border border-border/60 space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground block">
                Primary Focus Keyword
              </span>
              <p className="text-xs font-medium text-foreground">
                {record.primaryKeyword || '—'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-muted/20 border border-border/60 space-y-1">
              <span className="text-[11px] font-medium text-muted-foreground block">
                Secondary Keywords
              </span>
              {record.secondaryKeywords && record.secondaryKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {record.secondaryKeywords.map((kw, i) => (
                    <Badge
                      key={`${kw}-${i}`}
                      variant="secondary"
                      className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 border-slate-200"
                    >
                      {kw}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-medium text-foreground">—</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
