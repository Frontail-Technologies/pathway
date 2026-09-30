import { Link2, Bot, ShieldCheck, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'
import { SeoIndexingBadge } from '../shared/seo-indexing-badge'

export function SeoCanonicalSection({ record }: { record: AdminSeoRecord }) {
  const meta = record.resolvedMetadata

  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-blue-600" />
          <CardTitle className="text-sm font-semibold">Canonical & Robots Directives</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 pt-2 space-y-4">
        <div className="space-y-1.5 p-3 rounded-lg bg-muted/20 border border-border/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-muted-foreground" />
              Canonical URL Path
            </span>
            {meta.isOverrideCanonical ? (
              <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                Custom Canonical
              </Badge>
            ) : (
              <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-600 border-slate-200">
                Standard Target Route
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <code className="text-xs bg-card px-2 py-1 rounded border border-border font-mono text-foreground">
              {meta.canonicalPath}
            </code>
          </div>
          <p className="text-[11px] text-muted-foreground pt-0.5">
            Internal relative canonical path. Runtime resolves this with the current site origin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/20 border border-border/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-muted-foreground" />
                Robots Indexing
              </span>
              <SeoIndexingBadge
                robotsIndex={record.robotsIndex}
                robotsFollow={record.robotsFollow}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {record.robotsIndex === undefined
                ? 'Using inherited page directives (permitted to index by default).'
                : record.robotsIndex
                ? 'Explicit override: Search engine crawlers are permitted to index this page.'
                : 'Explicit override: Search engines are instructed to exclude this page from search results (noindex).'}
            </p>
          </div>

          <div className="p-3 rounded-lg bg-muted/20 border border-border/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" />
                Link Following
              </span>
              <Badge
                variant="outline"
                className={`text-[11px] ${
                  record.robotsFollow === undefined
                    ? 'bg-slate-50 text-slate-600 border-slate-200'
                    : record.robotsFollow
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
              >
                {record.robotsFollow === undefined
                  ? 'Inherited (Follow links)'
                  : record.robotsFollow
                  ? 'Follow links'
                  : 'Nofollow'}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {record.robotsFollow === undefined
                ? 'Using inherited link following behavior (crawlers follow links by default).'
                : record.robotsFollow
                ? 'Explicit override: Crawlers may follow outbound links on this page.'
                : 'Explicit override: Crawlers are instructed not to follow outbound links.'}
            </p>
          </div>
        </div>

        {record.robotsIndex === false && (
          <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Explicit Noindex Override:</strong> This page carries an explicit <code className="font-mono text-[11px] bg-rose-100 px-1 py-0.5 rounded">noindex</code> directive override, instructing search engine crawlers not to index this URL in public search results.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
