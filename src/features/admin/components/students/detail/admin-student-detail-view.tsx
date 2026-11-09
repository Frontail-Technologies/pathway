'use client'

import * as React from 'react'
import Link from 'next/link'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { AdminStudent } from '@/features/admin/data/admin-students'
import { profileFields } from '@/features/student/data/student'
import { CompletenessMeter, FactList, Panel, StatusBadge, Tag, Monogram, RecordHeader } from '../../kit'
import { StudentStatusBadge } from '../shared/student-status-badge'

function Muted({ children }: { children: React.ReactNode }) {
  return <span className="font-normal text-muted-foreground">{children}</span>
}

function TagList({ values, empty = 'None selected' }: { values?: string[]; empty?: string }) {
  if (!values || values.length === 0) return <Muted>{empty}</Muted>
  return (
    <span className="mt-1 flex flex-wrap gap-1.5">
      {values.map((value) => (
        <Tag key={value}>{value}</Tag>
      ))}
    </span>
  )
}

export function AdminStudentDetailView({ student }: { student: AdminStudent }) {
  const [copied, setCopied] = React.useState(false)
  const { percent, filled, total, missing } = student.profileCompletion

  async function copyId() {
    try {
      await navigator.clipboard.writeText(student.id)
    } catch {
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <RecordHeader
        back={{ href: '/admin/students', label: 'Students' }}
        title={student.name}
        media={<Monogram name={student.name} size="lg" />}
        chips={
          <>
            <StudentStatusBadge status={student.accountStatus} />
            <span className="text-[13px] text-muted-foreground">{[student.email, student.city].filter(Boolean).join(' · ')}</span>
          </>
        }
        actions={
          <>
            <Link href="/student" target="_blank" rel="noreferrer" className={buttonVariants({ variant: 'outline', size: 'sm', className: 'h-9 gap-1.5' })}>
              <ExternalLink className="size-4" aria-hidden="true" />
              Open student space
            </Link>
            <Link href={`/admin/students/${student.id}/edit`} className={buttonVariants({ size: 'sm', className: 'h-9' })}>
              Edit
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <Panel title="Profile">
            <FactList
              items={[
                { label: 'Name', value: student.name },
                { label: 'Email', value: student.email },
                { label: 'Phone', value: student.phone ?? <Muted>Not provided</Muted> },
                { label: 'City', value: student.city ?? <Muted>Not provided</Muted> },
              ]}
            />
          </Panel>

          <Panel title="Education">
            <FactList
              items={[
                { label: 'Study level', value: student.studyLevel ?? <Muted>Not provided</Muted> },
                { label: 'Stream', value: student.stream ?? <Muted>Not provided</Muted> },
                { label: 'School or college', value: student.education?.institution ?? <Muted>Not provided</Muted> },
                { label: 'Graduation year', value: student.education?.graduationYear ? String(student.education.graduationYear) : <Muted>Not provided</Muted> },
              ]}
            />
          </Panel>

          <Panel title="Study preferences">
            <FactList
              items={[
                { label: 'Study goal', value: student.studyGoal ?? <Muted>Not set</Muted> },
                { label: 'Preferred streams', value: <TagList values={student.preferredStreams} /> },
                { label: 'Preferred courses', value: <TagList values={student.preferredCourses} /> },
                { label: 'Target exams', value: <TagList values={student.preferredExams} /> },
                { label: 'Preferred locations', value: <TagList values={student.preferredLocations} empty="Any location" /> },
              ]}
            />
          </Panel>

          <Panel title="Career and experience">
            <div className="space-y-5">
              <FactList columns={1} items={[{ label: 'Career goal', value: student.careerGoal ?? <Muted>Still exploring</Muted> }]} />
              <div>
                <h3 className="text-[13px] text-muted-foreground">Experience ({student.workExperience.length})</h3>
                {student.workExperience.length > 0 ? (
                  <ul className="mt-2 divide-y divide-border rounded-md border border-border">
                    {student.workExperience.map((item) => (
                      <li key={item.id} className="p-3.5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <p className="text-sm font-medium text-foreground">
                            {item.role}
                            <span className="font-normal text-muted-foreground"> · {item.organisation}</span>
                          </p>
                          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                            {item.type ? <Tag>{item.type}</Tag> : null}
                            {item.start || item.end ? (
                              <span className="tabular-nums">
                                {item.start || '—'} – {item.end || 'Present'}
                              </span>
                            ) : null}
                          </div>
                        </div>
                        {item.description ? <p className="mt-1 text-sm text-muted-foreground">{item.description}</p> : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">No internships, jobs or projects added.</p>
                )}
              </div>
            </div>
          </Panel>

          <Panel title="Related activity">
            <FactList
              items={[
                { label: 'Saved items', value: <Muted>Not connected yet</Muted> },
                { label: 'Enquiries', value: <Muted>Not connected yet</Muted> },
              ]}
            />
          </Panel>
        </div>

        <div className="space-y-6 lg:sticky lg:top-[4.5rem] lg:col-span-4">
          <Panel title="Profile completeness" description={`${filled} of ${total} fields filled`}>
            <CompletenessMeter value={percent} />
            <ul className="mt-4 space-y-2">
              {profileFields.map((field) => {
                const isFilled = !missing.includes(field.key)
                return (
                  <li key={field.key} className="flex items-center justify-between gap-3 text-sm">
                    <span className={isFilled ? 'text-foreground' : 'text-muted-foreground'}>{field.label}</span>
                    {isFilled ? <StatusBadge tone="success">Filled</StatusBadge> : <StatusBadge>Missing</StatusBadge>}
                  </li>
                )
              })}
            </ul>
          </Panel>

          <Panel title="Account">
            <FactList
              columns={1}
              items={[
                { label: 'Account type', value: student.accountType },
                { label: 'Sign-in', value: 'Demo mode' },
                { label: 'Source', value: student.dataSource },
                { label: 'Privacy', value: 'Private profile; not shown publicly' },
                {
                  label: 'Student ID',
                  value: (
                    <button type="button" onClick={copyId} className="inline-flex items-center gap-1.5 rounded font-mono text-[13px] font-normal text-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring/40">
                      {student.id}
                      {copied ? <Check className="size-3.5 text-success" aria-hidden="true" /> : <Copy className="size-3.5 text-muted-foreground" aria-hidden="true" />}
                      <span className="sr-only">{copied ? 'Copied' : 'Copy ID'}</span>
                    </button>
                  ),
                },
              ]}
            />
            <Link href="/student/preferences" target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
              View their preferences page
            </Link>
          </Panel>
        </div>
      </div>
    </div>
  )
}
