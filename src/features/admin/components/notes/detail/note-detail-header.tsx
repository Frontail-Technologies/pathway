'use client'

import { AdminNote } from '@/features/admin/data/admin-notes'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Edit, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export function NoteDetailHeader({ note }: { note: AdminNote }) {
  const isFree = note.pricingType === 'free'

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/notes"
          className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Notes</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
              {note.title}
            </h1>
            <Badge variant={note.statusMeta.variant} className="text-xs font-semibold">
              {note.statusMeta.label}
            </Badge>
            <Badge
              variant={isFree ? 'secondary' : 'default'}
              className="text-xs font-semibold font-mono"
            >
              {note.formattedPrice}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Slug: <span className="text-foreground font-mono">/notes/{note.slug}</span> • Type:{' '}
            <span className="font-medium text-foreground">{note.typeMeta.label}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {note.status === 'published' && (
            <Button
              variant="outline"
              size="sm"
              render={
                <Link href={`/notes/${note.slug}`} target="_blank" className="flex items-center gap-1.5 text-xs font-medium">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Public View</span>
                </Link>
              }
            />
          )}
          <Button
            size="sm"
            render={
              <Link href={`/admin/notes/${note.id}/edit`} className="flex items-center gap-1.5 text-xs font-semibold">
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Note</span>
              </Link>
            }
          />
        </div>
      </div>
    </div>
  )
}
