'use client'

import * as React from 'react'
import { type AdminScholarship } from '@/features/admin/data/admin-scholarships'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'
import { AdminEditorLayout } from '@/features/admin/components/shared/admin-editor-layout'
import { scholarshipEditorNavSections } from '../shared/scholarship-constants'
import { useScholarshipEditor } from './use-scholarship-editor'
import { ScholarshipEditorHeader } from './scholarship-editor-header'
import { ScholarshipEditorMobileActions } from './scholarship-editor-mobile-actions'
import { ScholarshipIdentitySection } from './sections/scholarship-identity-section'
import { ScholarshipEligibilitySection } from './sections/scholarship-eligibility-section'
import { ScholarshipBenefitsSection } from './sections/scholarship-benefits-section'
import { ScholarshipDatesSection } from './sections/scholarship-dates-section'
import { ScholarshipProcessSection } from './sections/scholarship-process-section'
import { ScholarshipDocsSection } from './sections/scholarship-docs-section'
import { ScholarshipSourceSection } from './sections/scholarship-source-section'
import { AlertCircle } from 'lucide-react'

export function AdminScholarshipEditor({
  scholarship,
  mode = 'create',
}: {
  scholarship?: AdminScholarship | null
  mode?: 'create' | 'edit'
}) {
  const form = useScholarshipEditor(scholarship, mode)

  const scrollToSection = (id: string) => {
    form.setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <form onSubmit={form.handleSubmit} className="space-y-6 pb-20 sm:pb-8">
      <ScholarshipEditorHeader
        isEdit={form.isEdit}
        scholarshipName={form.name}
        onSubmit={form.handleSubmit}
      />

      {form.submitNotice && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{form.submitNotice}</span>
        </div>
      )}

      <AdminEditorLayout
        navigation={
          <AdminEditorSectionNav
            sections={[...scholarshipEditorNavSections]}
            activeSectionId={form.activeSection}
            onSectionChange={scrollToSection}
            title="Scholarship Form Sections"
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

      <ScholarshipEditorMobileActions
        isEdit={form.isEdit}
        onSubmit={form.handleSubmit}
      />
    </form>
  )
}
