import { Clock } from 'lucide-react'

export function TutorHistorySection({ tutorId }: { tutorId: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-3">
      <h2 className="text-sm font-bold text-foreground">Change History & Audit</h2>
      <div className="flex items-center gap-2 text-xs text-muted-foreground p-3 rounded-lg bg-muted/20 border border-border/40">
        <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
        <span>Profile fixture created for ID: <strong className="text-foreground">{tutorId}</strong>. No automated scraper overwrites logged.</span>
      </div>
    </div>
  )
}
