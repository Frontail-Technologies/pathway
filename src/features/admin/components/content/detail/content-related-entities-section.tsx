import type { AdminContentEntry } from '@/features/admin/data/admin-content'
import { Badge } from '@/components/ui/badge'
import { Link2, ExternalLink, ArrowUpRight, Building2, BookOpen, Award, GraduationCap, Users } from 'lucide-react'
import Link from 'next/link'

export function ContentRelatedEntitiesSection({
  entry,
}: {
  entry: AdminContentEntry
}) {
  const entities = entry.resolvedRelatedEntities || []

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'institution':
        return <Building2 className="w-4 h-4 text-blue-600" />
      case 'program':
        return <BookOpen className="w-4 h-4 text-emerald-600" />
      case 'scholarship':
        return <Award className="w-4 h-4 text-amber-600" />
      case 'exam':
        return <GraduationCap className="w-4 h-4 text-purple-600" />
      case 'tutor':
      case 'coaching':
        return <Users className="w-4 h-4 text-indigo-600" />
      default:
        return <Link2 className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="bg-card rounded-xl p-5 border border-border/60 shadow-xs space-y-4">
      <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">Related Canonical Entities</h2>
        </div>
        <Badge variant="secondary" className="text-xs px-2 py-0">
          {entities.length} Linked
        </Badge>
      </div>

      {entities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {entities.map((item, idx) => (
            <div
              key={`${item.entityType}-${item.entityId}-${idx}`}
              className="p-3.5 rounded-lg border border-border/60 bg-muted/20 flex flex-col justify-between gap-2.5"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {getEntityIcon(item.entityType)}
                    <span className="text-xs font-bold text-foreground line-clamp-1">
                      {item.name}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0 border-border/60">
                    {item.typeLabel}
                  </Badge>
                </div>
                {item.subtitle && (
                  <p className="text-[11px] text-muted-foreground line-clamp-1">
                    {item.subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                {item.adminUrl ? (
                  <Link
                    href={item.adminUrl}
                    className="inline-flex items-center gap-1 text-primary hover:underline text-[11px] font-medium"
                  >
                    <span>View in Admin</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                ) : (
                  <span className="text-[11px] text-muted-foreground/60">No admin page</span>
                )}

                {item.publicUrl ? (
                  <Link
                    href={item.publicUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground text-[11px] font-medium"
                  >
                    <span>Public Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                ) : (
                  <span className="text-[11px] text-muted-foreground/60">No public page</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-muted/10 rounded-lg border border-dashed border-border/70 text-xs text-muted-foreground">
          No related entities tagged to this article. Canonical institutions, programs, scholarships, or exams can be linked during editing.
        </div>
      )}
    </div>
  )
}
