import type { AdminPromotion } from '@/features/admin/data/admin-promotions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, ArrowUpRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function PromotionTargetSection({ promotion }: { promotion: AdminPromotion }) {
  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold font-heading flex items-center justify-between">
          <span>Target Canonical Entity</span>
          <Badge variant="outline" className="text-xs font-normal">
            {promotion.targetTypeLabel}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-foreground truncate">
                {promotion.targetName || promotion.targetId}
              </h4>
              {promotion.targetSubtitle ? (
                <p className="text-xs text-muted-foreground truncate">
                  {promotion.targetSubtitle}
                </p>
              ) : null}
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5">
                Target ID: {promotion.targetId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {promotion.targetAdminUrl ? (
              <Link
                href={promotion.targetAdminUrl}
                className="inline-flex items-center justify-center rounded-md border border-input bg-background h-8 px-3 text-xs font-medium hover:bg-muted transition-colors text-foreground"
              >
                Manage Entity
                <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            ) : null}

            {promotion.targetPublicUrl ? (
              <a
                href={promotion.targetPublicUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background h-8 px-2.5 text-xs font-medium hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                title="View on public site"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
