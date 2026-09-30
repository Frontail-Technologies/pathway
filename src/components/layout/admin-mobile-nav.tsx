'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { AdminSidebar } from './admin-sidebar'

export function AdminMobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            type="button"
            aria-label="Open admin navigation menu"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors lg:hidden outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        }
      >
        <Menu className="w-5 h-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 border-0 bg-admin-sidebar text-admin-sidebar-foreground shadow-2xl">
        <SheetHeader className="sr-only">
          <SheetTitle>Admin Navigation</SheetTitle>
        </SheetHeader>
        <AdminSidebar onItemClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
