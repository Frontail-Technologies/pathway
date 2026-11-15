import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { Breadcrumbs } from '@/components/shared/breadcrumbs'
import { Illustration } from '@/components/shared/illustration'
import { StatusPill, deadlineStatus } from '@/components/shared/status-pill'
import { Button } from '@/components/ui/button'
import { catalogGet } from '@/services/api/catalog'

export type CalendarDate = {
  exam: { slug: string; shortName: string; name: string }
  label: string
  academicSession: string | null
  startsOn: string | null
  endsOn: string | null
  dateText: string | null
  sourceUrl: string | null
}

const tz = 'Asia/Kolkata'
const monthFormat = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric', timeZone: tz })
const dayFormat = new Intl.DateTimeFormat('en-IN', { day: 'numeric', timeZone: tz })
const shortMonth = new Intl.DateTimeFormat('en-IN', { month: 'short', timeZone: tz })
const fullDate = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: tz })

const anchor = (row: CalendarDate) => row.startsOn ?? row.endsOn!

function range(row: CalendarDate) {
  const from = row.startsOn ? fullDate.format(new Date(row.startsOn)) : ''
  const to = row.endsOn ? fullDate.format(new Date(row.endsOn)) : ''
  return from && to && from !== to ? `${from} – ${to}` : from || to || row.dateText || ''
}

export async function ExamCalendarPage() {
  const dates = await catalogGet<CalendarDate[]>('/exam-dates', { limit: '200' }).catch(() => null)
  const months = new Map<string, CalendarDate[]>()
  for (const row of dates ?? []) {
    const key = monthFormat.format(new Date(anchor(row)))
    months.set(key, [...(months.get(key) ?? []), row])
  }

  return (
    <div className="bg-muted/50 pb-10">
      <div className="border-b bg-card">
        <div className="container-shell px-4 pt-5 pb-6 lg:pt-6">
          <Breadcrumbs items={['Home', { label: 'Exams', href: '/exams' }, 'Exam calendar']} />
          <h1 className="mt-4 font-heading text-2xl font-bold text-foreground sm:text-3xl">Exam calendar</h1>
          <p className="mt-2 max-w-3xl text-[15px] leading-7 text-muted-foreground">Application windows, exam days and results for entrance exams, from official notices.</p>
        </div>
      </div>

      <div className="container-shell flex flex-col gap-4 px-4 pt-5 lg:pt-6">
        {!dates || months.size === 0 ? (
          <section className="flex flex-col items-center rounded-xl border bg-card px-6 py-12 text-center">
            <Illustration name="noData" width={200} />
            <h2 className="mt-2 font-heading text-lg font-bold text-foreground">{dates ? 'No upcoming dates yet' : 'The calendar could not be loaded'}</h2>
            <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">{dates ? 'New dates appear here as soon as exams announce them. Each exam page also lists its official notices.' : 'Please try again in a moment.'}</p>
            <Button variant="outline" className="mt-5" nativeButton={false} render={<Link href="/exams" />}>
              Browse exams
            </Button>
          </section>
        ) : (
          [...months.entries()].map(([month, rows]) => (
            <section key={month} aria-labelledby={`month-${month}`} className="overflow-hidden rounded-xl border bg-card">
              <h2 id={`month-${month}`} className="border-b px-4 py-3 font-heading text-lg font-bold text-foreground sm:px-5">
                {month}
              </h2>
              <ul className="divide-y">
                {rows.map((row) => {
                  const when = new Date(anchor(row))
                  const status = deadlineStatus(row.endsOn ?? row.startsOn, row.startsOn)
                  return (
                    <li key={`${row.exam.slug}-${row.label}-${anchor(row)}`} className="flex gap-4 px-4 py-4 sm:px-5">
                      <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-secondary py-2 text-primary">
                        <span className="font-heading text-xl leading-none font-bold">{dayFormat.format(when)}</span>
                        <span className="mt-1 text-xs font-semibold">{shortMonth.format(when)}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link href={`/exam/${row.exam.slug}`} className="font-semibold text-foreground hover:text-primary hover:underline">
                            {row.exam.shortName}
                          </Link>
                          <StatusPill status={status} deadline={row.endsOn ?? row.startsOn} />
                        </div>
                        <p className="mt-0.5 text-sm text-foreground">{row.label}</p>
                        <p className="mt-0.5 text-[13px] text-muted-foreground">{[range(row), row.academicSession ? `Session ${row.academicSession}` : ''].filter(Boolean).join(' · ')}</p>
                      </div>
                      {row.sourceUrl ? (
                        <a href={row.sourceUrl} target="_blank" rel="noopener noreferrer" className="hidden shrink-0 items-center gap-1 self-center text-sm font-semibold text-primary hover:underline sm:flex">
                          Official notice
                          <ExternalLink className="size-3.5" aria-hidden="true" />
                        </a>
                      ) : null}
                    </li>
                  )
                })}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  )
}
