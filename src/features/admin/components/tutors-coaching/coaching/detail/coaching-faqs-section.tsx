import { HelpCircle } from 'lucide-react'
import type { AdminCoachingProvider } from '@/features/admin/data/admin-coaching'

export function CoachingFaqsSection({ provider }: { provider: AdminCoachingProvider }) {
  const faqs = provider.faqs || []

  if (faqs.length === 0) return null

  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-foreground">Frequently Asked Questions</h2>
        <span className="text-[11px] text-muted-foreground">{faqs.length} FAQ items</span>
      </div>

      <div className="space-y-3 text-xs">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-muted/30 p-3.5 rounded-lg border border-border/50 space-y-1">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
              <span className="font-bold text-foreground">{faq.question}</span>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-5.5">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
