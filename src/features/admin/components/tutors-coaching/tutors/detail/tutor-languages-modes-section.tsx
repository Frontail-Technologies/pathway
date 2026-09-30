import { Globe, Video, UserCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'

export function TutorLanguagesModesSection({ tutor }: { tutor: AdminTutor }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Languages & Delivery Modes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-2 bg-muted/30 p-3.5 rounded-lg border border-border/50">
          <div className="flex items-center gap-1.5 font-semibold text-muted-foreground">
            <Globe className="w-4 h-4 text-primary" />
            <span>Languages Spoken / Taught</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tutor.languages?.map((lang) => (
              <Badge key={lang} variant="info" size="sm">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2 bg-muted/30 p-3.5 rounded-lg border border-border/50">
          <div className="flex items-center gap-1.5 font-semibold text-muted-foreground">
            <Video className="w-4 h-4 text-primary" />
            <span>Delivery Modes</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tutor.modes?.map((mode) => (
              <Badge key={mode} variant="outline" size="sm">
                {mode}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
