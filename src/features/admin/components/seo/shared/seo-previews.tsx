import Image from 'next/image'
import type { ResolvedSeoMetadata } from '@/features/seo/types/seo-metadata'

const FALLBACK_TITLE = 'Pathway — Education discovery, made clearer'
const FALLBACK_DESCRIPTION = 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.'

/** Approximation of a search result. Search engines may rewrite it. */
export function SeoSearchSnippet({ metadata }: { metadata: ResolvedSeoMetadata }) {
  return (
    <div className="space-y-1 rounded-lg border border-border bg-card p-4">
      <p className="truncate text-[13px] text-muted-foreground">
        Pathway › <span className="font-mono">{metadata.canonicalPath}</span>
      </p>
      <p className="line-clamp-1 text-base font-medium text-primary">{metadata.title || FALLBACK_TITLE}</p>
      <p className="line-clamp-2 text-sm text-muted-foreground">{metadata.description || FALLBACK_DESCRIPTION}</p>
    </div>
  )
}

/** Approximation of a link card on social networks and messaging apps. */
export function SeoSocialCard({ metadata }: { metadata: ResolvedSeoMetadata }) {
  const title = metadata.ogTitle || metadata.title || FALLBACK_TITLE
  const description = metadata.ogDescription || metadata.description || FALLBACK_DESCRIPTION
  return (
    <div className="max-w-md overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative flex aspect-[1200/630] items-center justify-center bg-muted">
        {metadata.ogImage ? (
          <Image src={metadata.ogImage} alt={title} fill className="object-cover" unoptimized />
        ) : (
          <p className="text-[13px] text-muted-foreground">No image · 1200 × 630 px recommended</p>
        )}
      </div>
      <div className="space-y-0.5 p-3.5">
        <p className="text-[13px] text-muted-foreground">Pathway</p>
        <p className="line-clamp-1 text-sm font-medium text-foreground">{title}</p>
        <p className="line-clamp-2 text-[13px] text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
