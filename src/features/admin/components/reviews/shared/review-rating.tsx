import { Star } from 'lucide-react'

export function Rating({ value }: { value?: number }) {
  if (!value) return <span className="text-muted-foreground">—</span>
  return (
    <span className="inline-flex items-center gap-1 font-medium text-foreground tabular-nums">
      <Star className="size-3.5 fill-current text-muted-foreground" aria-hidden="true" />
      {value.toFixed(1)}
      <span className="sr-only">out of 5</span>
    </span>
  )
}
