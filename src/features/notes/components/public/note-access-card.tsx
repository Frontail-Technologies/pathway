'use client'

import * as React from 'react'
import { Note, formatINRFromPaise } from '@/features/notes/types/note'
import { Button } from '@/components/ui/button'
import { Download, ShoppingBag, ShieldCheck, Lock, Info } from 'lucide-react'

export function NoteAccessCard({ note }: { note: Note }) {
  const isFree = note.pricingType === 'free'
  const [notice, setNotice] = React.useState<string | null>(null)

  const handleAction = () => {
    if (isFree) {
      setNotice('Free notes downloading will connect to your Student Library once the storage pipeline is live.')
    } else {
      setNotice('Purchasing will be available once payments are connected.')
    }
  }

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/70 shadow-xs space-y-5">
      <div className="space-y-1">
        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
          Access & Entitlement
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            {formatINRFromPaise(note.pricePaise)}
          </span>
          <span className="text-xs text-muted-foreground">
            {isFree ? '• Full public access' : '• One-time purchase access'}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          onClick={handleAction}
          className="w-full h-11 text-xs sm:text-sm font-semibold gap-2 shadow-xs"
        >
          {isFree ? (
            <>
              <Download className="w-4 h-4" />
              <span>Download Free Notes</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Buy Notes — {formatINRFromPaise(note.pricePaise)}</span>
            </>
          )}
        </Button>

        {notice && (
          <div className="p-3 bg-muted/40 rounded-xl border border-border text-xs text-muted-foreground flex items-start gap-2">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{notice}</span>
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-border/60 space-y-2.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>Secured digital entitlement</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary shrink-0" />
          <span>Protected temporary signed downloads</span>
        </div>
      </div>
    </div>
  )
}
