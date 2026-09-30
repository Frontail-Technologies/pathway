'use client'

import * as React from 'react'
import { Note, formatFileSize, noteTypeMap } from '@/features/notes/types/note'
import { getAccessibleNotesForStudent } from '@/features/notes/selectors/note-selectors'
import { useDemoAuth } from '@/features/student/state/demo-auth-provider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Download, FileText, Lock, ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export function StudentMyNotesView() {
  const { signedIn } = useDemoAuth()
  const [activeTab, setActiveTab] = React.useState<'all' | 'purchased' | 'free'>('all')

  
  const accessibleNotes = React.useMemo(() => {
    return getAccessibleNotesForStudent(signedIn ? 'demo-student' : 'guest')
  }, [signedIn])

  const filteredNotes = React.useMemo(() => {
    if (activeTab === 'all') return accessibleNotes
    if (activeTab === 'purchased') {
      return accessibleNotes.filter((n) => n.pricingType === 'paid')
    }
    return accessibleNotes.filter((n) => n.pricingType === 'free')
  }, [accessibleNotes, activeTab])

  const handleDownload = (_note: Note) => {
    toast.info('Secure download becomes available after server-side access verification.')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
            My Notes Library
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Your library of purchased study packages and accessed educational notes.
          </p>
        </div>

        <Link
          href="/notes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
        >
          <span>Browse Notes Marketplace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {accessibleNotes.length === 0 ? (
        <div className="p-10 sm:p-14 text-center bg-card rounded-2xl border border-dashed border-border/80 space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-foreground">
              No notes in your library yet
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Purchased and free notes you access will appear here for secure reading and download.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/notes"
              className="inline-flex items-center gap-1.5 h-9 px-4 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
            >
              <span>Browse Notes</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            {(['all', 'purchased', 'free'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab} Notes
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredNotes.map((note) => {
              const typeMeta = noteTypeMap[note.noteType] || noteTypeMap.other
              return (
                <div
                  key={note.id}
                  className="p-4 rounded-xl border border-border/70 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px]">
                        {typeMeta.label}
                      </Badge>
                      <Badge
                        variant={note.pricingType === 'free' ? 'secondary' : 'default'}
                        className="text-[10px]"
                      >
                        {note.pricingType === 'free' ? 'Free Access' : 'Purchased'}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold text-foreground truncate">{note.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {note.subject} • {note.downloadableAsset?.pageCount || 1} Pages •{' '}
                      {formatFileSize(note.downloadableAsset?.fileSizeBytes)}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleDownload(note)}
                    className="text-xs font-semibold gap-1.5 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </Button>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
