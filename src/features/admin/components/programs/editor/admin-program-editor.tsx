'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import type { AdminProgram } from '@/features/admin/types/programs'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'
import { AdminEditorLayout } from '@/features/admin/components/shared/admin-editor-layout'
import { programEditorNavSections } from '@/features/admin/constants/programs'
import { useUnsavedChanges } from '@/features/admin/hooks/use-unsaved-changes'
import { AdminPageHeader, StatusBadge } from '../../kit'
import { EditorActions, MobileEditorBar } from '../shared/section-kit'
import { useProgramEditor } from './use-program-editor'
import { AcademicIdentitySection } from './sections/academic-identity-section'
import { OverviewSection } from './sections/overview-section'
import { EligibilitySection } from './sections/eligibility-section'
import { CurriculumEditorSection } from './sections/curriculum-editor-section'
import { ExamsEditorSection } from './sections/exams-editor-section'
import { DocumentsEditorSection } from './sections/documents-editor-section'
import { InstitutionRelationshipsSection } from './sections/institution-relationships-section'
import { SourceReviewSection } from './sections/source-review-section'

export type AdminProgramEditorProps = {
  program?: AdminProgram | null
  mode?: 'create' | 'edit'
}

export function AdminProgramEditor({ program, mode = 'create' }: AdminProgramEditorProps) {
  const router = useRouter()
  const editor = useProgramEditor(program, mode)
  useUnsavedChanges(editor.isDirty)

  const backHref = editor.isEdit ? `/admin/programs/${program?.id}` : '/admin/programs'
  const back = editor.isEdit && program ? { href: backHref, label: program.name } : { href: backHref, label: 'Courses' }

  function handleCancel() {
    if (editor.isDirty && !window.confirm('Discard your unsaved changes?')) return
    router.push(backHref)
  }

  const saveLabel = editor.isEdit ? 'Save changes' : 'Create course'

  return (
    <div className="space-y-6 pb-20 sm:pb-8">
      <AdminPageHeader
        back={back}
        title={editor.isEdit ? 'Edit course' : 'Add course'}
        description={editor.isEdit ? program?.name : 'Fields marked * are required.'}
        meta={editor.isDirty ? <StatusBadge tone="warning">Unsaved changes</StatusBadge> : undefined}
      />

      <AdminEditorLayout
        navigation={<AdminEditorSectionNav sections={[...programEditorNavSections]} activeSectionId={editor.activeSection} onSectionChange={editor.scrollToSection} title="Sections" />}
        mobileActions={<MobileEditorBar onCancel={handleCancel} onSave={editor.handleSubmit} saveLabel={saveLabel} />}
      >
        <AcademicIdentitySection
          name={editor.name}
          onNameChange={editor.setName}
          degree={editor.degree}
          onDegreeChange={editor.setDegree}
          level={editor.level}
          onLevelChange={editor.setLevel}
          stream={editor.stream}
          onStreamChange={editor.setStream}
          specialization={editor.specialization}
          onSpecializationChange={editor.setSpecialization}
          duration={editor.duration}
          onDurationChange={editor.setDuration}
          studyMode={editor.studyMode}
          onStudyModeChange={editor.setStudyMode}
          errors={editor.errors}
        />

        <OverviewSection description={editor.description} onDescriptionChange={editor.setDescription} />

        <EligibilitySection
          eligibilitySummary={editor.eligibilitySummary}
          onEligibilitySummaryChange={editor.setEligibilitySummary}
          academicQualification={editor.academicQualification}
          onAcademicQualificationChange={editor.setAcademicQualification}
          mandatorySubjects={editor.mandatorySubjects}
          onMandatorySubjectsChange={editor.setMandatorySubjects}
          minimumMarks={editor.minimumMarks}
          onMinimumMarksChange={editor.setMinimumMarks}
        />

        <CurriculumEditorSection
          curriculum={editor.curriculum}
          newSubjectInputs={editor.newSubjectInputs}
          onSubjectInputChange={(yearIdx, val) => editor.setNewSubjectInputs((prev) => ({ ...prev, [yearIdx]: val }))}
          newYearName={editor.newYearName}
          onNewYearNameChange={editor.setNewYearName}
          onAddYear={editor.handleAddYear}
          onRemoveYear={editor.handleRemoveYear}
          onAddSubject={editor.handleAddSubject}
          onRemoveSubject={editor.handleRemoveSubject}
        />

        <ExamsEditorSection
          selectedExams={editor.selectedExams}
          examSelectValue={editor.examSelectValue}
          customExamInput={editor.customExamInput}
          onCustomExamInputChange={editor.setCustomExamInput}
          onAddExam={editor.handleAddExam}
          onAddCustomExam={editor.handleAddCustomExam}
          onRemoveExam={editor.handleRemoveExam}
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

        <InstitutionRelationshipsSection offerings={program?.offerings} />

        <SourceReviewSection isEdit={editor.isEdit} />
      </AdminEditorLayout>
    </div>
  )
}
