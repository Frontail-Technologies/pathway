import Link from 'next/link'
import { StudentNavigation } from './student-navigation'

export function StudentDashboardLayout({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-muted"><header className="border-b bg-card"><div className="container-shell flex h-14 items-center justify-between"><Link href="/" className="font-heading text-lg font-extrabold text-primary">pathway<span className="text-cta">.</span></Link><span className="text-sm font-medium text-muted-foreground">Student space</span></div></header><div className="container-shell flex gap-8 py-8"><aside className="hidden w-52 shrink-0 md:block"><StudentNavigation /></aside><main className="min-w-0 flex-1">{children}</main></div></div> }
