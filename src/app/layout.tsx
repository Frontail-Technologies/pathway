import { Inter, Manrope } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { Toaster } from '@/components/ui/sonner'
import { SavedItemsProvider } from '@/features/saved/saved-items-provider'
import { DemoAuthProvider } from '@/features/student/state/demo-auth-provider'
import { StudentProfileProvider } from '@/features/student/state/student-profile-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = { title: { default: 'Pathway — Education discovery, made clearer', template: '%s | Pathway' }, description: 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#1D4ED8', width: 'device-width', initialScale: 1 }

// Frontend-demo state providers (saved items, demo sign-in flag, student profile) live at the root so Save buttons on
// public pages, the auth screens and the Student Account all share one store. Nothing here talks to a server.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} ${manrope.variable} antialiased`}>
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
