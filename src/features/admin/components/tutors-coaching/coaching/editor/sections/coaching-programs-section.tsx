import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { CoachingProgram } from '@/features/coaching/data/coaching'
import { ChipToggleGroup, EditorSection, Field, RemoveButton } from '../../../shared/editor-kit'
import { COACHING_COURSE_TYPE_OPTIONS, sentenceCase } from '../../../shared/tutor-coaching-constants'
import type { CoachingFormData } from '../use-coaching-editor'

const PROGRAM_MODES = ['Classroom', 'Online', 'Hybrid'].map((value) => ({ value, label: value }))
const COURSE_TYPES = COACHING_COURSE_TYPE_OPTIONS.map((value) => ({ value, label: sentenceCase(value) }))

export function CoachingProgramsSection({
  formData,
  toggleArrayItem,
  addProgram,
  removeProgram,
}: {
  formData: CoachingFormData
  toggleArrayItem: <T>(field: 'exams' | 'subjects' | 'modes' | 'courseTypes', item: T) => void
  addProgram: (program: CoachingProgram) => void
  removeProgram: (index: number) => void
}) {
  const [name, setName] = useState('')
  const [mode, setMode] = useState('Classroom')
  const [courseType, setCourseType] = useState<string>('Classroom Program')
  const [description, setDescription] = useState('')
  const add = () => {
    if (!name.trim() || !description.trim()) return
    addProgram({ name: name.trim(), mode, courseType, description: description.trim() })
    setName('')
    setDescription('')
  }

  return (
    <EditorSection id="programs" title="Programs" description={formData.hasDetailPage ? undefined : 'Individual programs appear only when the provider has a public profile page.'}>
      <ChipToggleGroup label="Course formats" options={COACHING_COURSE_TYPE_OPTIONS} selected={formData.courseTypes} onToggle={(value) => toggleArrayItem('courseTypes', value)} format={sentenceCase} />

      {formData.hasDetailPage ? (
        <div className="space-y-4 border-t border-border pt-5">
          {formData.programs.length > 0 ? (
            <ul className="divide-y divide-border rounded-md border border-border">
              {formData.programs.map((program, index) => (
                <li key={`${program.name}-${index}`} className="flex items-start justify-between gap-3 px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{program.name}</p>
                    <p className="text-[13px] text-muted-foreground">{[program.mode, program.courseType && sentenceCase(program.courseType)].filter(Boolean).join(' · ')}</p>
                    <p className="mt-0.5 text-sm text-foreground">{program.description}</p>
                  </div>
                  <RemoveButton label={`Remove program ${program.name}`} onClick={() => removeProgram(index)} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No programs yet.</p>
          )}

          <div className="space-y-4 rounded-md border border-dashed border-border p-4">
            <p className="text-sm font-medium text-foreground">Add a program</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Name" htmlFor="coaching-program-name">
                <Input id="coaching-program-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. JEE Main program" className="h-9 text-sm" />
              </Field>
              <Field label="Mode">
                <Select value={mode} onValueChange={(value) => setMode((value as string | null) || 'Classroom')} items={PROGRAM_MODES}>
                  <SelectTrigger aria-label="Mode" className="h-9 w-full bg-card text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PROGRAM_MODES.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Format">
                <Select value={courseType} onValueChange={(value) => setCourseType((value as string | null) || 'Classroom Program')} items={COURSE_TYPES}>
                  <SelectTrigger aria-label="Format" className="h-9 w-full bg-card text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSE_TYPES.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Description" htmlFor="coaching-program-description" className="sm:col-span-3">
                <Textarea id="coaching-program-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="e.g. Physics, Chemistry and Mathematics with regular test practice." rows={2} className="resize-none text-sm" />
              </Field>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={add} disabled={!name.trim() || !description.trim()} className="gap-1.5">
              <Plus className="size-4" aria-hidden="true" />
              Add program
            </Button>
          </div>
        </div>
      ) : null}
    </EditorSection>
  )
}
