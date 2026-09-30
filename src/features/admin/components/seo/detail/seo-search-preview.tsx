import { Globe, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResolvedSeoMetadata } from '@/features/seo/types/seo-metadata'

interface SeoSearchPreviewProps {
  metadata: ResolvedSeoMetadata
}

export function SeoSearchPreview({ metadata }: SeoSearchPreviewProps) {
  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-semibold">Search Preview</CardTitle>
          </div>
          <div className="flex items-center gap-1.5">
            {metadata.isOverrideTitle && (
              <Badge
                variant="outline"
                className="text-[10px] bg-blue-50 text-blue-700 border-blue-200"
              >
                Custom Title
              </Badge>
            )}
            {metadata.isOverrideDescription && (
              <Badge
                variant="outline"
                className="text-[10px] bg-blue-50 text-blue-700 border-blue-200"
              >
                Custom Description
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 pt-2 space-y-3">
        <div className="bg-[#f8f9fa] border border-border/80 rounded-lg p-4 font-sans space-y-1">
          <div className="flex items-center gap-1.5 text-[12px] text-[#202124] truncate">
            <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-primary">P</span>
            </div>
            <span className="font-medium">Pathway</span>
            <span className="text-[#5f6368]">›</span>
            <span className="text-[#5f6368] font-mono text-[11px] truncate">
              {metadata.canonicalPath}
            </span>
          </div>

          <div className="pt-0.5">
            <h3 className="text-[#1a0dab] hover:underline cursor-pointer text-base sm:text-lg font-medium leading-snug line-clamp-1">
              {metadata.title || 'Pathway — Education discovery, made clearer'}
            </h3>
          </div>

          <p className="text-[#4d5156] text-xs sm:text-sm leading-relaxed line-clamp-2 pt-0.5">
            {metadata.description || 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.'}
          </p>
        </div>

        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-muted-foreground shrink-0" />
          <span>Approximate search-result preview. Google may rewrite snippets based on user queries and page content.</span>
        </p>
      </CardContent>
    </Card>
  )
}
