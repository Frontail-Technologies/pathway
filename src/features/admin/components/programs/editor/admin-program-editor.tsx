'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Info } from 'lucide-react'
import type { AdminProgram } from '@/features/admin/types/programs'
import { AdminEditorSectionNav } from '@/features/admin/components/admin-editor-section-nav'
import { AdminEditorLayout } from '@/features/admin/components/shared/admin-editor-layout'
import { programEditorNavSections } from '@/features/admin/constants/programs'
import { useProgramEditor } from './use-program-editor'
import { ProgramEditorHeader } from './program-editor-header'
import { ProgramEditorMobileActions } from './program-editor-mobile-actions'
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

export function AdminProgramEditor({
  program,
  mode = 'create',
}: AdminProgramEditorProps) {
  const router = useRouter()
  const editor = useProgramEditor(program, mode)

  const backHref = editor.isEdit ? `/admin/programs/${program?.id}` : '/admin/programs'

  return (
    <div className="space-y-6 pb-20 sm:pb-8">
      <ProgramEditorHeader
        isEdit={editor.isEdit}
        programName={program?.name}
        backHref={backHref}
        onCancel={() => router.push(backHref)}
        onSave={editor.handleSubmit}
      />

      {editor.submitNotice && (
        <div className="p-4 rounded-xl bg-secondary text-secondary-foreground flex items-start gap-3 border border-primary/15 shadow-xs">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="text-xs font-medium leading-relaxed">
            {editor.submitNotice}
          </div>
        </div>
      )}

      <AdminEditorLayout
        navigation={
          <AdminEditorSectionNav
            sections={[...programEditorNavSections]}
            activeSectionId={editor.activeSection}
            onSectionChange={editor.scrollToSection}
            title="Program Form Sections"
          />
        }
        mobileActions={
          <ProgramEditorMobileActions
            onCancel={() => router.push(backHref)}
            onSave={editor.handleSubmit}
          />
        }
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

          <OverviewSection
            description={editor.description}
            onDescriptionChange={editor.setDescription}
          />

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
            onSubjectInputChange={(yearIdx, val) =>
              editor.setNewSubjectInputs((prev) => ({ ...prev, [yearIdx]: val }))
            }
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
