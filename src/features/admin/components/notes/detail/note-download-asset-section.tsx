import { AdminNote } from '@/features/admin/data/admin-notes'
import { formatFileSize } from '@/features/notes/types/note'
import { FileText, Lock, ShieldCheck, HardDrive, Layers } from 'lucide-react'

export function NoteDownloadAssetSection({ note }: { note: AdminNote }) {
  const asset = note.downloadableAsset

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Downloadable PDF Asset</h2>
        <span className="text-[11px] font-mono text-muted-foreground">
          {asset?.mimeType || 'application/pdf'}
        </span>
      </div>

      {asset ? (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-muted/20 rounded-lg border border-border/60 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                File Name
              </span>
              <p className="text-xs font-semibold text-foreground truncate">
                {asset.fileName || 'study-document.pdf'}
              </p>
            </div>

            <div className="p-3 bg-muted/20 rounded-lg border border-border/60 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                File Size
              </span>
              <p className="text-xs font-semibold text-foreground">
                {formatFileSize(asset.fileSizeBytes)}
              </p>
            </div>

            <div className="p-3 bg-muted/20 rounded-lg border border-border/60 space-y-1">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Page Count
              </span>
              <p className="text-xs font-semibold text-foreground">
                {asset.pageCount ? `${asset.pageCount} Pages` : 'Derived in file'}
              </p>
            </div>
          </div>

          <div className="p-3 bg-muted/20 rounded-lg border border-border/60 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-foreground">
              <Lock className="w-3.5 h-3.5 text-primary" />
              <span>Protected Asset Reference</span>
            </div>
            <p className="text-[11px] text-muted-foreground font-mono">
              {asset.assetId ? `Asset ID: ${asset.assetId}` : 'Server-managed protected asset'}
            </p>
            <p className="text-[10px] text-muted-foreground">
              Protected asset managed in private storage. Full file downloads are served exclusively via temporary signed URLs after server entitlement verification.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center bg-muted/20 rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground space-y-1">
          <FileText className="w-5 h-5 mx-auto text-muted-foreground/60" />
          <p>No downloadable document file attached yet.</p>
        </div>
      )}
    </div>
  )
}
