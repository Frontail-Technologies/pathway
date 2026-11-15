export default function StudentLoading() {
  return (
    <div role="status" aria-label="Loading" className="flex flex-col gap-4">
      <div className="h-7 w-48 animate-pulse rounded-md bg-muted" />
      {[0, 1].map((index) => (
        <div key={index} className="rounded-xl border bg-card p-5">
          <div className="h-5 w-40 animate-pulse rounded-md bg-muted" />
          <div className="mt-4 h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="mt-2 h-4 w-2/3 animate-pulse rounded-md bg-muted" />
        </div>
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  )
}
