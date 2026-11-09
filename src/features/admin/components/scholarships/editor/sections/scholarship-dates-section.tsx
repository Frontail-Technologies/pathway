import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Trash2 } from 'lucide-react'
import { applicationStatusOptions } from '../../shared/scholarship-constants'
import { type ApplicationStatus } from '@/features/scholarships/data/scholarships'

export function ScholarshipDatesSection({
  deadline,
  setDeadline,
  deadlineDisplay,
  setDeadlineDisplay,
  applicationStatus,
  setApplicationStatus,
  importantDates,
  newDateLabel,
  setNewDateLabel,
  newDateValue,
  setNewDateValue,
  onAddDateItem,
  onRemoveDateItem,
}: {
  deadline: string
  setDeadline: (v: string) => void
  deadlineDisplay: string
  setDeadlineDisplay: (v: string) => void
  applicationStatus: ApplicationStatus | 'not-recorded'
  setApplicationStatus: (v: ApplicationStatus | 'not-recorded') => void
  importantDates: { label: string; value: string }[]
  newDateLabel: string
  setNewDateLabel: (v: string) => void
  newDateValue: string
  setNewDateValue: (v: string) => void
  onAddDateItem: () => void
  onRemoveDateItem: (idx: number) => void
}) {
  return (
    <section id="dates" className="rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6 space-y-5 scroll-mt-20">
      <h2 className="text-[15px] font-semibold text-foreground">
        Dates
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Application window
            </label>
            <Select
              items={applicationStatusOptions}
              value={applicationStatus}
              onValueChange={(val) => setApplicationStatus(val as any)}
            >
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Window status" />
              </SelectTrigger>
              <SelectContent>
                {applicationStatusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Deadline
            </label>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">
              Deadline as shown
            </label>
            <Input
              value={deadlineDisplay}
              onChange={(e) => setDeadlineDisplay(e.target.value)}
              placeholder="e.g. 15 Oct 2026"
              className="text-sm"
            />
          </div>
        </div>

        <div className="space-y-2 pt-3 border-t border-border/60">
          <label className="text-sm font-medium text-foreground block">
            Other dates
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-5">
              <Input
                value={newDateLabel}
                onChange={(e) => setNewDateLabel(e.target.value)}
                placeholder="Label, e.g. Document verification"
                className="text-sm"
              />
            </div>
            <div className="sm:col-span-5">
              <Input
                value={newDateValue}
                onChange={(e) => setNewDateValue(e.target.value)}
                placeholder="Date, e.g. Nov 2026"
                className="text-sm"
              />
            </div>
            <div className="sm:col-span-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onAddDateItem}
                className="w-full text-sm h-9"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add
              </Button>
            </div>
          </div>

          {importantDates.length > 0 ? (
            <div className="divide-y divide-border/60 rounded-lg border border-border/60 overflow-hidden bg-card mt-2">
              {importantDates.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 sm:px-3.5 flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 min-w-0">
                    <span className="font-semibold text-foreground sm:w-1/3 truncate">
                      {item.label}
                    </span>
                    <span className="text-muted-foreground sm:w-2/3 truncate">
                      {item.value}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveDateItem(idx)}
                    className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] text-muted-foreground">
              No other dates added.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
