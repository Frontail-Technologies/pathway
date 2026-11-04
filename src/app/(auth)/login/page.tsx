import type { Metadata } from 'next'
import { AuthFlow } from '@/features/auth/components/auth-flow'

export const metadata: Metadata = { title: 'Sign in', description: 'Sign in to Pathway with your email and password.', robots: { index: false } }

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string | string[]; as?: string | string[] }> }) {
  const { next, as } = await searchParams
  return <AuthFlow mode="login" next={typeof next === 'string' ? next : undefined} accountType={as === 'tutor' ? 'tutor' : undefined} />
}
