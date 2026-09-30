import Link from 'next/link'
import { Edit2, Globe, Shield, Settings2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'

export function SeoActionsPanel({ record }: { record: AdminSeoRecord }) {
  return (
    <Card className="border-0 shadow-xs space-y-3">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-blue-600" />
          <CardTitle className="text-sm font-semibold">Administrative Actions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        <div className="space-y-2">
          <Link
            href={`/admin/seo/${record.id}/edit`}
            className="w-full h-9 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center justify-center shadow-xs"
          >
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            Edit SEO Override
          </Link>

          <Link
            href={record.targetRoutePath}
            target="_blank"
            className="w-full h-9 text-xs font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors inline-flex items-center justify-center shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            View Public Route
          </Link>
        </div>

        <div className="p-3 rounded-lg bg-muted/20 border border-border/60 text-[11px] text-muted-foreground space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Scraper Protection</span>
          </div>
          <p className="leading-relaxed">
            Admin SEO overrides are protected configuration and will not be overwritten by automated web scrapers or catalog synchronizers.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
