import { AdminBanner } from '@/features/admin/data/admin-banners'
import { History, ShieldAlert } from 'lucide-react'

export function BannerHistorySection({ banner }: { banner: AdminBanner }) {
  const hasHistory = !!banner.createdAt || !!banner.updatedAt

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center gap-2">
        <History className="w-4 h-4 text-muted-foreground" />
        <h2 className="text-sm font-bold text-foreground">Change History & Audit</h2>
      </div>

      {hasHistory ? (
        <div className="p-3.5 bg-muted/20 rounded-lg border border-border/60 space-y-2 text-xs">
          {banner.createdAt && (
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Created:</span>
              <span className="font-mono text-foreground">
                {new Date(banner.createdAt).toLocaleString()}
              </span>
            </div>
          )}
          {banner.updatedAt && (
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Last Updated:</span>
              <span className="font-mono text-foreground">
                {new Date(banner.updatedAt).toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Management Authority:</span>
            <span className="font-medium text-foreground">Manual Administrative</span>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center bg-muted/10 rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground">
          No change history is available yet.
        </div>
      )}
    </div>
  )
}
