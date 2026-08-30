'use client'

import { ErrorState } from '@/components/feedback'

export default function ErrorPage() { return <main className="container-shell flex min-h-screen items-center justify-center"><div className="w-full max-w-md"><ErrorState message="Something went wrong. Please refresh and try again." /></div></main> }
