import Link from 'next/link'
import { Award, BookOpen, Compass, ChevronRight, FileText, Landmark, Library, Presentation, UserRound, Wrench, type LucideIcon } from 'lucide-react'
import { SpotArt, type SpotArtName } from '@/components/shared/spot-art'
import { searchKinds, type SearchEntry, type SearchKind } from '../data/search-index'

export const kindIcons: Record<SearchKind, LucideIcon> = {
  stream: Compass,
  college: Landmark,
  course: BookOpen,
  exam: FileText,
  scholarship: Award,
  coaching: Presentation,
  tutor: UserRound,
  note: Library,
  tool: Wrench,
}

export const kindArt: Record<SearchKind, SpotArtName> = {
  stream: 'guide',
  college: 'college',
  course: 'courses',
  exam: 'exam',
  scholarship: 'scholarship',
  coaching: 'presentation',
  tutor: 'tutor',
  note: 'notes',
  tool: 'predictor',
}

const kindLabel = Object.fromEntries(searchKinds.map(({ kind, label }) => [kind, label])) as Record<SearchKind, string>

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function Highlight({ text, query }: { text: string; query: string }) {
  const words = query.trim().split(/\s+/).filter((word) => word.length > 1).map(escape)
  if (!words.length) return <>{text}</>
  const pattern = new RegExp(`(${words.join('|')})`, 'gi')
  return (
    <>
      {text.split(pattern).map((part, index) =>
        index % 2 ? (
          <mark key={index} className="bg-transparent font-bold text-primary">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function SearchResultRow({ entry, query = '' }: { entry: SearchEntry; query?: string }) {
  return (
    <li>
      <Link href={entry.href} className="group flex min-h-18 items-center gap-3.5 px-4 py-3 outline-none transition-colors hover:bg-muted/60 focus-visible:bg-secondary sm:px-5">
        <SpotArt name={kindArt[entry.kind]} className="size-11 rounded-lg" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-foreground group-hover:text-primary">
            <Highlight text={entry.title} query={query} />
          </span>
          <span className="mt-0.5 flex min-w-0 items-center gap-2 text-[13px] text-muted-foreground">
            <span className="shrink-0 rounded bg-secondary px-1.5 py-px text-[11px] font-semibold text-primary">{kindLabel[entry.kind]}</span>
            <span className="truncate">{entry.subtitle}</span>
          </span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground/60 group-hover:text-primary" aria-hidden="true" />
      </Link>
    </li>
  )
}
