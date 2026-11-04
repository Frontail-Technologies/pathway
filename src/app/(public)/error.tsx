'use client'

import { AlertCircle } from 'lucide-react'
import { Container } from '@/components/shared/container'
import { Button } from '@/components/ui/button'

export default function PublicError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Container className="px-4 py-16">
      <div role="alert" className="mx-auto flex max-w-lg flex-col items-center gap-3 rounded-[12px] border bg-card px-6 py-10 text-center">
        <AlertCircle className="size-7 text-destructive" aria-hidden="true" />
        <h1 className="font-heading text-xl font-bold text-foreground">This page couldn&apos;t be loaded</h1>
        <p className="text-sm text-muted-foreground">Pathway is having trouble loading this information right now. Please try again in a moment.</p>
        <Button variant="outline" onClick={reset}>
          Try again
        </Button>
      </div>
    </Container>
  )
}
