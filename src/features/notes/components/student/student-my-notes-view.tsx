import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Illustration } from '@/components/shared/illustration'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'

const steps: { art: SpotArtName; title: string; text: string }[] = [
  { art: 'search', title: 'Find notes', text: 'Browse by subject, exam or class' },
  { art: 'notes', title: 'Open free or buy', text: 'Preview pages before you decide' },
  { art: 'verified', title: 'Read here any time', text: 'Your library keeps every note you open' },
]

export function StudentMyNotesView() {
  return (
    <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-foreground sm:text-[28px]">My notes</h1>
          <p className="mt-1 text-sm text-muted-foreground">Study notes you have opened or bought</p>
        </div>
        <Link href="/notes" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          Browse notes
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <section className="overflow-hidden rounded-2xl border bg-card">
        <div className="flex flex-col items-center gap-6 px-6 py-10 text-center md:flex-row md:gap-10 md:px-10 md:text-left">
          <div className="flex shrink-0 items-center justify-center rounded-2xl bg-secondary p-4">
            <Illustration name="noNotes" width={220} />
          </div>
          <div className="max-w-md">
            <h2 className="font-heading text-xl font-bold text-foreground">Your library is empty</h2>
            <p className="mt-2 text-[15px] leading-7 text-muted-foreground">Notes you open or buy are saved here, so you can come back to them from any device.</p>
            <Button variant="cta" className="mt-5 h-10 px-5 text-sm font-semibold" nativeButton={false} render={<Link href="/notes" />}>
              Explore notes
            </Button>
          </div>
        </div>
        <ol className="grid border-t bg-muted/40 sm:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex items-center gap-3 border-b p-4 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0">
              <SpotArt name={step.art} className="size-11 bg-card" />
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  {index + 1}. {step.title}
                </span>
                <span className="block text-xs text-muted-foreground">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
