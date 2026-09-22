'use client'

import { Plus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { RepeatableEntryCard } from '../repeatable-entry-card'
import { LabeledInput } from '../labeled-field'
import type { ProjectEntry } from '../../data/types'
import { makeEntryId } from '../../data/id'

export function ProjectsStep({ projects, onChange }: { projects: ProjectEntry[]; onChange: (projects: ProjectEntry[]) => void }) {
  const addEntry = () => {
    onChange([...projects, { id: makeEntryId('proj'), name: '', role: '', technologies: [], description: '', link: '', githubLink: '' }])
  }

  const updateEntry = (id: string, patch: Partial<ProjectEntry>) => {
    onChange(projects.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)))
  }

  const removeEntry = (id: string) => onChange(projects.filter((entry) => entry.id !== id))

  return (
    <div className="flex flex-col gap-4">
      {projects.length === 0 && (
        <p className="rounded-[10px] border border-dashed p-4 text-sm text-muted-foreground">
          Projects carry a lot of weight for freshers — add academic, personal, or hackathon projects here.
        </p>
      )}

      {projects.map((entry, index) => (
        <RepeatableEntryCard key={entry.id} title={entry.name || `Project ${index + 1}`} onRemove={() => removeEntry(entry.id)}>
          <LabeledInput label="Project Name" required value={entry.name} onChange={(value) => updateEntry(entry.id, { name: value })} />
          <LabeledInput label="Role / Contribution" value={entry.role} onChange={(value) => updateEntry(entry.id, { role: value })} placeholder="Full-stack Developer" />
          <LabeledInput
            label="Technologies / Skills"
            value={entry.technologies.join(', ')}
            onChange={(value) => updateEntry(entry.id, { technologies: value.split(',').map((item) => item.trim()).filter(Boolean) })}
            placeholder="React, Node.js, PostgreSQL"
          />
          <LabeledInput label="Project Link" value={entry.link ?? ''} onChange={(value) => updateEntry(entry.id, { link: value })} placeholder="Optional" />
          <LabeledInput label="GitHub Link" value={entry.githubLink ?? ''} onChange={(value) => updateEntry(entry.id, { githubLink: value })} placeholder="Optional" />

          <div className="sm:col-span-2">
            <Label>Short Description</Label>
            <Textarea
              className="mt-1.5 min-h-20"
              value={entry.description}
              onChange={(event) => updateEntry(entry.id, { description: event.target.value })}
              placeholder="What does the project do, and what did you build?"
            />
          </div>
        </RepeatableEntryCard>
      ))}

      <Button type="button" variant="outline" className="w-fit gap-1.5" onClick={addEntry}>
        <Plus className="size-4" aria-hidden="true" />
        Add Project
      </Button>
    </div>
  )
}
