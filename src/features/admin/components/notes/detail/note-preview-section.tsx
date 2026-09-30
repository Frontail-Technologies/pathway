import { AdminNote } from '@/features/admin/data/admin-notes'
import { Eye, FileText } from 'lucide-react'

export function NotePreviewSection({ note }: { note: AdminNote }) {
  const hasPreview = !!note.previewAsset?.publicUrl

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-bold text-foreground">Sample Preview Inspection</h2>
      </div>

      {hasPreview ? (
        <div className="space-y-3">
          <div className="aspect-video w-full max-w-lg rounded-lg overflow-hidden border border-border/60 bg-muted/30 flex items-center justify-center">
            {note.previewAsset?.mimeType?.startsWith('image/') ? (
              <img
                src={note.previewAsset.publicUrl}
                alt="Sample preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                src={`${note.previewAsset?.publicUrl}#toolbar=0`}
                title="Admin Note Sample Preview"
                className="w-full h-full border-0"
              />
            )}
          </div>
          <p className="text-[11px] font-mono text-muted-foreground truncate">
            {note.previewAsset?.publicUrl}
          </p>
        </div>
      ) : (
        <div className="p-6 text-center bg-muted/20 rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground space-y-1">
          <FileText className="w-5 h-5 mx-auto text-muted-foreground/60" />
          <p>No separate sample preview asset uploaded.</p>
        </div>
      )}
    </div>
  )
}
