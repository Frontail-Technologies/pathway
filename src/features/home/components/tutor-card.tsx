import Link from 'next/link'
import { TutorPortrait } from '@/features/tutors/components/tutor-avatar'
import type { Tutor } from '@/features/tutors/data/tutors'

 
export function HomeTutorCard({ tutor }: { tutor: Tutor }) {
  const href = `/tutor/${tutor.slug}`
  return (
    <Link
      href={href}
      className="group flex h-full w-60 shrink-0 snap-start flex-col gap-3 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
    >
      <div className="flex items-center gap-3">
        <TutorPortrait tutor={tutor} className="size-20 rounded-xl" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold text-foreground">{tutor.name}</p>
          <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">{tutor.headline}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {tutor.subjects.slice(0, 2).map((subject) => (
          <span key={subject} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">
            {subject}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between border-t pt-2.5">
        <span className="text-xs text-muted-foreground">{tutor.modes.join(' & ')}</span>
        <span className="text-sm font-semibold text-primary group-hover:underline">View Profile</span>
      </div>
    </Link>
  )
}
