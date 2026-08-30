import Link from 'next/link'
import { adminNavigation } from '@/config/navigation'

export function AdminSidebar() { return <aside className="hidden w-56 shrink-0 md:block"><p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Workspace</p><nav className="flex flex-col gap-1">{adminNavigation.map(item => <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-card hover:text-primary">{item.label}</Link>)}</nav></aside> }
