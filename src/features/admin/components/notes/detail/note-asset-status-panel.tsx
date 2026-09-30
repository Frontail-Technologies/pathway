import { AdminNote } from '@/features/admin/data/admin-notes'
import { HardDrive, Lock, ShieldCheck } from 'lucide-react'

export function NoteAssetStatusPanel({ note }: { note: AdminNote }) {
  const hasAsset = !!note.downloadableAsset

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Storage & Delivery Security
      </h3>

      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <HardDrive className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="font-semibold text-foreground">
            {hasAsset ? 'Asset Connected' : 'No Asset Uploaded'}
          </span>
        </div>

        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Production downloads use temporary, short-lived signed URLs from private object storage. No permanent public links are exposed.
        </p>
      </div>

      <div className="pt-3 border-t border-border/60 text-[10px] text-muted-foreground">
        Admin Storage API connection required to persist new binary files.
      </div>
    </div>
  )
}
