import { AdminNote } from '@/features/admin/data/admin-notes'
import { Badge } from '@/components/ui/badge'
import { CreditCard, Lock } from 'lucide-react'

export function NotePricingPanel({ note }: { note: AdminNote }) {
  const isFree = note.pricingType === 'free'

  return (
    <div className="bg-card rounded-xl p-5 border-0 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Pricing & Access
        </h3>
        <Badge
          variant={isFree ? 'secondary' : 'default'}
          className="text-xs font-bold font-mono"
        >
          {note.formattedPrice}
        </Badge>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Access Model:</span>
          <span className="font-semibold text-foreground capitalize">
            {note.pricingType} Access
          </span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Base Value:</span>
          <span className="font-mono text-foreground">
            {note.pricePaise ? `${note.pricePaise} Paise` : '0 Paise'}
          </span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Currency:</span>
          <span className="font-mono text-foreground">{note.currency}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-border/60 text-xs text-muted-foreground space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-foreground">
          <CreditCard className="w-3.5 h-3.5 text-primary" />
          <span>Payment Provider Policy</span>
        </div>
        <p className="text-[10px] leading-relaxed">
          Purchases will be transacted via server-verified checkout once the payment gateway is connected.
        </p>
      </div>
    </div>
  )
}
