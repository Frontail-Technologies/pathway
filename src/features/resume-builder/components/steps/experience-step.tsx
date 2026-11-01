'use client'

import { Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RepeatableEntryCard } from '../repeatable-entry-card'
import { LabeledInput } from '../labeled-field'
import type { ExperienceEntry, ExperienceType } from '../../data/types'
import { makeEntryId } from '../../data/id'

const EXPERIENCE_TYPES: ExperienceType[] = ['Internship', 'Part-time', 'Full-time', 'Freelance', 'Volunteer']

export function ExperienceStep({ experience, onChange }: { experience: ExperienceEntry[]; onChange: (experience: ExperienceEntry[]) => void }) {
  const addEntry = () => {
    onChange([
      ...experience,
      { id: makeEntryId('exp'), organization: '', role: '', type: 'Internship', startDate: '', endDate: '', current: false, description: '' },
    ])
  }

  const updateEntry = (id: string, patch: Partial<ExperienceEntry>) => {
    onChange(experience.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)))
  }

  const removeEntry = (id: string) => onChange(experience.filter((entry) => entry.id !== id))

  return (
    <div className="flex flex-col gap-4">
      {experience.length === 0 && (
        <p className="rounded-[10px] border border-dashed p-4 text-sm text-muted-foreground">
          Optional — many students and freshers skip this section entirely. Add internships, part-time work, or volunteering only if you have any.
        </p>
      )}

      {experience.map((entry, index) => (
        <RepeatableEntryCard key={entry.id} title={entry.organization || `Experience ${index + 1}`} onRemove={() => removeEntry(entry.id)}>
          <LabeledInput label="Organization" required value={entry.organization} onChange={(value) => updateEntry(entry.id, { organization: value })} />
          <LabeledInput label="Role" required value={entry.role} onChange={(value) => updateEntry(entry.id, { role: value })} />

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${entry.id}-type`}>Type</Label>
            <Select value={entry.type} onValueChange={(value) => updateEntry(entry.id, { type: value as ExperienceType })} items={EXPERIENCE_TYPES.map((type) => ({ value: type, label: type }))}>
              <SelectTrigger id={`${entry.id}-type`} className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4}>
                {EXPERIENCE_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <LabeledInput label="Start Date" value={entry.startDate} onChange={(value) => updateEntry(entry.id, { startDate: value })} placeholder="May 2025" />

          {!entry.current && (
            <LabeledInput label="End Date" value={entry.endDate} onChange={(value) => updateEntry(entry.id, { endDate: value })} placeholder="Jul 2025" />
          )}

          <label className="flex items-center gap-2 self-end pb-1.5 text-sm text-foreground">
            <Checkbox checked={entry.current} onCheckedChange={(checked) => updateEntry(entry.id, { current: checked === true, endDate: checked ? '' : entry.endDate })} />
            Currently working here
          </label>

          <div className="sm:col-span-2">
            <Label htmlFor={`${entry.id}-description`}>Description / Responsibilities</Label>
            <Textarea
              id={`${entry.id}-description`}
              className="mt-1.5 min-h-20"
              value={entry.description}
              onChange={(event) => updateEntry(entry.id, { description: event.target.value })}
              placeholder="What did you work on? What was the outcome?"
            />
          </div>
        </RepeatableEntryCard>
      ))}

      <Button type="button" variant="outline" className="w-fit gap-1.5" onClick={addEntry}>
        <Plus className="size-4" aria-hidden="true" />
        Add Experience
      </Button>
    </div>
  )
}
