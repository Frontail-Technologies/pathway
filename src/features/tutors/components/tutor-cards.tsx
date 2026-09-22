'use client'

import Link from 'next/link'
import { Bookmark, Globe, MonitorSmartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSavedItem } from '@/features/saved/saved-items-provider'
import type { Tutor } from '../data/tutors'
import { TutorPortrait } from './tutor-avatar'

function SaveButton({ tutor, className = '' }: { tutor: Tutor; className?: string }) {
  const { saved, toggleSaved } = useSavedItem('tutor', tutor.slug, 'Tutor')
  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${tutor.name} from saved tutors` : `Save ${tutor.name}`}
      aria-pressed={saved}
      onClick={toggleSaved}
      className={`flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/40 ${className}`}
    >
      <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4 text-muted-foreground'} aria-hidden="true" />
    </button>
  )
}

/** Real link only when the record has a detail route; otherwise a disabled "Profile Soon". */
function ProfileAction({ tutor, className = 'h-9 px-4 text-sm', variant = 'cta' }: { tutor: Tutor; className?: string; variant?: 'cta' | 'outline' }) {
  return tutor.hasDetailPage ? (
    <Button variant={variant} className={className} nativeButton={false} render={<Link href={`/tutor/${tutor.slug}`} />}>
      View Profile
    </Button>
  ) : (
    <Button variant="outline" className={className} disabled title="Profile coming soon">
      Profile Soon
    </Button>
  )
}

/** Labelled Save action for the detail hero. */
function SaveAction({ tutor }: { tutor: Tutor }) {
  const { saved, toggleSaved } = useSavedItem('tutor', tutor.slug, 'Tutor')
  return (
    <Button variant="outline" className="h-10 gap-2 px-4 text-sm font-semibold" aria-pressed={saved} onClick={toggleSaved}>
      <Bookmark className={saved ? 'size-4 fill-primary text-primary' : 'size-4'} aria-hidden="true" />
      {saved ? 'Saved' : 'Save'}
      <span className="sr-only"> {tutor.name}</span>
    </Button>
  )
}

const chip = 'rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary'

/** Compact portrait-led card for the Featured Tutors rail/grid. */
export function FeaturedTutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <article className="flex h-full w-72 shrink-0 snap-start flex-col rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] lg:w-auto">
      <div className="flex items-start gap-3">
        <TutorPortrait tutor={tutor} className="size-24 rounded-xl" />
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-base font-bold text-foreground">{tutor.name}</h3>
          <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{tutor.headline}</p>
        </div>
        <SaveButton tutor={tutor} className="-mt-1 -mr-1" />
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[...tutor.subjects.slice(0, 1), ...tutor.exams].slice(0, 3).map((exam) => (
          <span key={exam} className={chip}>
            {exam}
          </span>
        ))}
      </div>
      <p className="mt-3 flex-1 text-[13px] leading-5 text-foreground">{tutor.intro}</p>
      <div className="mt-3">
        <ProfileAction tutor={tutor} />
      </div>
    </article>
  )
}

export function TutorResultCard({ tutor }: { tutor: Tutor }) {
  return (
    <article className="flex gap-4 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] sm:p-5">
      <TutorPortrait tutor={tutor} className="size-[72px] rounded-xl sm:size-22" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-heading text-base font-bold text-foreground sm:text-lg">{tutor.name}</h3>
            <p className="mt-0.5 text-[13px] text-muted-foreground">{tutor.headline}</p>
          </div>
          <SaveButton tutor={tutor} className="-mt-1 -mr-1" />
        </div>

        <p className="mt-2 text-sm leading-6 text-foreground">{tutor.intro}</p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {tutor.subjects.map((subject) => (
            <span key={subject} className={chip}>
              {subject}
            </span>
          ))}
          {tutor.exams.map((exam) => (
            <span key={exam} className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
              {exam}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Globe className="size-3.5" aria-hidden="true" />
              {tutor.languages.join(', ')}
            </span>
            <span className="flex items-center gap-1.5">
              <MonitorSmartphone className="size-3.5" aria-hidden="true" />
              {tutor.modes.join(' & ')}
            </span>
          </div>
          <ProfileAction tutor={tutor} />
        </div>
      </div>
    </article>
  )
}

export { SaveAction as TutorSaveAction, ProfileAction as TutorProfileAction }
