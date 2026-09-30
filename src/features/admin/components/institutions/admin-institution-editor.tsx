'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { AdminInstitutionForm } from './admin-institution-form'
import type { AdminInstitution } from '@/features/admin/types/institutions'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function AdminInstitutionEditor({
  institution,
  mode,
}: {
  institution?: AdminInstitution
  mode: 'add' | 'edit'
}) {
  const router = useRouter()
  const destination = institution ? `/admin/institutions/${institution.id}` : '/admin/institutions'

  return (
    <div className="mx-auto w-full max-w-4xl space-y-3">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => router.push(destination)}
              aria-label={mode === 'edit' ? 'Back to institution details' : 'Back to institutions'}
            />
          }
        >
          <ArrowLeft />
        </TooltipTrigger>
        <TooltipContent>
          {mode === 'edit' ? 'Back to institution details' : 'Back to institutions'}
        </TooltipContent>
      </Tooltip>
      <AdminInstitutionForm
        institution={institution}
        mode={mode}
        onCancel={() => router.push(destination)}
      />
    </div>
  )
}
