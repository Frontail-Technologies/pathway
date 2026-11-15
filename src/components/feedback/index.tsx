import type { ReactNode } from 'react'
import { Illustration } from '@/components/shared/illustration'
export function LoadingState() { return <div role="status" className="flex flex-col items-center gap-3 py-8"><span className="pw-loader" /><span className="sr-only">Loading…</span></div> }
export function EmptyState({ title = 'Nothing here yet' }: { title?: string }) { return <div className="flex flex-col items-center px-6 text-center"><Illustration name="noResults" width={180} /><p className="mt-2 font-heading font-bold text-foreground">{title}</p><p className="mt-1 text-sm text-muted-foreground">Try a different search or fewer filters.</p></div> }
export function ErrorState({ message = 'Something went wrong.' }: { message?: string }) { return <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{message}</div> }
export function PageLoadingSkeleton({ children }: { children?: ReactNode }) { return <div aria-busy="true" className="flex flex-col gap-3">{children ?? <><div className="h-8 w-1/3 animate-pulse rounded bg-muted" /><div className="h-24 animate-pulse rounded bg-muted" /></>}</div> }
