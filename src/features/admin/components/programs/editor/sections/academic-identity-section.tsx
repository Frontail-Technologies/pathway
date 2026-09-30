import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AlertCircle } from 'lucide-react'
import type { AdminProgramStudyLevel } from '@/features/admin/types/programs'
import { studyLevels, streams, studyModes } from '@/features/admin/constants/programs'

export type AcademicIdentitySectionProps = {
  name: string
  onNameChange: (val: string) => void
  degree: string
  onDegreeChange: (val: string) => void
  level: AdminProgramStudyLevel
  onLevelChange: (val: AdminProgramStudyLevel) => void
  stream: string
  onStreamChange: (val: string) => void
  specialization: string
  onSpecializationChange: (val: string) => void
  duration: string
  onDurationChange: (val: string) => void
  studyMode: 'Full-time' | 'Part-time' | 'Online' | 'Distance'
  onStudyModeChange: (val: 'Full-time' | 'Part-time' | 'Online' | 'Distance') => void
  errors: Record<string, string>
}

export function AcademicIdentitySection({
  name,
  onNameChange,
  degree,
  onDegreeChange,
  level,
  onLevelChange,
  stream,
  onStreamChange,
  specialization,
  onSpecializationChange,
  duration,
  onDurationChange,
  studyMode,
  onStudyModeChange,
  errors,
}: AcademicIdentitySectionProps) {
  return (
    <section id="identity" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Academic Identity
      </h2>

      <div className="space-y-1.5">
        <Label htmlFor="prog-name" className="text-xs font-semibold">
          Program Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="prog-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="e.g. B.Tech Computer Science & Engineering"
          className="text-xs"
        />
        {errors.name && (
          <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
            <AlertCircle className="w-3 h-3" /> {errors.name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="prog-degree" className="text-xs font-semibold">
            Degree Title <span className="text-destructive">*</span>
          </Label>
          <Input
            id="prog-degree"
            value={degree}
            onChange={(e) => onDegreeChange(e.target.value)}
            placeholder="e.g. B.Tech, M.Sc, MBA, MBBS"
            className="text-xs"
          />
          {errors.degree && (
            <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.degree}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="prog-level" className="text-xs font-semibold">
            Study Level <span className="text-destructive">*</span>
          </Label>
          <Select
            items={studyLevels}
            value={level}
            onValueChange={(val) => onLevelChange((val as AdminProgramStudyLevel) || 'Undergraduate')}
          >
            <SelectTrigger id="prog-level" className="w-full text-xs">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {studyLevels.map((lvl) => (
                <SelectItem key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="prog-stream" className="text-xs font-semibold">
            Academic Stream <span className="text-destructive">*</span>
          </Label>
          <Select
            items={streams}
            value={stream}
            onValueChange={(val) => onStreamChange(val || 'Engineering')}
          >
            <SelectTrigger id="prog-stream" className="w-full text-xs">
              <SelectValue placeholder="Select stream" />
            </SelectTrigger>
            <SelectContent>
              {streams.map((str) => (
                <SelectItem key={str.value} value={str.value}>
                  {str.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="prog-spec" className="text-xs font-semibold">
            Primary Specialization
          </Label>
          <Input
            id="prog-spec"
            value={specialization}
            onChange={(e) => onSpecializationChange(e.target.value)}
            placeholder="e.g. Artificial Intelligence & Machine Learning"
            className="text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="prog-duration" className="text-xs font-semibold">
            Standard Duration <span className="text-destructive">*</span>
          </Label>
          <Input
            id="prog-duration"
            value={duration}
            onChange={(e) => onDurationChange(e.target.value)}
            placeholder="e.g. 4 Years"
            className="text-xs"
          />
          {errors.duration && (
            <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.duration}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="prog-mode" className="text-xs font-semibold">
            Delivery Mode
          </Label>
          <Select
            items={studyModes}
            value={studyMode}
            onValueChange={(val) =>
              onStudyModeChange((val as 'Full-time' | 'Part-time' | 'Online' | 'Distance') || 'Full-time')
            }
          >
            <SelectTrigger id="prog-mode" className="w-full text-xs">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              {studyModes.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}
