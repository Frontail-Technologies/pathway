import * as React from 'react'
import type {
  AdminProgram,
  AdminProgramStudyLevel,
  AdminProgramDocumentType,
  AdminProgramDocument,
} from '@/features/admin/types/programs'
import { useAdminScrollSpy } from '@/features/admin/hooks/use-admin-scroll-spy'
import { programEditorNavSections } from '@/features/admin/constants/programs'

export type CurriculumYear = {
  year: string
  subjects: string[]
}

const defaultCurriculumSyllabus: CurriculumYear[] = [
  {
    year: 'Year 1 (Semesters 1 & 2)',
    subjects: [
      'Engineering Mathematics I & II',
      'Physics for Engineers',
      'Programming in C / Python',
      'Digital Logic Design',
      'Basic Electrical & Electronics',
    ],
  },
  {
    year: 'Year 2 (Semesters 3 & 4)',
    subjects: [
      'Data Structures & Algorithms',
      'Computer Organization & Architecture',
      'Object Oriented Programming (Java/C++)',
      'Discrete Mathematics',
      'Database Management Systems',
    ],
  },
  {
    year: 'Year 3 (Semesters 5 & 6)',
    subjects: [
      'Operating Systems',
      'Computer Networks',
      'Design & Analysis of Algorithms',
      'Theory of Computation',
      'Elective I: Artificial Intelligence',
    ],
  },
  {
    year: 'Year 4 (Semesters 7 & 8)',
    subjects: [
      'Compiler Design',
      'Cloud Computing & Distributed Systems',
      'Elective II: Machine Learning',
      'Capstone Project Phase I & II',
    ],
  },
]

const PROGRAM_SECTION_IDS = programEditorNavSections.map((section) => section.id)

export function useProgramEditor(program?: AdminProgram | null, mode: 'create' | 'edit' = 'create') {
  const isEdit = mode === 'edit' && !!program

  const [name, setName] = React.useState(program?.name || '')
  const [degree, setDegree] = React.useState(program?.degree || 'B.Tech')
  const [level, setLevel] = React.useState<AdminProgramStudyLevel>(program?.level || 'Undergraduate')
  const [stream, setStream] = React.useState(program?.stream || 'Engineering')
  const [specialization, setSpecialization] = React.useState(program?.specialization || '')
  const [duration, setDuration] = React.useState(program?.duration || '4 Years')
  const [studyMode, setStudyMode] = React.useState<'Full-time' | 'Part-time' | 'Online' | 'Distance'>(
    program?.studyMode || 'Full-time'
  )
  const [description, setDescription] = React.useState('')
  const [eligibilitySummary, setEligibilitySummary] = React.useState(program?.eligibility || '')
  const [academicQualification, setAcademicQualification] = React.useState(
    program?.eligibility?.includes('10+2') ? '10+2 or equivalent examination' : ''
  )
  const [mandatorySubjects, setMandatorySubjects] = React.useState(
    program?.stream === 'Engineering' ? 'Physics, Mathematics, and Chemistry/Technical Vocational' : ''
  )
  const [minimumMarks, setMinimumMarks] = React.useState(
    program?.stream === 'Engineering' ? '60% aggregate in qualifying examination' : ''
  )

  const [curriculum, setCurriculum] = React.useState<CurriculumYear[]>(() => {
    if (isEdit && program?.slug === 'btech-computer-science') {
      return defaultCurriculumSyllabus
    }
    return [
      {
        year: 'Year 1',
        subjects: ['Foundation Course I', 'Foundation Course II'],
      },
    ]
  })

  const [newSubjectInputs, setNewSubjectInputs] = React.useState<Record<number, string>>({})
  const [newYearName, setNewYearName] = React.useState('')

  const [selectedExams, setSelectedExams] = React.useState<string[]>(() => {
    if (program?.entranceExams && program.entranceExams.length > 0) {
      return program.entranceExams
    }
    return ['JEE Main', 'JEE Advanced']
  })
  const [examSelectValue, setExamSelectValue] = React.useState<string>('')
  const [customExamInput, setCustomExamInput] = React.useState('')

  const [documents, setDocuments] = React.useState<AdminProgramDocument[]>(() => program?.documents || [])
  const [newDocTitle, setNewDocTitle] = React.useState('')
  const [newDocType, setNewDocType] = React.useState<AdminProgramDocumentType>('syllabus')
  const [newDocUrl, setNewDocUrl] = React.useState('')
  const [selectedFileMeta, setSelectedFileMeta] = React.useState<{ name: string; size: string } | null>(null)

  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [submitNotice, setSubmitNotice] = React.useState<string | null>(null)
  const { activeSectionId, scrollToSection } = useAdminScrollSpy({
    sectionIds: PROGRAM_SECTION_IDS,
    offset: 120,
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2)
      setSelectedFileMeta({
        name: file.name,
        size: `${sizeMb} MB`,
      })
      if (!newDocTitle) {
        const baseName = file.name.replace(/\.[^/.]+$/, '')
        setNewDocTitle(baseName)
      }
    } else {
      setSelectedFileMeta(null)
    }
  }

  function handleAddDocument() {
    if (!newDocTitle.trim()) return
    const newDoc: AdminProgramDocument = {
      id: `doc-${Date.now()}`,
      title: newDocTitle.trim(),
      type: newDocType,
      fileFormat: selectedFileMeta ? 'PDF' : newDocUrl ? 'URL' : 'Document',
      fileSize: selectedFileMeta?.size || undefined,
      url: newDocUrl.trim() || undefined,
      provenance: {
        sourceType: 'manual',
        syncStatus: 'manual',
        sourceName: 'Admin Manual Entry',
      },
    }
    setDocuments((prev) => [...prev, newDoc])
    setNewDocTitle('')
    setNewDocUrl('')
    setSelectedFileMeta(null)
  }

  function handleRemoveDocument(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  function handleAddSubject(yearIndex: number) {
    const text = newSubjectInputs[yearIndex]?.trim()
    if (!text) return
    setCurriculum((prev) => {
      const copy = [...prev]
      copy[yearIndex] = {
        ...copy[yearIndex],
        subjects: [...copy[yearIndex].subjects, text],
      }
      return copy
    })
    setNewSubjectInputs((prev) => ({ ...prev, [yearIndex]: '' }))
  }

  function handleRemoveSubject(yearIndex: number, subjectIndex: number) {
    setCurriculum((prev) => {
      const copy = [...prev]
      const nextSubjects = [...copy[yearIndex].subjects]
      nextSubjects.splice(subjectIndex, 1)
      copy[yearIndex] = {
        ...copy[yearIndex],
        subjects: nextSubjects,
      }
      return copy
    })
  }

  function handleAddYear() {
    const yearTitle = newYearName.trim() || `Year ${curriculum.length + 1}`
    setCurriculum((prev) => [...prev, { year: yearTitle, subjects: [] }])
    setNewYearName('')
  }

  function handleRemoveYear(index: number) {
    setCurriculum((prev) => prev.filter((_, idx) => idx !== index))
  }

  function handleAddExam(examName: string) {
    if (!examName || selectedExams.includes(examName)) return
    setSelectedExams((prev) => [...prev, examName])
    setExamSelectValue('')
  }

  function handleAddCustomExam() {
    const nameTrimmed = customExamInput.trim()
    if (!nameTrimmed || selectedExams.includes(nameTrimmed)) return
    setSelectedExams((prev) => [...prev, nameTrimmed])
    setCustomExamInput('')
  }

  function handleRemoveExam(examName: string) {
    setSelectedExams((prev) => prev.filter((e) => e !== examName))
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'Program name is required'
    if (!degree.trim()) newErrors.degree = 'Degree designation is required'
    if (!level) newErrors.level = 'Study level is required'
    if (!stream) newErrors.stream = 'Academic stream is required'
    if (!duration.trim()) newErrors.duration = 'Duration is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      scrollToSection('identity')
      return
    }
    setSubmitNotice('Saving programs requires the Admin API. Demo editor — changes are not persisted.')
  }

  return {
    isEdit,
    name,
    setName,
    degree,
    setDegree,
    level,
    setLevel,
    stream,
    setStream,
    specialization,
    setSpecialization,
    duration,
    setDuration,
    studyMode,
    setStudyMode,
    description,
    setDescription,
    eligibilitySummary,
    setEligibilitySummary,
    academicQualification,
    setAcademicQualification,
    mandatorySubjects,
    setMandatorySubjects,
    minimumMarks,
    setMinimumMarks,
    curriculum,
    newSubjectInputs,
    setNewSubjectInputs,
    newYearName,
    setNewYearName,
    handleAddYear,
    handleRemoveYear,
    handleAddSubject,
    handleRemoveSubject,
    selectedExams,
    examSelectValue,
    setExamSelectValue,
    customExamInput,
    setCustomExamInput,
    handleAddExam,
    handleAddCustomExam,
    handleRemoveExam,
    documents,
    newDocTitle,
    setNewDocTitle,
    newDocType,
    setNewDocType,
    newDocUrl,
    setNewDocUrl,
    selectedFileMeta,
    handleFileChange,
    handleAddDocument,
    handleRemoveDocument,
    activeSection: activeSectionId,
    scrollToSection,
    errors,
    submitNotice,
    handleSubmit,
  }
}
