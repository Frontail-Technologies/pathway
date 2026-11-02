import { Skeleton } from '@/components/ui/skeleton'

/** Shown while an admin page loads, in the same shape as a list page (header → toolbar → table). */
export default function AdminLoading() {
  return (
    <div className="space-y-5" aria-busy="true" aria-label="Loading">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-80" />
        <Skeleton className="h-9 w-28" />
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <Skeleton className="h-10 w-full rounded-none" />
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="flex items-center gap-4 border-t border-border px-4 py-3.5">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-4 w-28" />
          </div>
        ))}
      </div>
    </div>
  )
}
