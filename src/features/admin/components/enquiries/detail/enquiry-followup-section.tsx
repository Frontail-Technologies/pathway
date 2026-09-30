import type { AdminEnquiry } from '@/features/admin/data/admin-enquiries'
import { History, PhoneCall, Mail, StickyNote, RefreshCw } from 'lucide-react'

export function EnquiryFollowupSection({ enquiry }: { enquiry: AdminEnquiry }) {
  const followups = enquiry.followups ?? []

  const getFollowupIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
      case 'email':
        return <Mail className="w-3.5 h-3.5 text-purple-600" />
      case 'note':
        return <StickyNote className="w-3.5 h-3.5 text-amber-600" />
      case 'status_change':
        return <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
      default:
        return <History className="w-3.5 h-3.5 text-muted-foreground" />
    }
  }

  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Follow-up History
      </h2>

      {followups.length > 0 ? (
        <div className="space-y-3">
          {followups.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-lg bg-muted/30 border border-border/60 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  {getFollowupIcon(item.type)}
                  <span className="capitalize">{item.type.replace('_', ' ')}</span>
                  <span className="text-muted-foreground font-normal">• by {item.performedBy}</span>
                </div>
                <span className="text-[11px] text-muted-foreground font-mono">
                  {item.performedAt}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-muted/20 border border-dashed border-border flex items-center gap-3 text-muted-foreground text-xs">
          <History className="w-4 h-4 shrink-0 text-muted-foreground/70" />
          <span>No follow-up activity yet.</span>
        </div>
      )}
    </div>
  )
}
