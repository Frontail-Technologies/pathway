'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ResolvedSeoMetadata } from '@/features/seo/types/seo-metadata'
import { SeoSearchSnippet, SeoSocialCard } from '../shared/seo-previews'

export function SeoPreviewCard({ metadata }: { metadata: ResolvedSeoMetadata }) {
  return (
    <section id="preview" className="space-y-4 rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-[15px] font-semibold text-foreground">Preview</h2>
        <span className="font-mono text-[13px] text-muted-foreground">{metadata.targetRoutePath}</span>
      </div>
      <Tabs defaultValue="search" className="space-y-4">
        <TabsList variant="line">
          <TabsTrigger value="search">Search result</TabsTrigger>
          <TabsTrigger value="social">Social card</TabsTrigger>
        </TabsList>
        <TabsContent value="search" className="space-y-2">
          <SeoSearchSnippet metadata={metadata} />
          <p className="text-[13px] text-muted-foreground">Approximate. Search engines may rewrite the snippet.</p>
        </TabsContent>
        <TabsContent value="social" className="space-y-2">
          <SeoSocialCard metadata={metadata} />
          <p className="text-[13px] text-muted-foreground">How links look when shared on social networks and messaging apps.</p>
        </TabsContent>
      </Tabs>
    </section>
  )
}
