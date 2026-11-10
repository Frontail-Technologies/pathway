'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { AdminStudent } from '@/features/admin/data/admin-students'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { AdminPageHeader, CompletenessMeter, FactList, Panel, StatusBadge } from '../../kit'
import { StudentStatusBadge } from '../shared/student-status-badge'
import { AdminFormFooter } from '../../admin-form-footer'

function Field({ id, label, value, placeholder, type = 'text' }: { id: string; label: string; value?: string | number; placeholder?: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Input id={id} name={id} type={type} defaultValue={value ?? ''} placeholder={placeholder} className="h-9" />
    </div>
  )
}

function ListField({ id, label, values, placeholder }: { id: string; label: string; values: string[]; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <Textarea id={id} name={id} defaultValue={values.join(', ')} placeholder={placeholder} className="min-h-16" />
    </div>
  )
}

export function AdminStudentEditor({ student }: { student: AdminStudent }) {
  const router = useRouter()
  const [dirty, setDirty] = React.useState(false)
  useUnsavedChanges(dirty)
  const detailHref = `/admin/students/${student.id}`

  function handleCancel() {
    if (dirty && !window.confirm('Discard your unsaved changes?')) return
    setDirty(false)
    router.push(detailHref)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    toast('Changes not saved', { description: 'Saving student profiles needs the account API, which is not connected yet.' })
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader back={{ href: detailHref, label: student.name }} title="Edit student" meta={<StudentStatusBadge status={student.accountStatus} />} />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <form id="student-editor-form" className="space-y-6 lg:col-span-8" onSubmit={handleSubmit} onChange={() => setDirty(true)}>
          <Panel title="Profile">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field id="name" label="Full name" value={student.name} />
              <Field id="email" label="Email" value={student.email} type="email" />
              <Field id="phone" label="Phone" value={student.phone} />
              <Field id="city" label="City" value={student.city} />
            </div>
          </Panel>

          <Panel title="Education">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field id="studyLevel" label="Study level" value={student.studyLevel} />
              <Field id="stream" label="Stream" value={student.stream} />
              <Field id="studyGoal" label="Study goal" value={student.studyGoal} />
              <Field id="careerGoal" label="Career goal" value={student.careerGoal} />
              <Field id="institution" label="School or college" value={student.education?.institution} />
              <Field id="graduationYear" label="Graduation year" value={student.education?.graduationYear} type="number" />
            </div>
          </Panel>

          <Panel title="Preferences">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <ListField id="preferredStreams" label="Preferred streams" values={student.preferredStreams ?? []} placeholder="Engineering, Management" />
              <ListField id="preferredCourses" label="Preferred courses" values={student.preferredCourses} placeholder="B.Tech, MBA" />
              <ListField id="preferredExams" label="Target exams" values={student.preferredExams} placeholder="JEE Main, CAT" />
              <ListField id="preferredLocations" label="Preferred locations" values={student.preferredLocations} placeholder="Delhi, Bengaluru" />
            </div>
          </Panel>

          <Panel title="Experience">
            <Label htmlFor="workExperience" className="sr-only">
              Experience
            </Label>
            <Textarea
              id="workExperience"
              name="workExperience"
              className="min-h-24"
              defaultValue={student.workExperience
                .map((item) => [item.role, item.organisation, item.type, [item.start, item.end].filter(Boolean).join(' - ')].filter(Boolean).join(' | '))
                .join('\n')}
              placeholder="Role | Organisation | Type | Start - End"
            />
          </Panel>
        </form>

        <aside className="space-y-6 lg:sticky lg:top-[4.5rem] lg:col-span-4">

          <Panel title="Summary">
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-[13px] text-muted-foreground">Profile completeness</p>
                <CompletenessMeter value={student.profileCompletion.percent} />
              </div>
              <FactList
                columns={1}
                items={[
                  { label: 'Account type', value: student.accountType },
                  { label: 'Source', value: student.dataSource },
                  { label: 'Search engines', value: student.scraperExcluded ? <StatusBadge>Not indexed</StatusBadge> : <StatusBadge tone="warning">Indexed</StatusBadge> },
                ]}
              />
              <p className="text-[13px] text-muted-foreground">Saving needs the account API, which is not connected yet.</p>
            </div>
          </Panel>
        </aside>
        <AdminFormFooter className="lg:col-span-12" formId="student-editor-form" submitLabel="Save changes" onCancel={handleCancel} status={dirty ? 'You have unsaved changes.' : 'No changes yet.'} />
      </div>
    </div>
  )
}
