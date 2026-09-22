'use client'

import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RepeatableEntryCard } from '../repeatable-entry-card'
import { LabeledInput } from '../labeled-field'
import type { EducationEntry } from '../../data/types'
import { makeEntryId } from '../../data/id'

export function EducationStep({ education, onChange }: { education: EducationEntry[]; onChange: (education: EducationEntry[]) => void }) {
  const addEntry = () => {
    onChange([
      ...education,
      { id: makeEntryId('edu'), institute: '', degree: '', specialization: '', startYear: '', endYear: '', grade: '', location: '' },
    ])
  }

  const updateEntry = (id: string, patch: Partial<EducationEntry>) => {
    onChange(education.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)))
  }

  const removeEntry = (id: string) => onChange(education.filter((entry) => entry.id !== id))

  return (
    <div className="flex flex-col gap-4">
      {education.length === 0 && (
        <p className="rounded-[10px] border border-dashed p-4 text-sm text-muted-foreground">
          Add your most recent education first — school, college, or university.
        </p>
      )}

      {education.map((entry, index) => (
        <RepeatableEntryCard key={entry.id} title={entry.institute || `Education ${index + 1}`} onRemove={() => removeEntry(entry.id)}>
          <LabeledInput label="Institute / College / School" required value={entry.institute} onChange={(value) => updateEntry(entry.id, { institute: value })} />
          <LabeledInput label="Degree / Course" required value={entry.degree} onChange={(value) => updateEntry(entry.id, { degree: value })} placeholder="B.Tech, Computer Science" />
          <LabeledInput label="Specialization" value={entry.specialization ?? ''} onChange={(value) => updateEntry(entry.id, { specialization: value })} />
          <LabeledInput label="Location" value={entry.location ?? ''} onChange={(value) => updateEntry(entry.id, { location: value })} />
          <LabeledInput label="Start Year" required value={entry.startYear} onChange={(value) => updateEntry(entry.id, { startYear: value })} placeholder="2022" />
          <LabeledInput label="End Year / Expected" required value={entry.endYear} onChange={(value) => updateEntry(entry.id, { endYear: value })} placeholder="2026" />
          <LabeledInput label="Grade / CGPA / %" value={entry.grade ?? ''} onChange={(value) => updateEntry(entry.id, { grade: value })} />
        </RepeatableEntryCard>
      ))}

      <Button type="button" variant="outline" className="w-fit gap-1.5" onClick={addEntry}>
        <Plus className="size-4" aria-hidden="true" />
        Add Education
      </Button>
    </div>
  )
}
