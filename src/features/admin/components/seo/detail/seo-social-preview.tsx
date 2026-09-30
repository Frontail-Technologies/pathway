import Image from 'next/image'
import { Share2, Image as ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ResolvedSeoMetadata } from '@/features/seo/types/seo-metadata'

interface SeoSocialPreviewProps {
  metadata: ResolvedSeoMetadata
}

export function SeoSocialPreview({ metadata }: SeoSocialPreviewProps) {
  const displayImage = metadata.ogImage
  const displayTitle = metadata.ogTitle || metadata.title
  const displayDescription = metadata.ogDescription || metadata.description

  return (
    <Card className="border-0 shadow-xs">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-semibold">Social Preview</CardTitle>
          </div>
          <div className="flex items-center gap-1.5">
            {metadata.isOverrideOgTitle && (
              <Badge
                variant="outline"
                className="text-[10px] bg-blue-50 text-blue-700 border-blue-200"
              >
                Custom OG Title
              </Badge>
            )}
            {metadata.isOverrideOgImage && (
              <Badge
                variant="outline"
                className="text-[10px] bg-blue-50 text-blue-700 border-blue-200"
              >
                Custom OG Image
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 pt-2 space-y-3">
        <div className="max-w-md mx-auto border border-border rounded-xl overflow-hidden bg-card shadow-xs">
          <div className="relative aspect-[1200/630] bg-slate-100 flex items-center justify-center overflow-hidden">
            {displayImage ? (
              <Image
                src={displayImage}
                alt={displayTitle || 'Social share preview'}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="text-center p-6 space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center mx-auto text-slate-500">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  No social image configured
                </p>
                <p className="text-[10px] text-slate-400">
                  1200 × 630 px recommended
                </p>
              </div>
            )}
          </div>

          <div className="p-3.5 space-y-1 bg-card">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold block">
              Pathway
            </span>
            <h4 className="text-sm font-semibold text-foreground line-clamp-1 leading-snug">
              {displayTitle || 'Pathway — Education discovery, made clearer'}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {displayDescription || 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.'}
            </p>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground text-center">
          Open Graph card rendering preview. Actual display may vary slightly per social network.
        </p>
      </CardContent>
    </Card>
  )
}
