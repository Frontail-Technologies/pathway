'use client'

import { Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RepeatableEntryCard } from '../repeatable-entry-card'
import { LabeledInput } from '../labeled-field'
import type { AchievementEntry, AchievementType } from '../../data/types'
import { makeEntryId } from '../../data/id'

const TYPES: AchievementType[] = ['Achievement', 'Certification', 'Award']

export function AchievementsStep({ achievements, onChange }: { achievements: AchievementEntry[]; onChange: (achievements: AchievementEntry[]) => void }) {
  const addEntry = () => {
    onChange([...achievements, { id: makeEntryId('ach'), type: 'Achievement', title: '', issuer: '', date: '', description: '', link: '' }])
  }

  const updateEntry = (id: string, patch: Partial<AchievementEntry>) => {
    onChange(achievements.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)))
  }

  const removeEntry = (id: string) => onChange(achievements.filter((entry) => entry.id !== id))

  return (
    <div className="flex flex-col gap-4">
      {achievements.length === 0 && (
        <p className="rounded-[10px] border border-dashed p-4 text-sm text-muted-foreground">
          Add achievements, certifications, or awards — competitions, online course certificates, scholarships, etc.
        </p>
      )}

      {achievements.map((entry, index) => (
        <RepeatableEntryCard key={entry.id} title={entry.title || `${entry.type} ${index + 1}`} onRemove={() => removeEntry(entry.id)}>
          <div className="flex flex-col gap-1.5">
            <Label>Type</Label>
            <Select value={entry.type} onValueChange={(value) => updateEntry(entry.id, { type: value as AchievementType })} items={TYPES.map((type) => ({ value: type, label: type }))}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false} side="bottom" align="start" sideOffset={4}>
                {TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <LabeledInput label="Title" required value={entry.title} onChange={(value) => updateEntry(entry.id, { title: value })} />
          <LabeledInput label="Issuer / Organization" value={entry.issuer ?? ''} onChange={(value) => updateEntry(entry.id, { issuer: value })} />
          <LabeledInput label="Date" value={entry.date ?? ''} onChange={(value) => updateEntry(entry.id, { date: value })} placeholder="2025" />
          <LabeledInput label="Credential Link" value={entry.link ?? ''} onChange={(value) => updateEntry(entry.id, { link: value })} placeholder="Optional" />

          <div className="sm:col-span-2">
            <Label>Description</Label>
            <Textarea className="mt-1.5 min-h-16" value={entry.description ?? ''} onChange={(event) => updateEntry(entry.id, { description: event.target.value })} placeholder="Optional" />
          </div>
        </RepeatableEntryCard>
      ))}

      <Button type="button" variant="outline" className="w-fit gap-1.5" onClick={addEntry}>
        <Plus className="size-4" aria-hidden="true" />
        Add Achievement / Certification
      </Button>
    </div>
  )
}
