import { Check } from 'lucide-react'
import type { AdminTutor } from '@/features/admin/data/admin-tutors'

export function TutorOverviewSection({ tutor }: { tutor: AdminTutor }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Overview & Bio</h2>

      <div className="space-y-3 text-xs">
        <div>
          <span className="font-semibold text-muted-foreground block mb-1">Headline</span>
          <p className="text-foreground bg-muted/30 p-2.5 rounded-lg border border-border/50">
            {tutor.headline}
          </p>
        </div>

        <div>
          <span className="font-semibold text-muted-foreground block mb-1">Short Summary</span>
          <p className="text-foreground leading-relaxed bg-muted/30 p-2.5 rounded-lg border border-border/50">
            {tutor.intro}
          </p>
        </div>

        {tutor.detail?.longBio && (
          <div>
            <span className="font-semibold text-muted-foreground block mb-1">Detailed Profile Bio</span>
            <p className="text-foreground leading-relaxed bg-muted/30 p-3 rounded-lg border border-border/50 whitespace-pre-line">
              {tutor.detail.longBio}
            </p>
          </div>
        )}

        {tutor.detail?.whoHelps && tutor.detail.whoHelps.length > 0 && (
          <div className="pt-2">
            <span className="font-semibold text-muted-foreground block mb-2">Student Profiles Supported</span>
            <div className="space-y-1.5">
              {tutor.detail.whoHelps.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-foreground">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
