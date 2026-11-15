import Link from 'next/link'
import { CalendarDays, ChevronRight, FileText } from 'lucide-react'
import { SourceNote } from '@/components/shared/source-note'
import { StatusPill, deadlineStatus } from '@/components/shared/status-pill'
import type { DetailedExam } from '../config/exam-tabs'
import type { ExamDateRow } from '../data/exams'

const typeLabel: Record<string, string> = {
  notification: 'Notice',
  information_bulletin: 'Information bulletin',
  syllabus: 'Syllabus',
  guidelines: 'Guidelines',
  brochure: 'Brochure',
  answer_key: 'Answer key',
  result: 'Result',
}

const dateFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' })

const formatDate = (value: string | null) => (value ? dateFormat.format(new Date(value)) : '')

export function dateRange(row: Pick<ExamDateRow, 'startsOn' | 'endsOn' | 'dateText'>) {
  const from = formatDate(row.startsOn)
  const to = formatDate(row.endsOn)
  if (from && to && from !== to) return `${from} – ${to}`
  return from || to || row.dateText || 'To be announced'
}

const rowStatus = (row: ExamDateRow) => (row.startsOn || row.endsOn ? deadlineStatus(row.endsOn ?? row.startsOn, row.startsOn) : null)

export function nextExamDate(exam: DetailedExam) {
  return (exam.detail.dates ?? []).find((row) => {
    const status = rowStatus(row)
    return status && status !== 'closed'
  })
}

export function ExamKeyDateCard({ exam }: { exam: DetailedExam }) {
  const next = nextExamDate(exam)
  if (!next) return null
  const status = rowStatus(next)
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cta/25 bg-accent p-4">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-card text-cta">
          <CalendarDays className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-foreground">{next.label}</p>
          <p className="text-sm text-muted-foreground">{dateRange(next)}</p>
        </div>
      </div>
      {status ? <StatusPill status={status} deadline={next.endsOn ?? next.startsOn} /> : null}
    </div>
  )
}

export function ExamDatesTable({ exam }: { exam: DetailedExam }) {
  const rows = exam.detail.dates ?? []
  if (!rows.length) return null
  const source = rows.find((row) => row.sourceUrl)?.sourceUrl
  return (
    <section id="dates" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{exam.shortName} important dates</h2>
      <div className="mt-4 overflow-hidden rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-medium">Event</th>
              <th scope="col" className="px-4 py-2.5 font-medium">Date</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {rows.map((row) => {
              const status = rowStatus(row)
              return (
                <tr key={`${row.label}-${row.startsOn ?? row.dateText}`}>
                  <td className="px-4 py-3 font-medium text-foreground">{row.label}</td>
                  <td className="px-4 py-3 text-muted-foreground">{dateRange(row)}</td>
                  <td className="px-4 py-3 text-right">{status ? <StatusPill status={status} deadline={row.endsOn ?? row.startsOn} /> : null}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <SourceNote className="mt-3" source={exam.conductingBody || 'Official notice'} href={source ?? undefined} />
    </section>
  )
}

function NoticeList({ exam, limit }: { exam: DetailedExam; limit?: number }) {
  const documents = (exam.detail.documents ?? []).slice(0, limit)
  return (
    <ul className="divide-y overflow-hidden rounded-xl border bg-card">
      {documents.map((doc, index) => (
        <li key={`${doc.url}-${index}`}>
          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="group flex min-h-16 items-center gap-3 px-4 py-3 outline-none transition-colors hover:bg-muted/60 focus-visible:bg-muted">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <FileText className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="line-clamp-2 text-sm font-medium text-foreground group-hover:text-primary">{doc.title}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{[typeLabel[doc.type] ?? 'Document', doc.session ? `Session ${doc.session}` : '', 'PDF'].filter(Boolean).join(' · ')}</span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}

export function ExamNoticesSection({ exam }: { exam: DetailedExam }) {
  const count = exam.detail.documents?.length ?? 0
  if (!count) return null
  return (
    <section id="notices" className="scroll-mt-section rounded-xl border bg-card p-4 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">{exam.shortName} official notices</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {count} {count === 1 ? 'document' : 'documents'} published by {exam.conductingBody || 'the conducting body'}, newest first
      </p>
      <div className="mt-4">
        <NoticeList exam={exam} />
      </div>
      <SourceNote className="mt-3" source={exam.conductingBody || 'Conducting body'} note="Files are copies of the official PDFs" />
    </section>
  )
}
