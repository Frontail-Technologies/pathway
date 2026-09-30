import { AdminNote } from '@/features/admin/data/admin-notes'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function NoteMobileCard({ note }: { note: AdminNote }) {
  return (
    <div className="p-4 rounded-xl border border-border/70 bg-card space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg border border-border/80 bg-muted/40 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0 space-y-0.5">
            <h3 className="text-xs font-bold text-foreground truncate">{note.title}</h3>
            <p className="text-[11px] text-muted-foreground truncate font-mono">/{note.slug}</p>
          </div>
        </div>

        <Badge variant={note.statusMeta.variant} className="text-[10px] shrink-0">
          {note.statusMeta.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border/40">
        <div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
            Classification
          </span>
          <span className="font-medium text-foreground truncate block">
            {note.subject || 'General'}
          </span>
        </div>

        <div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
            Pricing
          </span>
          <span className="font-bold text-foreground truncate block font-mono">
            {note.formattedPrice}
          </span>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-end gap-2 border-t border-border/40">
        <Button
          variant="outline"
          size="sm"
          render={<Link href={`/admin/notes/${note.id}/edit`}>Edit</Link>}
          className="h-7 text-xs px-2.5"
        />
        <Button
          size="sm"
          render={
            <Link href={`/admin/notes/${note.id}`} className="inline-flex items-center gap-1">
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          }
          className="h-7 text-xs px-2.5"
        />
      </div>
    </div>
  )
}
