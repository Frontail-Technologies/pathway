import Link from 'next/link'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
import { MobileBottomNavigation } from '@/components/layout/mobile-navigation'

export const metadata: Metadata = { title: 'Page Not Found' }

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col pb-15 md:pb-0">
      <PublicHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:py-20">
        <div className="w-full max-w-md text-center">
          <p className="font-heading text-5xl font-extrabold text-primary sm:text-[64px]">404</p>
          <h1 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl">Page not found</h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            The page you&apos;re looking for may have moved or no longer exists.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
            <Button className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/" />}>
              Go to Homepage
            </Button>
            <Button variant="outline" className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
              Browse Colleges
            </Button>
          </div>
        </div>
      </main>
      <PublicFooter />
      <MobileBottomNavigation />
    </div>
  )
}
