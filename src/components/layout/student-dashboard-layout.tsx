import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
import { StudentMobileMenu } from './student-mobile-menu'
import { StudentNavigation } from './student-navigation'
import { StudentSectionTabs } from './student-section-tabs'





 
export function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pw-student-shell flex min-h-dvh flex-col bg-background">
      <header className="web-chrome sticky top-0 z-30 bg-primary text-primary-foreground">
        <div className="mx-auto flex h-14 w-full max-w-[1680px] items-center gap-2 px-4 sm:gap-3 sm:px-6">
          <StudentMobileMenu />
          <Link href="/student" aria-label="Pathway student dashboard" className="outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            <Logo inverted />
          </Link>
          <span className="hidden rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium sm:inline">Student space</span>
          <div className="flex-1" />
          <Link href="/" className="rounded-md px-2 py-1.5 text-[13px] font-medium whitespace-nowrap outline-none hover:bg-white/10 sm:text-sm focus-visible:ring-2 focus-visible:ring-white/60">
            Back to Pathway
          </Link>
        </div>
      </header>

      <StudentSectionTabs />

      <div className="mx-auto flex w-full max-w-[1680px] flex-1 gap-6 px-4 py-4 sm:px-6 lg:py-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-20 rounded-[12px] border bg-card p-2 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
            <StudentNavigation />
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <footer className="border-t bg-card">
        <p className="mx-auto max-w-[1680px] px-4 py-3 text-xs text-muted-foreground sm:px-6">© 2026 Pathway · Demo student account — sign-in is not connected yet.</p>
      </footer>
    </div>
  )
}
