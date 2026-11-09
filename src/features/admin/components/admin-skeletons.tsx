import { cn } from '@/lib/utils'

const bone = 'animate-pulse rounded-md bg-muted'

export function AdminStatSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:gap-4 xl:grid-cols-4" aria-busy aria-label="Loading">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col rounded-xl border border-border bg-card p-(--admin-pad) shadow-sm">
          <div className={cn(bone, 'mb-(--admin-pad-y) size-11 rounded-xl')} />
          <div className={cn(bone, 'h-3.5 w-24')} />
          <div className={cn(bone, 'mt-2 h-7 w-16')} />
          <div className={cn(bone, 'mt-2 h-3 w-32')} />
        </div>
      ))}
    </div>
  )
}

export function AdminTableSkeleton({ rows = 6, columns = 5, header = true }: { rows?: number; columns?: number; header?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm" aria-busy aria-label="Loading">
      {header ? (
        <div className="flex items-center gap-3 border-b border-border px-(--admin-pad) py-(--admin-pad-y)">
          <div className={cn(bone, 'h-9 w-72 rounded-lg')} />
          <div className={cn(bone, 'h-9 w-28 rounded-lg')} />
          <div className={cn(bone, 'ml-auto h-9 w-24 rounded-lg')} />
        </div>
      ) : null}
      <div className="flex h-11 items-center gap-6 border-b border-border bg-muted/40 px-(--admin-pad)">
        {Array.from({ length: columns }).map((_, index) => (
          <div key={index} className={cn(bone, 'h-3 bg-muted-foreground/15', index === 0 ? 'w-40' : 'w-20')} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, row) => (
        <div key={row} className="flex h-14 items-center gap-6 border-b border-border px-(--admin-pad) last:border-0">
          <div className="flex w-40 items-center gap-3">
            <div className={cn(bone, 'size-10 rounded-lg')} />
            <div className="flex flex-col gap-1.5">
              <div className={cn(bone, 'h-3.5 w-28')} />
              <div className={cn(bone, 'h-3 w-20')} />
            </div>
          </div>
          {Array.from({ length: columns - 1 }).map((_, column) => (
            <div key={column} className={cn(bone, 'h-3.5', column % 2 ? 'w-24' : 'w-16')} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function AdminPanelSkeleton({ lines = 4, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn('rounded-xl border border-border bg-card p-(--admin-pad) shadow-sm', className)} aria-busy aria-label="Loading">
      <div className={cn(bone, 'h-4 w-40')} />
      <div className="mt-4 flex flex-col gap-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div key={index} className={cn(bone, 'h-3.5', index % 3 === 2 ? 'w-1/2' : 'w-full')} />
        ))}
      </div>
    </div>
  )
}
