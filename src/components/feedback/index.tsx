import type { ReactNode } from 'react'
export function LoadingState() { return <div role="status" className="py-8 text-center text-sm text-muted-foreground">Loading…</div> }
export function EmptyState({ title = 'Nothing here yet' }: { title?: string }) { return <div className="rounded-lg border border-dashed p-8 text-center"><p className="font-heading font-bold">{title}</p><p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or check back later.</p></div> }
export function ErrorState({ message = 'Something went wrong.' }: { message?: string }) { return <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{message}</div> }
export function PageLoadingSkeleton({ children }: { children?: ReactNode }) { return <div aria-busy="true" className="flex flex-col gap-3">{children ?? <><div className="h-8 w-1/3 animate-pulse rounded bg-muted" /><div className="h-24 animate-pulse rounded bg-muted" /></>}</div> }
