import { Bookmark, MessageSquareQuote } from 'lucide-react'

export function StudentCrossModuleSection() {
  return (
    <div className="bg-card rounded-xl p-5 sm:p-6 shadow-xs border-0 space-y-4">
      <h2 className="text-base font-bold font-heading text-foreground">
        Related Activity
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-lg bg-muted/20 border border-dashed border-border space-y-1.5">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <Bookmark className="w-4 h-4 text-muted-foreground" />
            <span>Saved Items</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Not available to Admin yet.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-muted/20 border border-dashed border-border space-y-1.5">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <MessageSquareQuote className="w-4 h-4 text-muted-foreground" />
            <span>Enquiries & Applications</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            No connected enquiry history yet.
          </p>
        </div>
      </div>
    </div>
  )
}
