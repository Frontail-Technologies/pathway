'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Logo } from '@/components/shared/logo'
import { DetailTabNav } from '@/components/shared/detail-tab-nav'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { TutorSpaceProvider, useTutorSpace } from '../state/tutor-space-provider'
import { TutorSpaceNav, tutorSpaceNavigation } from './tutor-space-nav'
import { TutorSignIn } from './tutor-sign-in'

const tabs = tutorSpaceNavigation.map(({ href, label }) => ({ href, label }))

export function TutorSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <TutorSpaceProvider>
      <TutorSpaceFrame>{children}</TutorSpaceFrame>
    </TutorSpaceProvider>
  )
}

function TutorSpaceFrame({ children }: { children: React.ReactNode }) {
  const { hydrated, signedIn } = useTutorSpace()
  const [menuOpen, setMenuOpen] = useState(false)
  const ready = hydrated && signedIn

  return (
    <div className="pw-dashboard-shell flex min-h-dvh flex-col bg-background">
      <header className="web-chrome sticky top-0 z-30 bg-primary text-primary-foreground">
        <div className="mx-auto flex h-14 w-full max-w-[1680px] items-center gap-2 px-4 sm:gap-3 sm:px-6">
          {ready && (
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger render={<button type="button" aria-label="Open tutor menu" className="flex size-10 cursor-pointer items-center justify-center rounded-md outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 lg:hidden" />}>
                <Menu className="size-5" aria-hidden="true" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="border-b p-4">
                  <SheetTitle>Tutor space</SheetTitle>
                </SheetHeader>
                <div className="p-3">
                  <TutorSpaceNav onNavigate={() => setMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Link href="/tutor-dashboard" aria-label="Pathway tutor space" className="outline-none focus-visible:ring-2 focus-visible:ring-white/60">
            <Logo inverted />
          </Link>
          <span className="hidden rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium sm:inline">Tutor space</span>
          <div className="flex-1" />
          <Link href="/" className="rounded-md px-2 py-1.5 text-[13px] font-medium whitespace-nowrap outline-none hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 sm:text-sm">
            Back to Pathway
          </Link>
        </div>
      </header>

      {ready && <DetailTabNav items={tabs} label="Tutor sections" className="lg:hidden" />}

      <div className="mx-auto flex w-full max-w-[1680px] flex-1 gap-6 px-4 py-4 sm:px-6 lg:py-6">
        {ready && (
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-20 rounded-[12px] border bg-card p-2 shadow-[0_2px_10px_rgba(15,23,42,0.04)]">
              <TutorSpaceNav />
            </div>
          </aside>
        )}
        <main className="min-w-0 flex-1">{!hydrated ? <div aria-busy="true" className="min-h-[60dvh]" /> : signedIn ? children : <TutorSignIn />}</main>
      </div>

      <footer className="border-t bg-card">
        <p className="mx-auto max-w-[1680px] px-4 py-3 text-xs text-muted-foreground sm:px-6">© 2026 Pathway · Demo tutor account — sign-in and requests are not connected yet.</p>
      </footer>
    </div>
  )
}
