'use client'

import { Suspense, type ReactNode } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { AdminAuthGuard } from '@/features/admin/auth/admin-auth-guard'
import { AdminShellProvider, useAdminShell } from '@/features/admin/state/admin-shell-store'
import { cn } from '@/lib/utils'
import { AdminCrumbs } from './admin-crumbs'
import { AdminSidebar } from './admin-sidebar'
import { AdminTopbar } from './admin-topbar'

function Shell({ children }: { children: ReactNode }) {
  const { collapsed, mode, density, menuOpen, setMenuOpen } = useAdminShell()
  return (
    <div data-theme="admin" data-mode={mode} data-density={density} className="flex min-h-dvh bg-admin-canvas font-body text-foreground">
      <aside className={cn('sticky top-0 z-20 hidden h-dvh w-[270px] shrink-0 overflow-hidden lg:block', collapsed && 'lg:hidden')}>
        <Suspense>
          <AdminSidebar />
        </Suspense>
      </aside>

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <AdminTopbar />
        <main className="min-w-0 flex-1 px-4 py-5 lg:px-6 lg:py-6">
          <div className="mx-auto w-full max-w-[1440px]">
            <Suspense>
              <AdminCrumbs />
              {children}
            </Suspense>
          </div>
        </main>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="w-[290px] max-w-[85vw] border-0 bg-admin-sidebar p-0 text-admin-sidebar-foreground shadow-2xl lg:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Admin navigation</SheetTitle>
          </SheetHeader>
          <Suspense>
            <AdminSidebar onNavigate={() => setMenuOpen(false)} />
          </Suspense>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export function AdminContentLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <AdminAuthGuard>
        <AdminShellProvider>
          <Shell>{children}</Shell>
        </AdminShellProvider>
      </AdminAuthGuard>
    </Suspense>
  )
}
