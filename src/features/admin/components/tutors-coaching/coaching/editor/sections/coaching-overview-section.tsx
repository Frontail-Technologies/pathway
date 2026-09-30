import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { CoachingFormData } from '../use-coaching-editor'

export function CoachingOverviewSection({
  formData,
  errors,
  updateField,
  addHighlight,
  removeHighlight,
}: {
  formData: CoachingFormData
  errors: Record<string, string>
  updateField: <K extends keyof CoachingFormData>(field: K, value: CoachingFormData[K]) => void
  addHighlight: (highlight: string) => void
  removeHighlight: (index: number) => void
}) {
  const [highlightInput, setHighlightInput] = useState('')

  return (
    <div id="section-overview" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Overview & Value Proposition</h2>

      <div className="space-y-4 text-xs">
        <div className="space-y-1.5">
          <Label htmlFor="coaching-program-label" className="text-xs font-semibold">
            Program Tagline / Label <span className="text-destructive">*</span>
          </Label>
          <Input
            id="coaching-program-label"
            value={formData.programLabel}
            onChange={(e) => updateField('programLabel', e.target.value)}
            placeholder="e.g. JEE Main & Advanced preparation"
            className="text-xs h-9"
          />
          {errors.programLabel && <p className="text-[11px] text-destructive">{errors.programLabel}</p>}
        </div>

        {formData.hasDetailPage && (
          <div className="space-y-1.5">
            <Label htmlFor="coaching-about-copy" className="text-xs font-semibold">
              Deep Profile Description
            </Label>
            <Textarea
              id="coaching-about-copy"
              value={formData.aboutCopy}
              onChange={(e) => updateField('aboutCopy', e.target.value)}
              placeholder="Comprehensive summary of coaching batches, doubt-clearing labs, and curriculum delivery."
              rows={4}
              className="text-xs"
            />
          </div>
        )}

        <div className="space-y-2 pt-2 border-t border-border/50">
          <Label className="text-xs font-semibold">Key Highlights</Label>
          <div className="flex gap-2">
            <Input
              value={highlightInput}
              onChange={(e) => setHighlightInput(e.target.value)}
              placeholder="e.g. Foundation and repeater batches"
              className="text-xs h-8"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (highlightInput.trim()) {
                    addHighlight(highlightInput)
                    setHighlightInput('')
                  }
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                if (highlightInput.trim()) {
                  addHighlight(highlightInput)
                  setHighlightInput('')
                }
              }}
              className="h-8 text-xs gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </Button>
          </div>

          <div className="space-y-1.5 pt-1">
            {formData.highlights.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/40 border border-border/60 text-foreground text-xs"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeHighlight(idx)}
                  aria-label={`Remove highlight ${item}`}
                  className="text-muted-foreground hover:text-destructive transition-colors p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
