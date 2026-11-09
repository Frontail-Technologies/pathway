import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, CheckCircle2 } from 'lucide-react'

export function ScholarshipEligibilitySection({
  shortEligibility,
  newShortEligInput,
  setNewShortEligInput,
  onAddShortElig,
  onRemoveShortElig,
  eligibilityRows,
  newRowLabel,
  setNewRowLabel,
  newRowValue,
  setNewRowValue,
  onAddEligRow,
  onRemoveEligRow,
}: {
  shortEligibility: string[]
  newShortEligInput: string
  setNewShortEligInput: (v: string) => void
  onAddShortElig: () => void
  onRemoveShortElig: (idx: number) => void
  eligibilityRows: { label: string; value: string }[]
  newRowLabel: string
  setNewRowLabel: (v: string) => void
  newRowValue: string
  setNewRowValue: (v: string) => void
  onAddEligRow: () => void
  onRemoveEligRow: (idx: number) => void
}) {
  return (
    <section id="eligibility" className="rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6 space-y-5 scroll-mt-20">
      <h2 className="text-[15px] font-semibold text-foreground">
        Eligibility
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground block">
            Key requirements
          </label>
          <div className="flex gap-2">
            <Input
              value={newShortEligInput}
              onChange={(e) => setNewShortEligInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  onAddShortElig()
                }
              }}
              placeholder="e.g. Class 12 pass with 80%+ marks in board examination"
              className="text-sm flex-1"
            />
            <Button type="button" variant="outline" size="sm" onClick={onAddShortElig} className="text-sm">
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add
            </Button>
          </div>

          {shortEligibility.length > 0 ? (
            <div className="space-y-1.5 pt-1">
              {shortEligibility.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-muted/20 border border-border/60 text-sm"
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-foreground leading-snug">{item}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveShortElig(idx)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-muted-foreground">
              No requirements added yet.
            </p>
          )}
        </div>

        <div className="space-y-2 pt-3 border-t border-border/60">
          <label className="text-sm font-medium text-foreground block">
            Criteria
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-5">
              <Input
                value={newRowLabel}
                onChange={(e) => setNewRowLabel(e.target.value)}
                placeholder="Criterion, e.g. Marks"
                className="text-sm"
              />
            </div>
            <div className="sm:col-span-5">
              <Input
                value={newRowValue}
                onChange={(e) => setNewRowValue(e.target.value)}
                placeholder="Requirement, e.g. 75% in PCM"
                className="text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAddEligRow}
                className="w-full text-sm h-9"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add
              </Button>
            </div>
          </div>

          {eligibilityRows.length > 0 ? (
            <div className="divide-y divide-border/60 rounded-lg border border-border/60 overflow-hidden bg-card mt-2">
              {eligibilityRows.map((row, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:px-3.5 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 min-w-0">
                    <span className="font-semibold text-foreground sm:w-1/3 truncate">
                      {row.label}
                    </span>
                    <span className="text-muted-foreground sm:w-2/3 truncate">
                      {row.value}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveEligRow(idx)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-muted-foreground">
              No criteria added yet.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
