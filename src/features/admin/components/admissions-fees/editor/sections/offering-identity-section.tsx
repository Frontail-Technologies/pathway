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
import { admissionModes } from '../../shared/admissions-fees-constants'
import { colleges } from '@/features/colleges/data/colleges'
import { courses } from '@/features/courses/data/courses'

const studyLevels = [
  { value: 'Undergraduate', label: 'Undergraduate (UG)' },
  { value: 'Postgraduate', label: 'Postgraduate (PG)' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Certificate', label: 'Certificate' },
]

const streams = [
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Management', label: 'Management' },
  { value: 'Medical', label: 'Medical & Healthcare' },
  { value: 'Science', label: 'Science & IT' },
  { value: 'Law', label: 'Law & Legal Studies' },
  { value: 'Commerce', label: 'Commerce & Banking' },
  { value: 'Arts & Humanities', label: 'Arts & Humanities' },
]

const studyModes = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Online', label: 'Online' },
  { value: 'Distance', label: 'Distance Learning' },
]

export function OfferingIdentitySection({
  institutionId,
  onInstitutionIdChange,
  programId,
  onProgramIdChange,
  degree,
  onDegreeChange,
  level,
  onLevelChange,
  stream,
  onStreamChange,
  duration,
  onDurationChange,
  studyMode,
  onStudyModeChange,
  academicSession,
  onAcademicSessionChange,
  admissionMode,
  onAdmissionModeChange,
  isEdit,
  errors,
}: {
  institutionId: string
  onInstitutionIdChange: (val: string) => void
  programId: string
  onProgramIdChange: (val: string) => void
  degree: string
  onDegreeChange: (val: string) => void
  level: string
  onLevelChange: (val: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Certificate') => void
  stream: string
  onStreamChange: (val: string) => void
  duration: string
  onDurationChange: (val: string) => void
  studyMode: string
  onStudyModeChange: (val: 'Full-time' | 'Part-time' | 'Online' | 'Distance') => void
  academicSession: string
  onAcademicSessionChange: (val: string) => void
  admissionMode: string
  onAdmissionModeChange: (val: 'Entrance Exam' | 'Merit Based' | 'Direct / Management') => void
  isEdit: boolean
  errors: Record<string, string>
}) {
  const collegeOptions = React.useMemo(
    () => colleges.map((c) => ({ value: c.id, label: `${c.name} (${c.city}, ${c.state})` })),
    []
  )

  const programOptions = React.useMemo(
    () => courses.map((crs) => ({ value: crs.id, label: `${crs.name} (${crs.degree})` })),
    []
  )

  return (
    <section id="identity" className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4 scroll-mt-20">
      <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">
        Offering Identity & Relationship
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="off-inst" className="text-xs font-semibold">
            Offering Institution <span className="text-destructive">*</span>
          </Label>
          <Select
            items={collegeOptions}
            value={institutionId}
            onValueChange={(val) => val && onInstitutionIdChange(val)}
            disabled={isEdit}
          >
            <SelectTrigger id="off-inst" className="w-full text-xs">
              <SelectValue placeholder="Select Institution" />
            </SelectTrigger>
            <SelectContent>
              {collegeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.institutionId && (
            <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.institutionId}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="off-prog" className="text-xs font-semibold">
            Canonical Academic Program <span className="text-destructive">*</span>
          </Label>
          <Select
            items={programOptions}
            value={programId}
            onValueChange={(val) => val && onProgramIdChange(val)}
            disabled={isEdit}
          >
            <SelectTrigger id="off-prog" className="w-full text-xs">
              <SelectValue placeholder="Select Program" />
            </SelectTrigger>
            <SelectContent>
              {programOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.programId && (
            <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.programId}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="off-degree" className="text-xs font-semibold">
            Degree Title
          </Label>
          <Input
            id="off-degree"
            value={degree}
            onChange={(e) => onDegreeChange(e.target.value)}
            placeholder="e.g. B.Tech, MBA, M.Tech"
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="off-level" className="text-xs font-semibold">
            Study Level
          </Label>
          <Select
            items={studyLevels}
            value={level}
            onValueChange={(val) => onLevelChange((val as any) || 'Undergraduate')}
          >
            <SelectTrigger id="off-level" className="w-full text-xs">
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

        <div className="space-y-1.5">
          <Label htmlFor="off-stream" className="text-xs font-semibold">
            Academic Stream
          </Label>
          <Select
            items={streams}
            value={stream}
            onValueChange={(val) => onStreamChange(val || 'Engineering')}
          >
            <SelectTrigger id="off-stream" className="w-full text-xs">
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="off-session" className="text-xs font-semibold">
            Academic Session <span className="text-destructive">*</span>
          </Label>
          <Input
            id="off-session"
            value={academicSession}
            onChange={(e) => onAcademicSessionChange(e.target.value)}
            placeholder="e.g. 2026-27"
            className="text-xs"
          />
          {errors.academicSession && (
            <p className="text-[11px] text-destructive font-medium flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3" /> {errors.academicSession}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="off-duration" className="text-xs font-semibold">
            Duration
          </Label>
          <Input
            id="off-duration"
            value={duration}
            onChange={(e) => onDurationChange(e.target.value)}
            placeholder="e.g. 4 Years"
            className="text-xs"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="off-mode" className="text-xs font-semibold">
            Delivery Mode
          </Label>
          <Select
            items={studyModes}
            value={studyMode}
            onValueChange={(val) => onStudyModeChange((val as any) || 'Full-time')}
          >
            <SelectTrigger id="off-mode" className="w-full text-xs">
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
