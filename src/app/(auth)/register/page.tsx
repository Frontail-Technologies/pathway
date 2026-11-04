import type { Metadata } from 'next'
import { AuthFlow } from '@/features/auth/components/auth-flow'

export const metadata: Metadata = { title: 'Create account', description: 'Create a Pathway student or tutor account with your email.', robots: { index: false } }

export default async function Page({ searchParams }: { searchParams: Promise<{ next?: string | string[]; as?: string | string[] }> }) {
  const { next, as } = await searchParams
  return <AuthFlow mode="register" next={typeof next === 'string' ? next : undefined} accountType={as === 'tutor' ? 'tutor' : undefined} />
}
