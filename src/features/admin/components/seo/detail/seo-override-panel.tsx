import { SlidersHorizontal, Check, Minus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AdminSeoRecord } from '@/features/admin/data/admin-seo'

export function SeoOverridePanel({ record }: { record: AdminSeoRecord }) {
  const meta = record.resolvedMetadata

  const fields = [
    { label: 'Meta Title', isOverride: meta.isOverrideTitle },
    { label: 'Meta Description', isOverride: meta.isOverrideDescription },
    { label: 'Canonical Path', isOverride: meta.isOverrideCanonical },
    { label: 'Robots Directives', isOverride: meta.isOverrideRobots },
    { label: 'OG Title', isOverride: meta.isOverrideOgTitle },
    { label: 'OG Description', isOverride: meta.isOverrideOgDescription },
    { label: 'OG Image', isOverride: meta.isOverrideOgImage },
  ]

  const customCount = fields.filter((f) => f.isOverride).length

  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-semibold">Override Status</CardTitle>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] bg-blue-50 text-blue-700 border-blue-200"
          >
            {customCount} of {fields.length} Custom
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-2 text-xs">
        {fields.map((f) => (
          <div key={f.label} className="flex items-center justify-between py-1">
            <span className="text-muted-foreground">{f.label}</span>
            {f.isOverride ? (
              <span className="text-blue-600 font-medium flex items-center gap-1 text-[11px]">
                <Check className="w-3 h-3" />
                Custom
              </span>
            ) : (
              <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
                <Minus className="w-3 h-3" />
                Default
              </span>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
