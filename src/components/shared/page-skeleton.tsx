const Bar = ({ className }: { className: string }) => <div className={`animate-pulse rounded-md bg-muted ${className}`} />

export function PageSkeleton() {
  return (
    <div role="status" aria-label="Loading page" className="min-h-[70vh]">
      <div className="border-b bg-card">
        <div className="container-shell px-4 pt-5 pb-6 lg:pt-6 lg:pb-8">
          <Bar className="h-4 w-40" />
          <Bar className="mt-5 h-8 w-2/3 max-w-xl" />
          <Bar className="mt-3 h-4 w-full max-w-2xl" />
          <Bar className="mt-2 h-4 w-1/2 max-w-md" />
        </div>
      </div>
      <div className="bg-muted/50 pb-10">
        <div className="container-shell flex flex-col gap-4 px-4 pt-4 lg:pt-6">
          {[0, 1, 2].map((index) => (
            <div key={index} className="rounded-xl border bg-card p-4 sm:p-6">
              <Bar className="h-5 w-48" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2].map((cell) => (
                  <div key={cell} className="rounded-lg border p-4">
                    <Bar className="h-4 w-3/4" />
                    <Bar className="mt-2.5 h-3 w-full" />
                    <Bar className="mt-2 h-3 w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading…</span>
    </div>
  )
}
