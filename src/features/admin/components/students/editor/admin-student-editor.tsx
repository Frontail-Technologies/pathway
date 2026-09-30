'use client'

import Link from 'next/link'
import type { FormEvent } from 'react'
import type { AdminStudent } from '@/features/admin/data/admin-students'
import { StudentStatusBadge } from '../shared/student-status-badge'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save } from 'lucide-react'

type AdminStudentEditorProps = {
  student: AdminStudent
}

function Field({
  id,
  label,
  value,
  placeholder,
  type = 'text',
}: {
  id: string
  label: string
  value?: string | number
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} defaultValue={value ?? ''} placeholder={placeholder} />
    </div>
  )
}

function TagListEditor({
  id,
  label,
  values,
  placeholder,
}: {
  id: string
  label: string
  values: string[]
  placeholder: string
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        name={id}
        defaultValue={values.join(', ')}
        placeholder={placeholder}
      />
    </div>
  )
}

export function AdminStudentEditor({ student }: AdminStudentEditorProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <Link
            href={`/admin/students/${student.id}`}
            className={buttonVariants({
              variant: 'ghost',
              size: 'sm',
              className: 'inline-flex text-xs text-muted-foreground hover:text-foreground',
            })}
          >
            <ArrowLeft />
            Back to Student
          </Link>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold font-heading text-foreground">
                Edit Student
              </h1>
              <StudentStatusBadge status={student.accountStatus} />
            </div>
            <p className="text-xs text-muted-foreground">
              Update student identity, education preferences, and profile metadata.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/students/${student.id}`}
            className={buttonVariants({
              variant: 'outline',
              size: 'sm',
              className: 'inline-flex text-xs font-semibold',
            })}
          >
            Cancel
          </Link>
          <Button type="submit" form="student-editor-form" size="sm">
            <Save />
            Save Changes
          </Button>
        </div>
      </div>

      <form id="student-editor-form" className="space-y-6" onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Profile Identity</CardTitle>
            <CardDescription>
              Core account information shown in admin search and student profile views.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field id="name" label="Full Name" value={student.name} />
              <Field id="email" label="Email" value={student.email} type="email" />
              <Field id="phone" label="Phone" value={student.phone} />
              <Field id="city" label="City" value={student.city} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Education Profile</CardTitle>
            <CardDescription>
              Academic intent, target stream, and education background.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field id="studyLevel" label="Study Level" value={student.studyLevel} />
              <Field id="stream" label="Stream" value={student.stream} />
              <Field id="studyGoal" label="Study Goal" value={student.studyGoal} />
              <Field id="careerGoal" label="Career Goal" value={student.careerGoal} />
              <Field id="institution" label="Current Institution" value={student.education?.institution} />
              <Field id="graduationYear" label="Graduation Year" value={student.education?.graduationYear} type="number" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>
              Comma-separated values used by recommendations, matching, and student discovery tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <TagListEditor
                id="preferredStreams"
                label="Preferred Streams"
                values={student.preferredStreams ?? []}
                placeholder="Engineering, Management"
              />
              <TagListEditor
                id="preferredCourses"
                label="Preferred Courses"
                values={student.preferredCourses}
                placeholder="B.Tech, MBA"
              />
              <TagListEditor
                id="preferredExams"
                label="Preferred Exams"
                values={student.preferredExams}
                placeholder="JEE Main, CAT"
              />
              <TagListEditor
                id="preferredLocations"
                label="Preferred Locations"
                values={student.preferredLocations}
                placeholder="Delhi, Bengaluru"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Experience</CardTitle>
            <CardDescription>
              Profile experience entries are displayed in the student detail review sections.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="workExperience"
              name="workExperience"
              defaultValue={student.workExperience
                .map((item) =>
                  [item.role, item.organisation, item.type, [item.start, item.end].filter(Boolean).join(' - ')]
                    .filter(Boolean)
                    .join(' | ')
                )
                .join('\n')}
              placeholder="Role | Organisation | Type | Start - End"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Source & Review</CardTitle>
            <CardDescription>
              Account source metadata and admin-only indexing state.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-1.5">
                <Label>Account Type</Label>
                <Badge variant="muted" size="sm">{student.accountType}</Badge>
              </div>
              <div className="space-y-1.5">
                <Label>Data Source</Label>
                <Badge variant="muted" size="sm">{student.dataSource}</Badge>
              </div>
              <div className="space-y-1.5">
                <Label>Public Indexing</Label>
                <Badge variant={student.scraperExcluded ? 'warning' : 'success'} size="sm">
                  {student.scraperExcluded ? 'Excluded' : 'Allowed'}
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Student profile persistence will connect to the account API when the admin write endpoint is available.
            </p>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
