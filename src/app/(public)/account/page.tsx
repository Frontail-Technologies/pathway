import type { Metadata } from 'next'
import { AccountPage } from '@/features/account/components/account-page'

export const metadata: Metadata = { title: 'Account', robots: { index: false, follow: true } }

export default function AccountRoute() {
  return <AccountPage />
}
