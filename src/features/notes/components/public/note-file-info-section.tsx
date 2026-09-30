import { Note, formatFileSize } from '@/features/notes/types/note'
import { FileText, Layers, HardDrive, Calendar } from 'lucide-react'

export function NoteFileInfoSection({ note }: { note: Note }) {
  const asset = note.downloadableAsset

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/70 shadow-xs space-y-4">
      <h2 className="text-base font-bold text-foreground">File Specifications</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-muted/20 rounded-xl border border-border/60 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>Format</span>
          </div>
          <p className="text-xs font-semibold text-foreground">PDF Document</p>
        </div>

        <div className="p-3.5 bg-muted/20 rounded-xl border border-border/60 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Pages</span>
          </div>
          <p className="text-xs font-semibold text-foreground">
            {asset?.pageCount ? `${asset.pageCount} Pages` : 'Available in file'}
          </p>
        </div>

        <div className="p-3.5 bg-muted/20 rounded-xl border border-border/60 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
            <HardDrive className="w-3.5 h-3.5" />
            <span>Size</span>
          </div>
          <p className="text-xs font-semibold text-foreground">
            {formatFileSize(asset?.fileSizeBytes)}
          </p>
        </div>

        <div className="p-3.5 bg-muted/20 rounded-xl border border-border/60 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Updated</span>
          </div>
          <p className="text-xs font-semibold text-foreground">
            {note.updatedAt
              ? new Date(note.updatedAt).toLocaleDateString()
              : 'Recent Edition'}
          </p>
        </div>
      </div>
    </div>
  )
}
