import { Search, BookOpen, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

export function NotesMarketplaceHero({
  search,
  onSearchChange,
}: {
  search: string
  onSearchChange: (value: string) => void
}) {
  return (
    <div className="bg-linear-to-b from-primary/10 via-primary/5 to-transparent border-b border-border/60 py-10 sm:py-14">
      <div className="container-shell max-w-5xl mx-auto space-y-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Study Resources</span>
        </div>

        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold font-heading text-foreground tracking-tight">
            Notes & Study Material
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Find revision notes, exam preparation material, formula sheets and verified study resources.
          </p>
        </div>

        <div className="max-w-xl mx-auto relative pt-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground mt-1" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes by subject, course, exam or topic..."
            className="pl-11 h-12 text-sm bg-card shadow-sm border-border rounded-xl"
          />
        </div>
      </div>
    </div>
  )
}
