import Link from 'next/link'
import { Rating } from '@/components/shared/rating'
import { VerifiedBadge } from '@/components/shared/verified-badge'
import type { CoachingInstitute } from '../data/coaching-institutes'

const tileStyles = ['bg-primary text-primary-foreground', 'bg-accent text-accent-foreground', 'bg-success-surface text-success', 'bg-warning-surface text-warning']

function getInitials(name: string) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
}

export function CoachingCard({ coaching, index }: { coaching: CoachingInstitute; index: number }) {
  return (
    <Link
      href={`/coaching?id=${coaching.id}`}
      className="group flex h-full w-[85vw] shrink-0 snap-start flex-col gap-2.5 rounded-[10px] border bg-card p-3.5 outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto sm:gap-3 sm:p-4"
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg text-sm font-bold sm:size-14 ${tileStyles[index % tileStyles.length]}`}>
          {getInitials(coaching.name)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate text-[15px] font-semibold text-foreground">{coaching.name}</p>
            {coaching.verified && <VerifiedBadge />}
          </div>
          <p className="truncate text-xs text-muted-foreground">{coaching.focus}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
        <Rating value={coaching.rating} count={coaching.reviewCount} />
        <span>{coaching.mode}</span>
        <span>{coaching.city}</span>
      </div>
      <div className="mt-auto flex items-center justify-end border-t pt-2.5 sm:pt-3">
        <span className="text-xs font-semibold text-primary group-hover:underline sm:text-sm">View Details</span>
      </div>
    </Link>
  )
}
