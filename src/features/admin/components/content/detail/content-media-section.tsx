import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { Image as ImageIcon, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export function ContentMediaSection({ entry }: { entry: AdminContentEntry }) {
  return (
    <div className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">Featured / Hero Media</h2>
        </div>
        <span className="text-[11px] text-muted-foreground font-medium">16:9 Recommended</span>
      </div>

      {entry.heroImage ? (
        <div className="space-y-3">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border/60 bg-muted">
            <Image
              src={entry.heroImage}
              alt={entry.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-mono text-[11px] truncate max-w-[320px]">
              {entry.heroImage}
            </span>
            <a
              href={entry.heroImage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
            >
              <span>Open in new tab</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center bg-muted/10 rounded-lg border border-dashed border-border/70 space-y-2">
          <ImageIcon className="w-8 h-8 text-muted-foreground/50 mx-auto" />
          <p className="text-xs text-muted-foreground">
            No hero image uploaded. A default brand placeholder is used on public surfaces.
          </p>
        </div>
      )}
    </div>
  )
}
