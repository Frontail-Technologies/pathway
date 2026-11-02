import * as React from 'react'
import {
  type AdminScholarship,
  type ScholarshipDocument,
  type ScholarshipDocumentType,
} from '@/features/admin/data/admin-scholarships'
import {
  type ProviderType,
  type ScholarshipType,
  type EducationLevel,
  type ApplicationStatus,
  type GenderEligibility,
  type IncomeLimitBucket,
} from '@/features/scholarships/data/scholarships'
import { scholarshipEditorNavSections } from '../shared/scholarship-constants'

export function useScholarshipEditor(
  scholarship?: AdminScholarship | null,
  mode: 'create' | 'edit' = 'create'
) {
  const isEdit = mode === 'edit' && !!scholarship

  const [name, setName] = React.useState(scholarship?.name || '')
  const [provider, setProvider] = React.useState(scholarship?.provider || '')
  const [providerType, setProviderType] = React.useState<ProviderType>(
    scholarship?.providerType || 'Government'
  )
  const [providerInitials, setProviderInitials] = React.useState(
    scholarship?.providerInitials || ''
  )
  const [scholarshipType, setScholarshipType] = React.useState<ScholarshipType>(
    scholarship?.scholarshipType || 'Merit Based'
  )
  const [educationLevels, setEducationLevels] = React.useState<EducationLevel[]>(
    scholarship?.educationLevels || ['Undergraduate']
  )
  const [streams, setStreams] = React.useState<string[]>(scholarship?.streams || [])
  const [newStreamInput, setNewStreamInput] = React.useState('')
  const [states, setStates] = React.useState<string[]>(scholarship?.states || [])
  const [newStateInput, setNewStateInput] = React.useState('')
  const [categories, setCategories] = React.useState<string[]>(scholarship?.categories || [])
  const [newCategoryInput, setNewCategoryInput] = React.useState('')
  const [genderEligibility, setGenderEligibility] = React.useState<GenderEligibility>(
    scholarship?.genderEligibility || 'All Genders'
  )
  const [incomeLimitBucket, setIncomeLimitBucket] = React.useState<IncomeLimitBucket | 'none'>(
    scholarship?.incomeLimitBucket || 'none'
  )
  const [overviewCopy, setOverviewCopy] = React.useState(scholarship?.overviewCopy || '')

  const [shortEligibility, setShortEligibility] = React.useState<string[]>(
    scholarship?.shortEligibility || []
  )
  const [newShortEligInput, setNewShortEligInput] = React.useState('')

  const [eligibilityRows, setEligibilityRows] = React.useState<{ label: string; value: string }[]>(
    scholarship?.eligibilityRows || []
  )
  const [newRowLabel, setNewRowLabel] = React.useState('')
  const [newRowValue, setNewRowValue] = React.useState('')

  const [benefitLabel, setBenefitLabel] = React.useState(scholarship?.benefitLabel || '')
  const [benefitValue, setBenefitValue] = React.useState(
    scholarship?.benefitValue ? String(scholarship.benefitValue) : ''
  )
  const [benefitType, setBenefitType] = React.useState<
    'Monetary' | 'Fee Waiver' | 'Stipend' | 'Fellowship' | 'Other'
  >(scholarship?.benefitType || 'Monetary')
  const [benefitCoverage, setBenefitCoverage] = React.useState(
    scholarship?.benefitCoverage || ''
  )
  const [benefitDuration, setBenefitDuration] = React.useState(
    scholarship?.benefitDuration || ''
  )
  const [benefitDisbursement, setBenefitDisbursement] = React.useState(
    scholarship?.benefitDisbursement || ''
  )

  const [deadline, setDeadline] = React.useState(scholarship?.deadline || '')
  const [deadlineDisplay, setDeadlineDisplay] = React.useState(
    scholarship?.deadlineDisplay || ''
  )
  const [applicationStatus, setApplicationStatus] = React.useState<
    ApplicationStatus | 'not-recorded'
  >(scholarship?.applicationStatus || 'open')
  const [importantDates, setImportantDates] = React.useState<{ label: string; value: string }[]>(
    scholarship?.importantDates || []
  )
  const [newDateLabel, setNewDateLabel] = React.useState('')
  const [newDateValue, setNewDateValue] = React.useState('')

  const [officialApplyUrl, setOfficialApplyUrl] = React.useState(
    scholarship?.officialApplyUrl || ''
  )
  const [applicationSteps, setApplicationSteps] = React.useState<string[]>(
    scholarship?.applicationSteps || []
  )
  const [newStepInput, setNewStepInput] = React.useState('')

  const [selectionProcess, setSelectionProcess] = React.useState<string[]>(
    scholarship?.selectionProcess || []
  )
  const [newSelectionInput, setNewSelectionInput] = React.useState('')

  const [requiredDocuments, setRequiredDocuments] = React.useState<string[]>(
    scholarship?.requiredDocuments || []
  )
  const [newReqDocInput, setNewReqDocInput] = React.useState('')

  const [documents, setDocuments] = React.useState<ScholarshipDocument[]>(
    scholarship?.documents || []
  )
  const [newDocTitle, setNewDocTitle] = React.useState('')
  const [newDocType, setNewDocType] = React.useState<ScholarshipDocumentType>('notification')
  const [newDocUrl, setNewDocUrl] = React.useState('')
  const [selectedFileMeta, setSelectedFileMeta] = React.useState<{ name: string; size: string } | null>(null)

  const [activeSection, setActiveSection] = React.useState<string>('identity')
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [submitNotice, setSubmitNotice] = React.useState<string | null>(null)

  const snapshot = JSON.stringify([
    name, provider, providerType, providerInitials, scholarshipType, educationLevels, streams, states, categories,
    genderEligibility, incomeLimitBucket, overviewCopy, shortEligibility, eligibilityRows, benefitLabel, benefitValue,
    benefitType, benefitCoverage, benefitDuration, benefitDisbursement, deadline, deadlineDisplay, applicationStatus,
    importantDates, officialApplyUrl, applicationSteps, selectionProcess, requiredDocuments, documents,
  ])
  const [initialSnapshot] = React.useState(snapshot)
  const dirty = snapshot !== initialSnapshot

  React.useEffect(() => {
    let ticking = false

    const computeActive = () => {
      ticking = false
      if (typeof window === 'undefined') return

      const scrollBottom = window.innerHeight + window.scrollY
      const docHeight = document.documentElement.scrollHeight
      if (scrollBottom >= docHeight - 80) {
        setActiveSection(scholarshipEditorNavSections[scholarshipEditorNavSections.length - 1].id)
        return
      }

      const threshold = 160
      let current: string = scholarshipEditorNavSections[0].id
      for (const sec of scholarshipEditorNavSections) {
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

  function handleToggleLevel(level: EducationLevel) {
    setEducationLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    )
  }

  function handleAddStream() {
    const text = newStreamInput.trim()
    if (!text || streams.includes(text)) return
    setStreams((prev) => [...prev, text])
    setNewStreamInput('')
  }

  function handleRemoveStream(item: string) {
    setStreams((prev) => prev.filter((s) => s !== item))
  }

  function handleAddState() {
    const text = newStateInput.trim()
    if (!text || states.includes(text)) return
    setStates((prev) => [...prev, text])
    setNewStateInput('')
  }

  function handleRemoveState(item: string) {
    setStates((prev) => prev.filter((s) => s !== item))
  }

  function handleAddCategory() {
    const text = newCategoryInput.trim()
    if (!text || categories.includes(text)) return
    setCategories((prev) => [...prev, text])
    setNewCategoryInput('')
  }

  function handleRemoveCategory(item: string) {
    setCategories((prev) => prev.filter((c) => c !== item))
  }

  function handleAddShortElig() {
    const text = newShortEligInput.trim()
    if (!text || shortEligibility.includes(text)) return
    setShortEligibility((prev) => [...prev, text])
    setNewShortEligInput('')
  }

  function handleRemoveShortElig(index: number) {
    setShortEligibility((prev) => prev.filter((_, idx) => idx !== index))
  }

  function handleAddEligRow() {
    if (!newRowLabel.trim() || !newRowValue.trim()) return
    setEligibilityRows((prev) => [
      ...prev,
      { label: newRowLabel.trim(), value: newRowValue.trim() },
    ])
    setNewRowLabel('')
    setNewRowValue('')
  }

  function handleRemoveEligRow(index: number) {
    setEligibilityRows((prev) => prev.filter((_, idx) => idx !== index))
  }

  function handleAddDateItem() {
    if (!newDateLabel.trim() || !newDateValue.trim()) return
    setImportantDates((prev) => [
      ...prev,
      { label: newDateLabel.trim(), value: newDateValue.trim() },
    ])
    setNewDateLabel('')
    setNewDateValue('')
  }

  function handleRemoveDateItem(index: number) {
    setImportantDates((prev) => prev.filter((_, idx) => idx !== index))
  }

  function handleAddStep() {
    const text = newStepInput.trim()
    if (!text) return
    setApplicationSteps((prev) => [...prev, text])
    setNewStepInput('')
  }

  function handleRemoveStep(index: number) {
    setApplicationSteps((prev) => prev.filter((_, idx) => idx !== index))
  }

  function handleAddSelectionStage() {
    const text = newSelectionInput.trim()
    if (!text || selectionProcess.includes(text)) return
    setSelectionProcess((prev) => [...prev, text])
    setNewSelectionInput('')
  }

  function handleRemoveSelectionStage(index: number) {
    setSelectionProcess((prev) => prev.filter((_, idx) => idx !== index))
  }

  function handleAddReqDoc() {
    const text = newReqDocInput.trim()
    if (!text || requiredDocuments.includes(text)) return
    setRequiredDocuments((prev) => [...prev, text])
    setNewReqDocInput('')
  }

  function handleRemoveReqDoc(index: number) {
    setRequiredDocuments((prev) => prev.filter((_, idx) => idx !== index))
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
    const newDoc: ScholarshipDocument = {
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
    if (!name.trim()) newErrors.name = 'Scholarship name is required'
    if (!provider.trim()) newErrors.provider = 'Provider name is required'
    if (!benefitLabel.trim()) newErrors.benefitLabel = 'Benefit amount is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      setActiveSection('identity')
      const firstError = document.getElementById('identity')
      firstError?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    setSubmitNotice('Saving isn’t connected yet, so changes in this editor are not stored.')
  }

  return {
    isEdit,
    dirty,
    name,
    setName,
    provider,
    setProvider,
    providerType,
    setProviderType,
    providerInitials,
    setProviderInitials,
    scholarshipType,
    setScholarshipType,
    educationLevels,
    handleToggleLevel,
    streams,
    newStreamInput,
    setNewStreamInput,
    handleAddStream,
    handleRemoveStream,
    states,
    newStateInput,
    setNewStateInput,
    handleAddState,
    handleRemoveState,
    categories,
    newCategoryInput,
    setNewCategoryInput,
    handleAddCategory,
    handleRemoveCategory,
    genderEligibility,
    setGenderEligibility,
    incomeLimitBucket,
    setIncomeLimitBucket,
    overviewCopy,
    setOverviewCopy,
    shortEligibility,
    newShortEligInput,
    setNewShortEligInput,
    handleAddShortElig,
    handleRemoveShortElig,
    eligibilityRows,
    newRowLabel,
    setNewRowLabel,
    newRowValue,
    setNewRowValue,
    handleAddEligRow,
    handleRemoveEligRow,
    benefitLabel,
    setBenefitLabel,
    benefitValue,
    setBenefitValue,
    benefitType,
    setBenefitType,
    benefitCoverage,
    setBenefitCoverage,
    benefitDuration,
    setBenefitDuration,
    benefitDisbursement,
    setBenefitDisbursement,
    deadline,
    setDeadline,
    deadlineDisplay,
    setDeadlineDisplay,
    applicationStatus,
    setApplicationStatus,
    importantDates,
    newDateLabel,
    setNewDateLabel,
    newDateValue,
    setNewDateValue,
    handleAddDateItem,
    handleRemoveDateItem,
    officialApplyUrl,
    setOfficialApplyUrl,
    applicationSteps,
    newStepInput,
    setNewStepInput,
    handleAddStep,
    handleRemoveStep,
    selectionProcess,
    newSelectionInput,
    setNewSelectionInput,
    handleAddSelectionStage,
    handleRemoveSelectionStage,
    requiredDocuments,
    newReqDocInput,
    setNewReqDocInput,
    handleAddReqDoc,
    handleRemoveReqDoc,
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
    submitNotice,
    handleSubmit,
  }
}
