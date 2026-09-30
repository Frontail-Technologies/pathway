import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

 
export function RepeatableEntryCard({ title, onRemove, children }: { title: string; onRemove?: () => void; children: React.ReactNode }) {
  return (
    <div className="rounded-[10px] border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {onRemove && (
          <Button type="button" variant="ghost" size="icon-sm" onClick={onRemove} aria-label={`Remove ${title}`}>
            <Trash2 className="size-4 text-muted-foreground" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  )
}
