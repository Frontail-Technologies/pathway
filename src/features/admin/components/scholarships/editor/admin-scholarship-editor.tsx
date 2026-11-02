'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { AdminEditorSectionNav } from '../../admin-editor-section-nav'
import { AdminEditorLayout } from '../../shared/admin-editor-layout'
import { AdminPageHeader } from '../../kit'
import { scholarshipEditorNavSections } from '../shared/scholarship-constants'
import { useScholarshipEditor } from './use-scholarship-editor'
import { ScholarshipIdentitySection } from './sections/scholarship-identity-section'
import { ScholarshipEligibilitySection } from './sections/scholarship-eligibility-section'
import { ScholarshipBenefitsSection } from './sections/scholarship-benefits-section'
import { ScholarshipDatesSection } from './sections/scholarship-dates-section'
import { ScholarshipProcessSection } from './sections/scholarship-process-section'
import { ScholarshipDocsSection } from './sections/scholarship-docs-section'
import { ScholarshipSourceSection } from './sections/scholarship-source-section'

export function AdminScholarshipEditor({
  scholarship,
  mode = 'create',
}: {
  scholarship?: AdminScholarship | null
  mode?: 'create' | 'edit'
}) {
  const router = useRouter()
  const form = useScholarshipEditor(scholarship, mode)
  useUnsavedChanges(form.dirty)

  const backHref = form.isEdit && scholarship ? `/admin/scholarships/${scholarship.id}` : '/admin/scholarships'
  const handleCancel = () => {
    if (form.dirty && !window.confirm('Discard your unsaved changes?')) return
    router.push(backHref)
  }
  const onSubmit = (event: React.FormEvent) => {
    form.handleSubmit(event)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const saveLabel = form.isEdit ? 'Save changes' : 'Create scholarship'

  const scrollToSection = (id: string) => {
    form.setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 pb-20 sm:pb-8">
      <AdminPageHeader
        back={{ href: backHref, label: form.isEdit ? 'Scholarship' : 'Scholarships' }}
        title={form.isEdit ? `Edit ${scholarship?.name ?? 'scholarship'}` : 'New scholarship'}
        actions={
          <div className="hidden items-center gap-2 sm:flex">
            <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" size="sm">
              {saveLabel}
            </Button>
          </div>
        }
      />

      {form.submitNotice ? (
        <div role="status" className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground">
          <Info className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          {form.submitNotice}
        </div>
      ) : null}

      <AdminEditorLayout
        navigation={
          <AdminEditorSectionNav
            sections={[...scholarshipEditorNavSections]}
            activeSectionId={form.activeSection}
            onSectionChange={scrollToSection}
            title="Sections"
          />
        }
      >
          <ScholarshipIdentitySection
            name={form.name}
            setName={form.setName}
            provider={form.provider}
            setProvider={form.setProvider}
            providerType={form.providerType}
            setProviderType={form.setProviderType}
            providerInitials={form.providerInitials}
            setProviderInitials={form.setProviderInitials}
            scholarshipType={form.scholarshipType}
            setScholarshipType={form.setScholarshipType}
            selectedLevels={form.educationLevels}
            onToggleLevel={form.handleToggleLevel}
            streams={form.streams}
            newStreamInput={form.newStreamInput}
            setNewStreamInput={form.setNewStreamInput}
            onAddStream={form.handleAddStream}
            onRemoveStream={form.handleRemoveStream}
            states={form.states}
            newStateInput={form.newStateInput}
            setNewStateInput={form.setNewStateInput}
            onAddState={form.handleAddState}
            onRemoveState={form.handleRemoveState}
            categories={form.categories}
            newCategoryInput={form.newCategoryInput}
            setNewCategoryInput={form.setNewCategoryInput}
            onAddCategory={form.handleAddCategory}
            onRemoveCategory={form.handleRemoveCategory}
            genderEligibility={form.genderEligibility}
            setGenderEligibility={form.setGenderEligibility}
            incomeLimitBucket={form.incomeLimitBucket}
            setIncomeLimitBucket={form.setIncomeLimitBucket}
            overviewCopy={form.overviewCopy}
            setOverviewCopy={form.setOverviewCopy}
            errors={form.errors}
          />

          <ScholarshipEligibilitySection
            shortEligibility={form.shortEligibility}
            newShortEligInput={form.newShortEligInput}
            setNewShortEligInput={form.setNewShortEligInput}
            onAddShortElig={form.handleAddShortElig}
            onRemoveShortElig={form.handleRemoveShortElig}
            eligibilityRows={form.eligibilityRows}
            newRowLabel={form.newRowLabel}
            setNewRowLabel={form.setNewRowLabel}
            newRowValue={form.newRowValue}
            setNewRowValue={form.setNewRowValue}
            onAddEligRow={form.handleAddEligRow}
            onRemoveEligRow={form.handleRemoveEligRow}
          />

          <ScholarshipBenefitsSection
            benefitLabel={form.benefitLabel}
            setBenefitLabel={form.setBenefitLabel}
            benefitValue={form.benefitValue}
            setBenefitValue={form.setBenefitValue}
            benefitType={form.benefitType}
            setBenefitType={form.setBenefitType}
            benefitCoverage={form.benefitCoverage}
            setBenefitCoverage={form.setBenefitCoverage}
            benefitDuration={form.benefitDuration}
            setBenefitDuration={form.setBenefitDuration}
            benefitDisbursement={form.benefitDisbursement}
            setBenefitDisbursement={form.setBenefitDisbursement}
            errors={form.errors}
          />

          <ScholarshipDatesSection
            deadline={form.deadline}
            setDeadline={form.setDeadline}
            deadlineDisplay={form.deadlineDisplay}
            setDeadlineDisplay={form.setDeadlineDisplay}
            applicationStatus={form.applicationStatus}
            setApplicationStatus={form.setApplicationStatus}
            importantDates={form.importantDates}
            newDateLabel={form.newDateLabel}
            setNewDateLabel={form.setNewDateLabel}
            newDateValue={form.newDateValue}
            setNewDateValue={form.setNewDateValue}
            onAddDateItem={form.handleAddDateItem}
            onRemoveDateItem={form.handleRemoveDateItem}
          />

          <ScholarshipProcessSection
            officialApplyUrl={form.officialApplyUrl}
            setOfficialApplyUrl={form.setOfficialApplyUrl}
            applicationSteps={form.applicationSteps}
            newStepInput={form.newStepInput}
            setNewStepInput={form.setNewStepInput}
            onAddStep={form.handleAddStep}
            onRemoveStep={form.handleRemoveStep}
            selectionProcess={form.selectionProcess}
            newSelectionInput={form.newSelectionInput}
            setNewSelectionInput={form.setNewSelectionInput}
            onAddSelectionStage={form.handleAddSelectionStage}
            onRemoveSelectionStage={form.handleRemoveSelectionStage}
          />

          <ScholarshipDocsSection
            requiredDocuments={form.requiredDocuments}
            newReqDocInput={form.newReqDocInput}
            setNewReqDocInput={form.setNewReqDocInput}
            onAddReqDoc={form.handleAddReqDoc}
            onRemoveReqDoc={form.handleRemoveReqDoc}
            documents={form.documents}
            newDocTitle={form.newDocTitle}
            setNewDocTitle={form.setNewDocTitle}
            newDocType={form.newDocType}
            setNewDocType={form.setNewDocType}
            newDocUrl={form.newDocUrl}
            setNewDocUrl={form.setNewDocUrl}
            selectedFileMeta={form.selectedFileMeta}
            onFileChange={form.handleFileChange}
            onAddDocument={form.handleAddDocument}
            onRemoveDocument={form.handleRemoveDocument}
          />

          <ScholarshipSourceSection isEdit={form.isEdit} />
      </AdminEditorLayout>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-card p-3 sm:hidden">
        <Button type="button" variant="outline" size="sm" className="flex-1" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm" className="flex-1">
          {saveLabel}
        </Button>
      </div>
    </form>
  )
}
