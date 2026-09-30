import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  COACHING_COURSE_TYPE_OPTIONS,
  COACHING_MODE_OPTIONS,
} from '../../../shared/tutor-coaching-constants'
import type { CoachingFormData } from '../use-coaching-editor'
import type { CoachingProgram } from '@/features/coaching/data/coaching'

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
  const [courseType, setCourseType] = useState('Classroom Program')
  const [description, setDescription] = useState('')

  const handleAddTrack = () => {
    if (!name.trim() || !description.trim()) return
    addProgram({
      name: name.trim(),
      mode,
      courseType,
      description: description.trim(),
    })
    setName('')
    setDescription('')
  }

  return (
    <div id="section-programs" className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Programs & Course Formats</h2>

      <div className="space-y-4 text-xs">
        <div className="space-y-2">
          <Label className="text-xs font-semibold">Listing Course Formats</Label>
          <div className="flex flex-wrap gap-2">
            {COACHING_COURSE_TYPE_OPTIONS.map((type: string) => {
              const selected = formData.courseTypes.includes(type)
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleArrayItem('courseTypes', type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer ${
                    selected
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-foreground border-border hover:bg-muted/70'
                  }`}
                >
                  {type}
                </button>
              )
            })}
          </div>
        </div>

        {formData.hasDetailPage && (
          <div className="space-y-3 pt-3 border-t border-border/50">
            <Label className="text-xs font-semibold block">Add Structured Program Track</Label>

            <div className="p-3.5 rounded-lg bg-muted/30 border border-border/50 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1 sm:col-span-1">
                  <span className="text-[11px] text-muted-foreground block">Track Name</span>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. JEE Main Program"
                    className="text-xs h-8"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-muted-foreground block">Mode</span>
                  <Select value={mode} onValueChange={(val) => setMode(val || 'Classroom')}>
                    <SelectTrigger className="h-8 text-xs bg-card">
                      <SelectValue placeholder="Select mode">
                        {mode}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Classroom">Classroom</SelectItem>
                      <SelectItem value="Online">Online</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] text-muted-foreground block">Course Format</span>
                  <Select value={courseType} onValueChange={(val) => setCourseType(val || 'Classroom Program')}>
                    <SelectTrigger className="h-8 text-xs bg-card">
                      <SelectValue placeholder="Select course format">
                        {courseType}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {COACHING_COURSE_TYPE_OPTIONS.map((t: string) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1 sm:col-span-3">
                  <span className="text-[11px] text-muted-foreground block">Track Description</span>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. JEE Main preparation covering Physics, Chemistry and Mathematics with regular test practice."
                    rows={2}
                    className="text-xs resize-none"
                  />
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTrack}
                className="h-8 text-xs gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Track
              </Button>
            </div>

            <div className="space-y-2 pt-2">
              {formData.programs.map((program, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/40 border border-border/60 text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{program.name}</span>
                      {program.mode && <span className="text-muted-foreground">({program.mode})</span>}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{program.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeProgram(idx)}
                    aria-label={`Remove program track ${program.name}`}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
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
