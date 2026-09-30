import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { TutorFormData } from '../use-tutor-editor'

export function TutorBioSection({
  formData,
  errors,
  updateField,
  addArrayString,
  removeArrayString,
}: {
  formData: TutorFormData
  errors: Record<string, string>
  updateField: <K extends keyof TutorFormData>(field: K, value: TutorFormData[K]) => void
  addArrayString: (field: 'whoHelps' | 'traits', value: string) => void
  removeArrayString: (field: 'whoHelps' | 'traits', index: number) => void
}) {
  const [whoHelpsInput, setWhoHelpsInput] = useState('')

  return (
    <div id="section-bio" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Bio & Overview</h2>

      <div className="space-y-4 text-xs">
        <div className="space-y-1.5">
          <Label htmlFor="tutor-intro" className="text-xs font-semibold">
            Short Intro Summary <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="tutor-intro"
            value={formData.intro}
            onChange={(e) => updateField('intro', e.target.value)}
            placeholder="One line concept summary, e.g. Concept-first Physics teaching with regular problem-solving practice."
            rows={2}
            className="text-xs resize-none"
          />
          {errors.intro && <p className="text-[11px] text-destructive">{errors.intro}</p>}
        </div>

        {formData.hasDetailPage && (
          <div className="space-y-1.5">
            <Label htmlFor="tutor-long-bio" className="text-xs font-semibold">
              Deep Profile Bio
            </Label>
            <Textarea
              id="tutor-long-bio"
              value={formData.longBio}
              onChange={(e) => updateField('longBio', e.target.value)}
              placeholder="Detailed pedagogy, session structure, doubt solving, and revision approach."
              rows={4}
              className="text-xs"
            />
          </div>
        )}

        {formData.hasDetailPage && (
          <div className="space-y-2 pt-2 border-t border-border/50">
            <Label className="text-xs font-semibold">
              Student Profiles Supported (Who this tutor helps)
            </Label>
            <div className="flex gap-2">
              <Input
                value={whoHelpsInput}
                onChange={(e) => setWhoHelpsInput(e.target.value)}
                placeholder="e.g. Class 11–12 students strengthening Physics concepts"
                className="text-xs h-8"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    if (whoHelpsInput.trim()) {
                      addArrayString('whoHelps', whoHelpsInput)
                      setWhoHelpsInput('')
                    }
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (whoHelpsInput.trim()) {
                    addArrayString('whoHelps', whoHelpsInput)
                    setWhoHelpsInput('')
                  }
                }}
                className="h-8 text-xs gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </Button>
            </div>

            <div className="space-y-1.5 pt-1">
              {formData.whoHelps.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/40 border border-border/60 text-foreground text-xs"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeArrayString('whoHelps', idx)}
                    aria-label={`Remove ${item}`}
                    className="text-muted-foreground hover:text-destructive transition-colors p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
