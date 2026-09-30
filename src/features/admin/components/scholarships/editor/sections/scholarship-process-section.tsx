import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, X } from 'lucide-react'

export function ScholarshipProcessSection({
  officialApplyUrl,
  setOfficialApplyUrl,
  applicationSteps,
  newStepInput,
  setNewStepInput,
  onAddStep,
  onRemoveStep,
  selectionProcess,
  newSelectionInput,
  setNewSelectionInput,
  onAddSelectionStage,
  onRemoveSelectionStage,
}: {
  officialApplyUrl: string
  setOfficialApplyUrl: (v: string) => void
  applicationSteps: string[]
  newStepInput: string
  setNewStepInput: (v: string) => void
  onAddStep: () => void
  onRemoveStep: (idx: number) => void
  selectionProcess: string[]
  newSelectionInput: string
  setNewSelectionInput: (v: string) => void
  onAddSelectionStage: () => void
  onRemoveSelectionStage: (idx: number) => void
}) {
  return (
    <section id="process" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-5 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Application Procedure & Selection
      </h2>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-foreground">
            Official Application Portal URL
          </label>
          <Input
            value={officialApplyUrl}
            onChange={(e) => setOfficialApplyUrl(e.target.value)}
            placeholder="e.g. https://scholarships.gov.in/ or https://www.aicte-india.org/"
            className="text-xs font-mono"
          />
        </div>

        <div className="space-y-2 pt-3 border-t border-border/60">
          <label className="text-xs font-semibold text-foreground block">
            Step-by-Step Application Procedure
          </label>
          <div className="flex gap-2">
            <Input
              value={newStepInput}
              onChange={(e) => setNewStepInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  onAddStep()
                }
              }}
              placeholder="e.g. Visit official portal and register with student academic details"
              className="text-xs flex-1"
            />
            <Button type="button" variant="outline" size="sm" onClick={onAddStep} className="text-xs">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Step
            </Button>
          </div>

          {applicationSteps.length > 0 ? (
            <div className="space-y-2 pt-1">
              {applicationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/20 border border-border/60 text-xs"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-[11px] mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-foreground leading-relaxed font-medium">{step}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveStep(idx)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-muted-foreground italic">
              No step-by-step application procedure added yet.
            </p>
          )}
        </div>

        <div className="space-y-2 pt-3 border-t border-border/60">
          <label className="text-xs font-semibold text-foreground block">
            Selection & Verification Stages
          </label>
          <div className="flex gap-2">
            <Input
              value={newSelectionInput}
              onChange={(e) => setNewSelectionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  onAddSelectionStage()
                }
              }}
              placeholder="e.g. Online Scrutiny / Document Verification / Merit List Publication"
              className="text-xs flex-1"
            />
            <Button type="button" variant="outline" size="sm" onClick={onAddSelectionStage} className="text-xs">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Stage
            </Button>
          </div>

          {selectionProcess.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectionProcess.map((stg, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs gap-1 bg-muted px-2 py-0.5">
                  {stg}
                  <button type="button" onClick={() => onRemoveSelectionStage(idx)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
