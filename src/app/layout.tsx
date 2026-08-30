import { Inter, Manrope } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })

export const metadata: Metadata = { title: { default: 'Pathway — Education discovery, made clearer', template: '%s | Pathway' }, description: 'A trusted education discovery platform for finding the right colleges, courses, exams, and opportunities.', generator: 'v0.app' }
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#1D4ED8', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${inter.variable} ${manrope.variable} antialiased`}>{children}</body></html>
}
