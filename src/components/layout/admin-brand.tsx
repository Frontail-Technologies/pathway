import Link from 'next/link'
import { cn } from '@/lib/utils'

export function AdminBrand({ onClick, tone = 'default', className }: { onClick?: () => void; tone?: 'default' | 'inverse'; className?: string }) {
  const inverse = tone === 'inverse'
  return (
    <Link href="/admin" onClick={onClick} aria-label="Pathway admin home" className={cn('flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2', inverse ? 'focus-visible:ring-white/60' : 'focus-visible:ring-ring', className)}>
      <span className={cn('flex size-8 items-center justify-center rounded-lg', inverse ? 'bg-white' : 'bg-primary')} aria-hidden="true">
        <svg viewBox="0 0 48 48" className="size-6">
          <path d="M11 35h9v-7h8v-7h9" fill="none" stroke={inverse ? '#1d4ed8' : '#ffffff'} strokeWidth={4.2} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M31 15h6v6" fill="none" stroke="#f97316" strokeWidth={4.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn('font-heading text-[17px] font-extrabold tracking-tight', inverse ? 'text-white' : 'text-foreground')}>Pathway</span>
        <span className={cn('mt-0.5 text-[11px] font-medium tracking-[0.5px] uppercase', inverse ? 'text-admin-sidebar-muted' : 'text-muted-foreground')}>Admin</span>
      </span>
    </Link>
  )
}
