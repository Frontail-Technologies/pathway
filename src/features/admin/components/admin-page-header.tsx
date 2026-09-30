import Link from 'next/link'
import { Plus } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function AdminPageHeader({
  title = 'Admin Dashboard',
}: {
  title?: string
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/admin/institutions"
          className={buttonVariants({ size: 'sm', className: 'text-xs font-semibold shadow-xs' })}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Institution
        </Link>
      </div>
    </div>
  )
}
