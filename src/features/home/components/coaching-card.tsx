import Link from 'next/link'
import type { CoachingProvider } from '@/features/coaching/data/coaching'

const tileStyles = ['bg-primary text-primary-foreground', 'bg-accent text-accent-foreground', 'bg-success-surface text-success', 'bg-warning-surface text-warning']

function getInitials(name: string) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()
}

 
export function HomeCoachingCard({ coaching, index }: { coaching: CoachingProvider; index: number }) {
  const href = coaching.hasDetailPage ? `/coaching/${coaching.slug}` : '/coaching'
  return (
    <Link
      href={href}
      className="group flex h-full w-60 shrink-0 snap-start flex-col gap-3 rounded-[12px] border bg-card p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 sm:w-auto"
    >
      <div className="flex items-center gap-3">
        <div className={`flex size-20 shrink-0 items-center justify-center rounded-xl font-heading text-2xl font-extrabold ${tileStyles[index % tileStyles.length]}`}>{getInitials(coaching.name)}</div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-[15px] leading-snug font-bold text-foreground">{coaching.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{coaching.providerType} · {coaching.location}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {coaching.exams.slice(0, 2).map((exam) => (
          <span key={exam} className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">
            {exam}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-end border-t pt-2.5">
        <span className="text-sm font-semibold text-primary group-hover:underline">{coaching.hasDetailPage ? 'View Details' : 'Details Soon'}</span>
      </div>
    </Link>
  )
}
