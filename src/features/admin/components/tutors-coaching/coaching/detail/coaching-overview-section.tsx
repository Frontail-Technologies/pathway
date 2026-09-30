import { Check } from 'lucide-react'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'

export function CoachingOverviewSection({ provider }: { provider: AdminCoachingProvider }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <h2 className="text-sm font-bold text-foreground">Overview & Value Proposition</h2>

      <div className="space-y-3 text-xs">
        <div>
          <span className="font-semibold text-muted-foreground block mb-1">Program Label / Tagline</span>
          <p className="text-foreground bg-muted/30 p-2.5 rounded-lg border border-border/50">
            {provider.programLabel}
          </p>
        </div>

        {provider.aboutCopy && (
          <div>
            <span className="font-semibold text-muted-foreground block mb-1">About Copy (Detail Profile)</span>
            <p className="text-foreground leading-relaxed bg-muted/30 p-3 rounded-lg border border-border/50 whitespace-pre-line">
              {provider.aboutCopy}
            </p>
          </div>
        )}

        {provider.highlights && provider.highlights.length > 0 && (
          <div className="pt-2">
            <span className="font-semibold text-muted-foreground block mb-2">Key Highlights</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {provider.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-muted/20 p-2.5 rounded-lg border border-border/40 text-foreground">
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
