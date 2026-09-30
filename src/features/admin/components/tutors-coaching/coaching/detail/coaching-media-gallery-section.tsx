import { Image as ImageIcon } from 'lucide-react'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'

export function CoachingMediaGallerySection({ provider }: { provider: AdminCoachingProvider }) {
  const gallery = provider.gallery || []

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Media & Photo Gallery</h2>
        <span className="text-[11px] text-muted-foreground">{gallery.length} visual asset(s)</span>
      </div>

      {gallery.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {gallery.map((imgSrc, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="aspect-4/3 rounded-lg overflow-hidden bg-muted border border-border relative">
                { }
                <img
                  src={imgSrc}
                  alt={`${provider.name} gallery image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-mono text-muted-foreground truncate block">
                {imgSrc}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/20 border border-border/40 text-xs text-muted-foreground flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          <span>No gallery images attached to this provider record.</span>
        </div>
      )}
    </div>
  )
}
