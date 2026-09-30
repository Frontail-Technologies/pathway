import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import type { TutorFormData } from '../use-tutor-editor'

export function TutorTeachingProfileSection({
  formData,
  addArrayString,
  removeArrayString,
}: {
  formData: TutorFormData
  addArrayString: (field: 'whoHelps' | 'traits', value: string) => void
  removeArrayString: (field: 'whoHelps' | 'traits', index: number) => void
}) {
  const [traitInput, setTraitInput] = useState('')

  return (
    <div id="section-teaching" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Teaching Profile & Traits</h2>

      <div className="space-y-3 text-xs">
        <p className="text-muted-foreground">
          Short teaching approach tags drawn from the tutor's methodology (e.g. Concept-first teaching, Regular revision support). No rank/result guarantees.
        </p>

        <div className="flex gap-2">
          <Input
            value={traitInput}
            onChange={(e) => setTraitInput(e.target.value)}
            placeholder="e.g. Step-by-step problem solving"
            className="text-xs h-8"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                if (traitInput.trim()) {
                  addArrayString('traits', traitInput)
                  setTraitInput('')
                }
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (traitInput.trim()) {
                addArrayString('traits', traitInput)
                setTraitInput('')
              }
            }}
            className="h-8 text-xs gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {formData.traits.map((trait, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-muted border border-border text-foreground text-xs"
            >
              <span>{trait}</span>
              <button
                type="button"
                onClick={() => removeArrayString('traits', idx)}
                aria-label={`Remove trait ${trait}`}
                className="text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
