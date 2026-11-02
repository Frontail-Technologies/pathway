'use client'

import { useRouter } from 'next/navigation'
import type { AdminInstitution } from '@/features/admin/types/institutions'
import { AdminPageHeader } from '../kit'
import { AdminInstitutionForm } from './admin-institution-form'

export function AdminInstitutionEditor({ institution, mode }: { institution?: AdminInstitution; mode: 'add' | 'edit' }) {
  const router = useRouter()
  const isEdit = mode === 'edit' && institution
  const destination = isEdit ? `/admin/institutions/${institution.id}` : '/admin/institutions'

  return (
    <div className="space-y-6">
      <AdminPageHeader
        back={isEdit ? { href: destination, label: institution.name } : { href: destination, label: 'Institutions' }}
        title={isEdit ? 'Edit institution' : 'Add institution'}
        description={isEdit ? undefined : 'Create a college or university listing. You can add courses, fees and admissions after saving.'}
      />
      <AdminInstitutionForm institution={institution} mode={mode} onCancel={() => router.push(destination)} />
    </div>
  )
}
