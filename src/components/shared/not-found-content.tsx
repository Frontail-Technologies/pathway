import Link from 'next/link'
import { Button } from '@/components/ui/button'




















 
export function NotFoundContent() {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center px-4 py-12 sm:py-20 lg:min-h-[calc(100dvh-7.5rem)]">
      <div className="w-full max-w-md text-center">
        <p className="font-heading text-5xl font-extrabold text-primary sm:text-[64px]">404</p>
        <h1 className="mt-2 font-heading text-xl font-bold text-foreground sm:text-2xl">Page not found</h1>
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-center">
          <Button className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/" />}>
            Go to Homepage
          </Button>
          <Button variant="outline" className="h-11 px-6 text-sm font-semibold" nativeButton={false} render={<Link href="/colleges" />}>
            Browse Colleges
          </Button>
        </div>
      </div>
    </div>
  )
}
