import Link from 'next/link'
import { studentNavigation } from '@/config/navigation'

export function StudentNavigation() { return <nav aria-label="Student navigation" className="flex flex-col gap-1">{studentNavigation.map(item => <Link key={item.href} href={item.href} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-card hover:text-primary">{item.label}</Link>)}</nav> }
