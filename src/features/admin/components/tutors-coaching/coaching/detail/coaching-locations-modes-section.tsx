import { MapPin, Video, BookOpen, Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'

export function CoachingLocationsModesSection({ provider }: { provider: AdminCoachingProvider }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Location, Modes & Curriculum Coverage</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="space-y-2 bg-muted/30 p-3.5 rounded-lg border border-border/50">
          <div className="flex items-center gap-1.5 font-semibold text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Campus & Geographic Location</span>
          </div>
          <div className="text-foreground font-medium pl-5.5">
            {provider.state ? `${provider.location}, ${provider.state}` : provider.location}
          </div>
        </div>

        <div className="space-y-2 bg-muted/30 p-3.5 rounded-lg border border-border/50">
          <div className="flex items-center gap-1.5 font-semibold text-muted-foreground">
            <Video className="w-4 h-4 text-primary" />
            <span>Delivery Modes</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pl-5.5">
            {provider.modes?.map((mode) => (
              <Badge key={mode} variant="outline" size="sm">
                {mode}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2 bg-muted/30 p-3.5 rounded-lg border border-border/50">
          <div className="flex items-center gap-1.5 font-semibold text-muted-foreground">
            <Target className="w-4 h-4 text-primary" />
            <span>Target Entrance Exams</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pl-5.5">
            {provider.exams?.map((exam) => (
              <Badge key={exam} variant="info" size="sm">
                {exam}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2 bg-muted/30 p-3.5 rounded-lg border border-border/50">
          <div className="flex items-center gap-1.5 font-semibold text-muted-foreground">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Subject Coverage</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pl-5.5">
            {provider.subjects?.map((subject) => (
              <Badge key={subject} variant="outline" size="sm">
                {subject}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
