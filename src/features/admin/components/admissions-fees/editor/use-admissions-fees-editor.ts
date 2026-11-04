import * as React from 'react'
import { toast } from 'sonner'
import {
  type AdminProgramOffering,
  type FeeComponent,
  type ApplicationStep,
  type OfferingDocument,
  type OfferingDocumentType,
} from '@/features/admin/data/admin-admissions-fees'
import { admissionsFeesEditorNavSections } from '../shared/admissions-fees-constants'

export function useAdmissionsFeesEditor(
  offering?: AdminProgramOffering | null,
  mode: 'create' | 'edit' = 'create'
) {
  const isEdit = mode === 'edit' && !!offering

  const [institutionId, setInstitutionId] = React.useState(offering?.institutionId || 'c1')
  const [programId, setProgramId] = React.useState(offering?.programId || 'crs1')
  const [degree, setDegree] = React.useState(offering?.degree || 'B.Tech')
  const [level, setLevel] = React.useState(offering?.level || 'Undergraduate')
  const [stream, setStream] = React.useState(offering?.stream || 'Engineering')
  const [duration, setDuration] = React.useState(offering?.duration || '4 Years')
  const [studyMode, setStudyMode] = React.useState(offering?.studyMode || 'Full-time')

  const [admissionMode, setAdmissionMode] = React.useState(offering?.admissionMode || 'Entrance Exam')
  const [annualFee, setAnnualFee] = React.useState(offering?.annualFee || '')
  const [totalProgrammeFee, setTotalProgrammeFee] = React.useState(offering?.totalProgrammeFee || '')
  const [feePeriod, setFeePeriod] = React.useState(offering?.feePeriod || 'Per Annum')
  const [academicSession, setAcademicSession] = React.useState(offering?.academicSession || '2026-27')

  const [feeComponents, setFeeComponents] = React.useState<FeeComponent[]>(
    offering?.feeComponents || []
  )
  const [newCompLabel, setNewCompLabel] = React.useState('')
  const [newCompAmount, setNewCompAmount] = React.useState('')
  const [newCompPeriod, setNewCompPeriod] = React.useState('Per Semester')
  const [newCompType, setNewCompType] = React.useState<'tuition' | 'hostel' | 'examination' | 'admission' | 'other'>('tuition')

  const [eligibilitySummary, setEligibilitySummary] = React.useState(offering?.eligibilitySummary || '')
  const [academicQualification, setAcademicQualification] = React.useState(offering?.academicQualification || '')
  const [mandatorySubjects, setMandatorySubjects] = React.useState(offering?.mandatorySubjects || '')
  const [minimumMarks, setMinimumMarks] = React.useState(offering?.minimumMarks || '')

  const [importantRequirements, setImportantRequirements] = React.useState<string[]>(
    offering?.importantRequirements || []
  )
  const [newReqInput, setNewReqInput] = React.useState('')

  const [selectedExams, setSelectedExams] = React.useState<string[]>(
    offering?.entranceExams || []
  )
  const [examSelectValue, setExamSelectValue] = React.useState('')
  const [customExamInput, setCustomExamInput] = React.useState('')

  const [counsellingBody, setCounsellingBody] = React.useState(offering?.counsellingBody || '')
  const [selectionProcess, setSelectionProcess] = React.useState(offering?.selectionProcess || '')

  const [applicationSteps, setApplicationSteps] = React.useState<ApplicationStep[]>(
    offering?.applicationSteps || []
  )
  const [newStepTitle, setNewStepTitle] = React.useState('')
  const [newStepDesc, setNewStepDesc] = React.useState('')

  const [documents, setDocuments] = React.useState<OfferingDocument[]>(
    offering?.documents || []
  )
  const [newDocTitle, setNewDocTitle] = React.useState('')
  const [newDocType, setNewDocType] = React.useState<OfferingDocumentType>('fee_structure')
  const [newDocUrl, setNewDocUrl] = React.useState('')
  const [selectedFileMeta, setSelectedFileMeta] = React.useState<{ name: string; size: string } | null>(null)

  const [activeSection, setActiveSection] = React.useState<string>('identity')
  const [errors, setErrors] = React.useState<Record<string, string>>({})

  const snapshot = JSON.stringify({
    institutionId,
    programId,
    degree,
    level,
    stream,
    duration,
    studyMode,
    admissionMode,
    annualFee,
    totalProgrammeFee,
    feePeriod,
    academicSession,
    feeComponents,
    eligibilitySummary,
    academicQualification,
    mandatorySubjects,
    minimumMarks,
    importantRequirements,
    selectedExams,
    counsellingBody,
    selectionProcess,
    applicationSteps,
    documents,
  })
  const [savedSnapshot, setSavedSnapshot] = React.useState(snapshot)
  const isDirty = snapshot !== savedSnapshot

  React.useEffect(() => {
    let ticking = false

    const computeActive = () => {
      ticking = false
      if (typeof window === 'undefined') return

      const scrollBottom = window.innerHeight + window.scrollY
      const docHeight = document.documentElement.scrollHeight
      if (scrollBottom >= docHeight - 80) {
        setActiveSection(admissionsFeesEditorNavSections[admissionsFeesEditorNavSections.length - 1].id)
        return
      }

      const threshold = 160
      let current: string = admissionsFeesEditorNavSections[0].id
      for (const sec of admissionsFeesEditorNavSections) {
        const node = document.getElementById(sec.id)
        if (!node) continue
        const rect = node.getBoundingClientRect()
        if (rect.top <= threshold) {
          current = sec.id
        } else {
          break
        }
      }
      setActiveSection(current)
    }

    const onScrollOrResize = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(computeActive)
    }

    computeActive()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  function handleAddFeeComponent() {
    if (!newCompLabel.trim() || !newCompAmount.trim()) return
    const comp: FeeComponent = {
      id: `fc-${Date.now()}`,
      label: newCompLabel.trim(),
      amount: newCompAmount.trim(),
      period: newCompPeriod,
      type: newCompType,
    }
    setFeeComponents((prev) => [...prev, comp])
    setNewCompLabel('')
    setNewCompAmount('')
  }

  function handleRemoveFeeComponent(id: string) {
    setFeeComponents((prev) => prev.filter((c) => c.id !== id))
  }

  function handleAddRequirement() {
    const text = newReqInput.trim()
    if (!text || importantRequirements.includes(text)) return
    setImportantRequirements((prev) => [...prev, text])
    setNewReqInput('')
  }

  function handleRemoveRequirement(index: number) {
    setImportantRequirements((prev) => prev.filter((_, idx) => idx !== index))
  }

  function handleAddExam(name: string) {
    if (!name || selectedExams.includes(name)) return
    setSelectedExams((prev) => [...prev, name])
    setExamSelectValue('')
  }

  function handleAddCustomExam() {
    const text = customExamInput.trim()
    if (!text || selectedExams.includes(text)) return
    setSelectedExams((prev) => [...prev, text])
    setCustomExamInput('')
  }

  function handleRemoveExam(name: string) {
    setSelectedExams((prev) => prev.filter((e) => e !== name))
  }

  function handleAddStep() {
    if (!newStepTitle.trim()) return
    const newStep: ApplicationStep = {
      id: `st-${Date.now()}`,
      stepNumber: applicationSteps.length + 1,
      title: newStepTitle.trim(),
      description: newStepDesc.trim(),
    }
    setApplicationSteps((prev) => [...prev, newStep])
    setNewStepTitle('')
    setNewStepDesc('')
  }

  function handleRemoveStep(id: string) {
    setApplicationSteps((prev) => {
      const filtered = prev.filter((s) => s.id !== id)
      return filtered.map((s, idx) => ({ ...s, stepNumber: idx + 1 }))
    })
  }

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
    const newDoc: OfferingDocument = {
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

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!institutionId) newErrors.institutionId = 'Choose an institution'
    if (!programId) newErrors.programId = 'Choose a course'
    if (!annualFee.trim()) newErrors.annualFee = 'Enter the annual fee'
    if (!academicSession.trim()) newErrors.academicSession = 'Enter the session'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      const target = !institutionId || !programId || !academicSession.trim() ? 'identity' : 'fees'
      setActiveSection(target)
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      toast.error('Some required fields are missing.')
      return
    }
    setSavedSnapshot(snapshot)
    toast.success(isEdit ? 'Offering saved' : 'Offering created', {
      description: 'Demo only: changes are kept for this session and not stored yet.',
    })
  }

  return {
    isEdit,
    institutionId,
    setInstitutionId,
    programId,
    setProgramId,
    degree,
    setDegree,
    level,
    setLevel,
    stream,
    setStream,
    duration,
    setDuration,
    studyMode,
    setStudyMode,
    admissionMode,
    setAdmissionMode,
    annualFee,
    setAnnualFee,
    totalProgrammeFee,
    setTotalProgrammeFee,
    feePeriod,
    setFeePeriod,
    academicSession,
    setAcademicSession,
    feeComponents,
    newCompLabel,
    setNewCompLabel,
    newCompAmount,
    setNewCompAmount,
    newCompPeriod,
    setNewCompPeriod,
    newCompType,
    setNewCompType,
    handleAddFeeComponent,
    handleRemoveFeeComponent,
    eligibilitySummary,
    setEligibilitySummary,
    academicQualification,
    setAcademicQualification,
    mandatorySubjects,
    setMandatorySubjects,
    minimumMarks,
    setMinimumMarks,
    importantRequirements,
    newReqInput,
    setNewReqInput,
    handleAddRequirement,
    handleRemoveRequirement,
    selectedExams,
    examSelectValue,
    setExamSelectValue,
    customExamInput,
    setCustomExamInput,
    handleAddExam,
    handleAddCustomExam,
    handleRemoveExam,
    counsellingBody,
    setCounsellingBody,
    selectionProcess,
    setSelectionProcess,
    applicationSteps,
    newStepTitle,
    setNewStepTitle,
    newStepDesc,
    setNewStepDesc,
    handleAddStep,
    handleRemoveStep,
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
    activeSection,
    setActiveSection,
    errors,
    isDirty,
    handleSubmit,
  }
}
