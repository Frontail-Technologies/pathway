import { Tag } from '../../kit'

/** Up to `max` neutral tags, then a quiet "+N" for the rest. */
export function TagOverflow({ items, max = 2 }: { items: readonly string[]; max?: number }) {
  if (items.length === 0) return <span className="text-muted-foreground">—</span>
  const rest = items.length - max
  return (
    <div className="flex flex-wrap items-center gap-1" title={rest > 0 ? items.join(', ') : undefined}>
      {items.slice(0, max).map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
      {rest > 0 ? <span className="text-[13px] text-muted-foreground tabular-nums">+{rest}</span> : null}
    </div>
  )
}

/** Every item as a neutral tag (detail pages). */
export function TagList({ items }: { items: readonly string[] }) {
  if (items.length === 0) return <span className="font-normal text-muted-foreground">None</span>
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  )
}
