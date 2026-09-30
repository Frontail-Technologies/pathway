'use client'

import { Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ADMIN_ENQUIRY_TIME_RANGES } from '../constants/dashboard'
import type { EnquiryTrendPoint } from '../types/dashboard'

export function AdminEnquiriesChart({
  data = [],
}: {
  data?: EnquiryTrendPoint[]
}) {
  const selectedRange = '30d'

  return (
    <div className="space-y-4 flex-1 flex flex-col">
      <div className="flex items-center justify-end shrink-0">
        <div
          className="flex items-center gap-1 bg-muted/40 p-1 rounded-lg opacity-60"
          title="Date range filters will activate once enquiry tracking is connected"
        >
          {ADMIN_ENQUIRY_TIME_RANGES.map((range) => (
            <Button
              key={range.id}
              type="button"
              disabled
              variant="ghost"
              size="xs"
              className={cn(
                'px-2.5 font-semibold cursor-not-allowed',
                range.id === selectedRange
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground'
              )}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-55 w-full rounded-xl bg-muted/20 border border-dashed border-border/80 flex flex-col items-center justify-center text-center p-6">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-2.5">
          <Inbox className="w-5 h-5" />
        </div>
        <p className="text-sm font-semibold text-foreground">No enquiry trend data yet</p>
      </div>
    </div>
  )
}
