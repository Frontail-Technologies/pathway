import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { DiscoveryTool } from '../data/discovery-tools'

export function DiscoveryToolCard({ tool }: { tool: DiscoveryTool }) {
  const Icon = tool.icon
  return (
    <Link
      href={tool.href}
      className="group flex h-full items-center gap-3 rounded-[12px] border bg-card p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] outline-none transition-colors hover:border-primary hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary/40 sm:min-h-28 sm:p-4"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary group-hover:bg-white sm:size-12">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-foreground sm:text-[15px]">{tool.title}</span>
        {tool.description && <span className="mt-0.5 hidden text-xs leading-5 text-muted-foreground sm:line-clamp-2 sm:block">{tool.description}</span>}
      </span>
      <ChevronRight className="hidden size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary sm:block" aria-hidden="true" />
    </Link>
  )
}
