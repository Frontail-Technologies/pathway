'use client'

import * as React from 'react'
import Image from 'next/image'
import { Eye, Globe, Share2, Sparkles, Image as ImageIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ResolvedSeoMetadata } from '@/features/seo/types/seo-metadata'

interface SeoPreviewCardProps {
  metadata: ResolvedSeoMetadata
}

export function SeoPreviewCard({ metadata }: SeoPreviewCardProps) {
  const displayImage = metadata.ogImage
  const displayTitle = metadata.ogTitle || metadata.title
  const displayDescription = metadata.ogDescription || metadata.description

  return (
    <Card id="preview" className="border-0 shadow-xs">
      <CardHeader className="p-4 sm:p-5 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <CardTitle className="text-sm font-semibold">Live Previews</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">
            Target: <code className="font-mono text-[11px]">{metadata.targetRoutePath}</code>
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-5 pt-2">
        <Tabs defaultValue="search" className="space-y-4">
          <TabsList variant="line">
            <TabsTrigger value="search">
              <Globe />
              Search Preview
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 />
              Social Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-3 pt-1">
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
                <h3 className="text-[#1a0dab] text-base sm:text-lg font-medium leading-snug line-clamp-1">
                  {metadata.title || 'Pathway — Education discovery, made clearer'}
                </h3>
              </div>

              <p className="text-[#4d5156] text-xs sm:text-sm leading-relaxed line-clamp-2 pt-0.5">
                {metadata.description || 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.'}
              </p>
            </div>

            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-muted-foreground shrink-0" />
              <span>Approximate search-result preview. Google may rewrite snippets.</span>
            </p>
          </TabsContent>

          <TabsContent value="social" className="space-y-3 pt-1">
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
              Social Preview (Open Graph). Renders across Facebook, LinkedIn, X, and messaging cards.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
