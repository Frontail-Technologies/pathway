import { Suspense } from 'react'
import { Inter, Manrope } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { SavedItemsProvider } from '@/features/saved/saved-items-provider'
import { DemoAuthProvider } from '@/features/student/state/demo-auth-provider'
import { StudentProfileProvider } from '@/features/student/state/student-profile-provider'
import { NavigationLoader } from '@/components/shared/navigation-loader'
import { AppShellBridge } from '@/components/app-shell/app-shell-bridge'
import { appShellBootScript } from '@/lib/app-shell'
import { siteConfig } from '@/config/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = { metadataBase: new URL(siteConfig.url), title: { default: 'Pathway — Education discovery, made clearer', template: '%s | Pathway' }, description: 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#1D4ED8', width: 'device-width', initialScale: 1, viewportFit: 'cover' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the boot script sets data-app-shell on <html> before hydration.
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: appShellBootScript }} />
      </head>
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
        <NavigationLoader />
        <Suspense fallback={null}>
          <AppShellBridge />
        </Suspense>
        <SavedItemsProvider>
          <DemoAuthProvider>
            <StudentProfileProvider>{children}</StudentProfileProvider>
          </DemoAuthProvider>
        </SavedItemsProvider>
        <Toaster />
      </body>
    </html>
  )
}
