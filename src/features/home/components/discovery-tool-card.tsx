import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { DiscoveryTool } from '../data/discovery-tools'

export function DiscoveryToolCard({ tool }: { tool: DiscoveryTool }) {
  const Icon = tool.icon
  return (
    <Link
      href={tool.href}
      className="group flex h-full flex-col gap-2.5 rounded-[10px] border bg-card p-3.5 outline-none transition-colors hover:border-primary hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40 sm:gap-3 sm:p-4"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary sm:size-10">
        <Icon className="size-4.5 sm:size-5" aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-sm font-semibold text-foreground sm:text-[15px]">{tool.title}</p>
        {tool.description && <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{tool.description}</p>}
      </div>
      <ChevronRight className="mt-auto size-4 shrink-0 self-end text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
    </Link>
  )
}
