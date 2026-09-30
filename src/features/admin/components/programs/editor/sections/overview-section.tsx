import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export type OverviewSectionProps = {
  description: string
  onDescriptionChange: (val: string) => void
}

export function OverviewSection({
  description,
  onDescriptionChange,
}: OverviewSectionProps) {
  return (
    <section id="overview" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Overview
      </h2>

      <div className="space-y-1.5">
        <Label htmlFor="prog-desc" className="text-xs font-semibold">
          Overview & Academic Objectives
        </Label>
        <Textarea
          id="prog-desc"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="High-level discipline description, foundational academic scope, and learning outcomes..."
          rows={4}
          className="text-xs resize-none"
        />
      </div>
    </section>
  )
}
