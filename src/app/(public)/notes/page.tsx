import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Illustration } from '@/components/shared/illustration'
import { LandingBody, LandingHeader } from '@/components/shared/landing'
import { Button } from '@/components/ui/button'
import { listNotes, notesApiQuery } from '@/features/notes/api/notes-api'
import { NotesListingPage } from '@/features/notes/components/public/notes-listing-page'
import { toUrlSearchParams } from '@/lib/search-params'

export const metadata: Metadata = {
  title: 'Notes and Study Material',
  description: 'Revision notes, formula sheets and chapter summaries for school and entrance exams.',
}

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function NotesPage({ searchParams }: Props) {
  const params = toUrlSearchParams(await searchParams)
  const query = notesApiQuery(params)
  const initial = await listNotes({ ...query, limit: '12' }).catch(() => null)
  const filtered = Object.values(query).some(Boolean)

  if (initial && !filtered && (initial.page.total ?? initial.items.length) === 0) {
    return (
      <>
        <LandingHeader trail={['Home', 'Notes']} title="Notes and study material" description="Revision notes, formula sheets and chapter summaries for school and entrance exams." />
        <LandingBody>
          <section className="flex flex-col items-center rounded-xl border bg-card px-6 py-12 text-center">
            <Illustration name="noNotes" width={200} />
            <h2 className="mt-2 font-heading text-lg font-bold text-foreground">No notes published yet</h2>
            <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">New study material appears here as soon as it is published. Meanwhile, explore exams and courses.</p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" nativeButton={false} render={<Link href="/exams" />}>
                Browse exams
              </Button>
              <Button variant="outline" nativeButton={false} render={<Link href="/courses" />}>
                Browse courses
              </Button>
            </div>
          </section>
        </LandingBody>
      </>
    )
  }

  return (
    <Suspense fallback={null}>
      <NotesListingPage initial={initial} initialQuery={query} />
    </Suspense>
  )
}
