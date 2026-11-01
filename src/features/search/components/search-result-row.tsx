import Link from 'next/link'
import { Award, BookOpen, Compass, ChevronRight, FileText, Landmark, Library, Presentation, UserRound, Wrench, type LucideIcon } from 'lucide-react'
import type { SearchEntry, SearchKind } from '../data/search-index'

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

export function SearchResultRow({ entry }: { entry: SearchEntry }) {
  const Icon = kindIcons[entry.kind]
  return (
    <li>
      <Link href={entry.href} className="group flex min-h-16 items-center gap-3 px-4 py-3 outline-none transition-colors hover:bg-secondary/60 focus-visible:bg-secondary active:bg-secondary">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-foreground group-hover:text-primary">{entry.title}</span>
          <span className="block truncate text-xs text-muted-foreground">{entry.subtitle}</span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground/60" aria-hidden="true" />
      </Link>
    </li>
  )
}
