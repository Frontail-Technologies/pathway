import { Note } from '@/features/notes/types/note'
import { Eye, FileText, AlertCircle } from 'lucide-react'

export function NotePreviewSection({ note }: { note: Note }) {
  const hasPreview = !!note.previewAsset?.publicUrl

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/70 shadow-xs space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="w-4 h-4 text-primary" />
        <h2 className="text-base font-bold text-foreground">Sample Preview</h2>
      </div>

      {hasPreview ? (
        <div className="space-y-3">
          <div className="aspect-4/3 w-full rounded-xl overflow-hidden border border-border/70 bg-muted/30 flex items-center justify-center">
            {note.previewAsset?.mimeType?.startsWith('image/') ? (
              <img
                src={note.previewAsset.publicUrl}
                alt={`Sample preview for ${note.title}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <iframe
                src={`${note.previewAsset?.publicUrl}#toolbar=0`}
                title={`Preview of ${note.title}`}
                className="w-full h-full border-0"
              />
            )}
          </div>
          <p className="text-[11px] text-muted-foreground text-center">
            Sample excerpt preview. Full notes accessible upon entitlement.
          </p>
        </div>
      ) : (
        <div className="p-10 text-center bg-muted/20 rounded-xl border border-dashed border-border space-y-2">
          <FileText className="w-8 h-8 mx-auto text-muted-foreground/60" />
          <p className="text-xs font-semibold text-foreground">Preview not available yet</p>
          <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
            A sample preview has not been uploaded for this document yet. Review document specifications below.
          </p>
        </div>
      )}
    </div>
  )
}
