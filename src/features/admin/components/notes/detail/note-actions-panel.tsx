import { AdminNote } from '@/features/admin/data/admin-notes'
import { Button } from '@/components/ui/button'
import { Edit, BookOpen, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function NoteActionsPanel({ note }: { note: AdminNote }) {
  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Administrative Actions
      </h3>

      <div className="space-y-2">
        <Button
          className="w-full justify-center text-xs font-semibold gap-1.5"
          render={
            <Link href={`/admin/notes/${note.id}/edit`}>
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Note Details</span>
            </Link>
          }
        />
        {note.status === 'published' && (
          <Button
            variant="outline"
            className="w-full justify-center text-xs font-medium gap-1.5"
            render={
              <Link href={`/notes/${note.slug}`} target="_blank">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Public Page</span>
              </Link>
            }
          />
        )}
        <Button
          variant="ghost"
          className="w-full justify-center text-xs font-medium gap-1.5 text-muted-foreground"
          render={
            <Link href="/admin/notes">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Back to Directory</span>
            </Link>
          }
        />
      </div>
    </div>
  )
}
