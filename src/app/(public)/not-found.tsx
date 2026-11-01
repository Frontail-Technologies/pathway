import type { Metadata } from 'next'
import { NotFoundContent } from '@/components/shared/not-found-content'

export const metadata: Metadata = { title: 'Page Not Found' }










export default function PublicNotFound() {
  return (
    <>
      <NotFoundContent />
    </>
  )
}
