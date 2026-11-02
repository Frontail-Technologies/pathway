'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { type AdminProgramOffering } from '@/features/admin/data/admin-admissions-fees'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'
import { AdminEditorLayout } from '@/features/admin/components/shared/admin-editor-layout'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { AdminPageHeader, StatusBadge } from '../../kit'
import { EditorActions, MobileEditorBar } from '../../programs/shared/section-kit'
import { admissionsFeesEditorNavSections } from '../shared/admissions-fees-constants'
import { useAdmissionsFeesEditor } from './use-admissions-fees-editor'
import { OfferingIdentitySection } from './sections/offering-identity-section'
import { FeesEditorSection } from './sections/fees-editor-section'
import { EligibilityEditorSection } from './sections/eligibility-editor-section'
import { ExamsEditorSection } from './sections/exams-editor-section'
import { ProcessEditorSection } from './sections/process-editor-section'
import { DocumentsEditorSection } from './sections/documents-editor-section'
import { SourceReviewSection } from './sections/source-review-section'

export function AdminAdmissionsFeesEditor({
  offering,
  mode = 'create',
}: {
  offering?: AdminProgramOffering | null
  mode?: 'create' | 'edit'
}) {
  const router = useRouter()
  const editor = useAdmissionsFeesEditor(offering, mode)

  const scrollToSection = (id: string) => {
    editor.setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useUnsavedChanges(editor.isDirty)

  const backHref = editor.isEdit ? `/admin/admissions-fees/${offering?.id}` : '/admin/admissions-fees'
  const back = editor.isEdit && offering ? { href: backHref, label: offering.programName } : { href: backHref, label: 'Admissions & fees' }
  const saveLabel = editor.isEdit ? 'Save changes' : 'Create offering'

  function handleCancel() {
    if (editor.isDirty && !window.confirm('Discard your unsaved changes?')) return
    router.push(backHref)
  }

  return (
    <div className="space-y-6 pb-20 sm:pb-8">
      <AdminPageHeader
        back={back}
        title={editor.isEdit ? 'Edit offering' : 'Add offering'}
        description={editor.isEdit && offering ? `${offering.programName} at ${offering.institutionName}` : 'Fees and admission rules for one course at one institution. Fields marked * are required.'}
        meta={editor.isDirty ? <StatusBadge tone="warning">Unsaved changes</StatusBadge> : undefined}
        actions={
          <div className="hidden items-center gap-2 sm:flex">
            <EditorActions onCancel={handleCancel} onSave={editor.handleSubmit} saveLabel={saveLabel} />
          </div>
        }
      />

      <AdminEditorLayout
        navigation={
          <AdminEditorSectionNav
            sections={[...admissionsFeesEditorNavSections]}
            activeSectionId={editor.activeSection}
            onSectionChange={scrollToSection}
            title="Sections"
          />
        }
        mobileActions={
          <MobileEditorBar onCancel={handleCancel} onSave={editor.handleSubmit} saveLabel={saveLabel} />
        }
      >
          <OfferingIdentitySection
            institutionId={editor.institutionId}
            onInstitutionIdChange={editor.setInstitutionId}
            programId={editor.programId}
            onProgramIdChange={editor.setProgramId}
            degree={editor.degree}
            onDegreeChange={editor.setDegree}
            level={editor.level}
            onLevelChange={editor.setLevel}
            stream={editor.stream}
            onStreamChange={editor.setStream}
            duration={editor.duration}
            onDurationChange={editor.setDuration}
            studyMode={editor.studyMode}
            onStudyModeChange={editor.setStudyMode}
            academicSession={editor.academicSession}
            onAcademicSessionChange={editor.setAcademicSession}
            admissionMode={editor.admissionMode}
            onAdmissionModeChange={editor.setAdmissionMode}
            isEdit={editor.isEdit}
            errors={editor.errors}
          />

          <FeesEditorSection
            annualFee={editor.annualFee}
            onAnnualFeeChange={editor.setAnnualFee}
            totalProgrammeFee={editor.totalProgrammeFee}
            onTotalProgrammeFeeChange={editor.setTotalProgrammeFee}
            feePeriod={editor.feePeriod}
            onFeePeriodChange={editor.setFeePeriod}
            feeComponents={editor.feeComponents}
            newCompLabel={editor.newCompLabel}
            onNewCompLabelChange={editor.setNewCompLabel}
            newCompAmount={editor.newCompAmount}
            onNewCompAmountChange={editor.setNewCompAmount}
            newCompPeriod={editor.newCompPeriod}
            onNewCompPeriodChange={editor.setNewCompPeriod}
            newCompType={editor.newCompType}
            onNewCompTypeChange={editor.setNewCompType}
            onAddFeeComponent={editor.handleAddFeeComponent}
            onRemoveFeeComponent={editor.handleRemoveFeeComponent}
            errors={editor.errors}
          />

          <EligibilityEditorSection
            eligibilitySummary={editor.eligibilitySummary}
            onEligibilitySummaryChange={editor.setEligibilitySummary}
            academicQualification={editor.academicQualification}
            onAcademicQualificationChange={editor.setAcademicQualification}
            mandatorySubjects={editor.mandatorySubjects}
            onMandatorySubjectsChange={editor.setMandatorySubjects}
            minimumMarks={editor.minimumMarks}
            onMinimumMarksChange={editor.setMinimumMarks}
            importantRequirements={editor.importantRequirements}
            newReqInput={editor.newReqInput}
            onNewReqInputChange={editor.setNewReqInput}
            onAddRequirement={editor.handleAddRequirement}
            onRemoveRequirement={editor.handleRemoveRequirement}
          />

          <ExamsEditorSection
            selectedExams={editor.selectedExams}
            examSelectValue={editor.examSelectValue}
            customExamInput={editor.customExamInput}
            onCustomExamInputChange={editor.setCustomExamInput}
            onAddExam={editor.handleAddExam}
            onAddCustomExam={editor.handleAddCustomExam}
            onRemoveExam={editor.handleRemoveExam}
            counsellingBody={editor.counsellingBody}
            onCounsellingBodyChange={editor.setCounsellingBody}
            selectionProcess={editor.selectionProcess}
            onSelectionProcessChange={editor.setSelectionProcess}
          />

          <ProcessEditorSection
            applicationSteps={editor.applicationSteps}
            newStepTitle={editor.newStepTitle}
            onNewStepTitleChange={editor.setNewStepTitle}
            newStepDesc={editor.newStepDesc}
            onNewStepDescChange={editor.setNewStepDesc}
            onAddStep={editor.handleAddStep}
            onRemoveStep={editor.handleRemoveStep}
          />

          <DocumentsEditorSection
            documents={editor.documents}
            newDocTitle={editor.newDocTitle}
            onNewDocTitleChange={editor.setNewDocTitle}
            newDocType={editor.newDocType}
            onNewDocTypeChange={editor.setNewDocType}
            newDocUrl={editor.newDocUrl}
            onNewDocUrlChange={editor.setNewDocUrl}
            selectedFileMeta={editor.selectedFileMeta}
            onFileChange={editor.handleFileChange}
            onAddDocument={editor.handleAddDocument}
            onRemoveDocument={editor.handleRemoveDocument}
          />

          <SourceReviewSection isEdit={editor.isEdit} />
      </AdminEditorLayout>
    </div>
  )
}
