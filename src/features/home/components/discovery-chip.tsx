import Link from 'next/link'

export function DiscoveryChip({ href, label, meta }: { href: string; label: string; meta?: string }) {
  return (
    <Link href={href} className="rounded-md border bg-card px-3 py-1.5 text-sm outline-none transition-colors hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40">
      <span className="font-medium text-foreground">{label}</span>
      {meta && <span className="hidden text-muted-foreground sm:inline"> · {meta}</span>}
    </Link>
  )
}
