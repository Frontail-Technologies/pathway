import { apiRequest } from '@/features/auth/lib/session-client'
import type { StatusTone } from '@/features/admin/components/kit'

export const SOURCE_KINDS = ['regulator', 'exam_body', 'counselling', 'scholarship_portal', 'institution_site', 'open_data', 'media_library', 'review_api', 'partner_import'] as const
export const FETCH_MODES = ['http', 'api', 'file', 'upload', 'browser'] as const
export const ENTITY_TYPES = ['institution', 'program', 'offering', 'exam', 'scholarship', 'coaching', 'tutor', 'state', 'city', 'ranking', 'cutoff', 'place_link'] as const
export const IMPORTABLE_TYPES = ['institution', 'program', 'exam', 'scholarship', 'coaching', 'tutor'] as const
export const STAGED_STATUSES = ['pending', 'invalid', 'approved', 'corrected', 'rejected', 'superseded'] as const
export const JOB_STATUSES = ['queued', 'running', 'succeeded', 'failed', 'cancelled'] as const

export type SourceKind = (typeof SOURCE_KINDS)[number]
export type FetchMode = (typeof FETCH_MODES)[number]
export type EntityType = (typeof ENTITY_TYPES)[number]
export type StagedStatus = (typeof STAGED_STATUSES)[number]
export type JobStatus = (typeof JOB_STATUSES)[number]
export type SourceStatus = 'active' | 'paused' | 'broken'
export type ConflictResolution = 'open' | 'kept_production' | 'took_staged'

export type SourceRef = { id: string; slug: string; name: string }

export type IngestionSource = {
  id: string
  slug: string
  name: string
  kind: SourceKind
  adapter: string
  baseUrl: string | null
  allowedPaths: string[]
  entityTypes: EntityType[]
  fetchMode: FetchMode
  schedule: string | null
  rateLimitPerMinute: number
  respectRobots: boolean
  termsUrl: string | null
  licenceNote: string | null
  config: Record<string, unknown>
  status: SourceStatus
  health: {
    lastRunAt: string | null
    lastSuccessAt: string | null
    lastFailureAt: string | null
    lastError: string | null
    consecutiveFailures: number
    changedLastRun: number | null
  }
  pendingReview: number
  createdAt: string
  updatedAt: string
}

export type SourceInput = {
  slug?: string
  name: string
  kind: SourceKind
  adapter: string
  baseUrl: string | null
  allowedPaths: string[]
  entityTypes: EntityType[]
  fetchMode: FetchMode
  schedule: string | null
  rateLimitPerMinute: number
  respectRobots: boolean
  termsUrl: string | null
  licenceNote: string | null
  config: Record<string, unknown>
}

export type CrawlJob = {
  id: string
  source: SourceRef
  trigger: 'manual' | 'schedule' | 'import'
  status: JobStatus
  queueJobId: string | null
  startedAt: string | null
  finishedAt: string | null
  stats: Record<string, number>
  error: string | null
  logLines: string[]
  createdAt: string
}

export type ImportBatch = {
  id: string
  source: SourceRef
  jobId: string | null
  entityType: string
  label: string
  counts: Record<StagedStatus, number>
  toCreate: number
  toUpdate: number
  createdAt: string
}

export type MatchMethod = 'none' | 'slug' | 'external_key' | 'name_location'

export type StagedSummary = {
  id: string
  batchId: string
  source: SourceRef
  entityType: string
  externalKey: string
  title: string
  status: StagedStatus
  action: 'create' | 'update'
  matchedEntityId: string | null
  matchMethod: MatchMethod
  matchConfidence: number | null
  errorCount: number
  createdAt: string
  reviewedAt: string | null
}

export type FieldDiff = { field: string; staged: unknown; production: unknown; changed: boolean; ingestible: boolean; overridden: boolean; willApply: boolean }

export type StagedIssue = { path: string; message: string; code: string }

export type StagedRecord = StagedSummary & {
  payload: Record<string, unknown>
  errors: StagedIssue[]
  reviewNote: string | null
  appliedEntityId: string | null
  appliedFields: string[]
  raw: { id: string; url: string | null; contentHash: string; fetchedAt: string; data: Record<string, unknown> | null } | null
  diff: { action: 'create' | 'update'; fields: FieldDiff[] } | null
  conflicts: { id: string; field: string; reason: 'manual_override' | 'source_disagreement'; resolution: ConflictResolution; stagedValue: unknown; productionValue: unknown }[]
}

export type ApprovalResult = { entityId: string; action: 'create' | 'update'; appliedFields: string[]; conflicts: string[] }
export type BulkApprovalResult = { id: string; ok: boolean; entityId?: string; error?: string }[]

export type IngestionConflict = {
  id: string
  stagedRecordId: string
  entityType: string
  entityId: string
  field: string
  productionValue: unknown
  stagedValue: unknown
  reason: 'manual_override' | 'source_disagreement'
  resolution: ConflictResolution
  source: { slug: string; name: string }
  createdAt: string
  resolvedAt: string | null
}

export type ImportResult = { batch: ImportBatch; jobId: string; staged: number; invalid: number; toCreate: number; toUpdate: number; unknownColumns: string[] }

export type StagedFilter = { batchId?: string; sourceId?: string; status?: StagedStatus; entityType?: string; q?: string; limit?: number; offset?: number }

export const kindLabels: Record<SourceKind, string> = {
  regulator: 'Regulator',
  exam_body: 'Exam body',
  counselling: 'Counselling',
  scholarship_portal: 'Scholarship portal',
  institution_site: 'Institution site',
  open_data: 'Open data',
  media_library: 'Media library',
  review_api: 'Review API',
  partner_import: 'Partner import',
}

export const fetchModeLabels: Record<FetchMode, string> = { http: 'Web pages', api: 'API', file: 'Official file', upload: 'Staff upload', browser: 'Browser' }

export const entityLabels: Record<string, string> = {
  institution: 'Institutions',
  program: 'Courses',
  offering: 'Offerings',
  exam: 'Exams',
  scholarship: 'Scholarships',
  coaching: 'Coaching',
  tutor: 'Tutors',
  state: 'States',
  city: 'Cities',
  ranking: 'Rankings',
  cutoff: 'Cutoffs',
  place_link: 'Place links',
}

export const entityLabel = (type: string) => entityLabels[type] ?? type

export const sourceStatusLabels: Record<SourceStatus, string> = { active: 'Active', paused: 'Paused', broken: 'Failing' }
export const sourceStatusTone: Record<SourceStatus, StatusTone> = { active: 'success', paused: 'neutral', broken: 'danger' }

export const jobStatusLabels: Record<JobStatus, string> = { queued: 'Queued', running: 'Running', succeeded: 'Succeeded', failed: 'Failed', cancelled: 'Cancelled' }
export const jobStatusTone: Record<JobStatus, StatusTone> = { queued: 'info', running: 'info', succeeded: 'success', failed: 'danger', cancelled: 'neutral' }
export const triggerLabels: Record<CrawlJob['trigger'], string> = { manual: 'Run now', schedule: 'Schedule', import: 'Upload' }

export const stagedStatusLabels: Record<StagedStatus, string> = {
  pending: 'Pending',
  invalid: 'Needs fixing',
  approved: 'Approved',
  corrected: 'Corrected',
  rejected: 'Rejected',
  superseded: 'Superseded',
}
export const stagedStatusTone: Record<StagedStatus, StatusTone> = { pending: 'warning', invalid: 'danger', approved: 'success', corrected: 'success', rejected: 'neutral', superseded: 'neutral' }

export const matchLabels: Record<MatchMethod, string> = { none: 'New record', slug: 'Matched by slug', external_key: 'Matched by earlier import', name_location: 'Matched by name and place' }

export const resolutionLabels: Record<ConflictResolution, string> = { open: 'Open', kept_production: 'Kept our value', took_staged: 'Took source value' }

export const statLabels: Record<string, string> = {
  fetched: 'Fetched',
  staged: 'Staged',
  invalid: 'Need fixing',
  unchanged: 'Unchanged',
  nothing_new: 'Nothing new',
  not_listed: 'Not listed',
}

export const isOpenJob = (job: Pick<CrawlJob, 'status'>) => job.status === 'queued' || job.status === 'running'

export function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—'
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return JSON.stringify(value, null, 2)
}

export function isComplexValue(value: unknown) {
  return value !== null && typeof value === 'object'
}

export function fieldLabel(field: string) {
  const spaced = field.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[._]/g, ' ')
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase()
}

export function duration(job: Pick<CrawlJob, 'startedAt' | 'finishedAt'>) {
  if (!job.startedAt) return null
  const end = job.finishedAt ? new Date(job.finishedAt).getTime() : Date.now()
  const seconds = Math.max(0, Math.round((end - new Date(job.startedAt).getTime()) / 1000))
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  return minutes < 60 ? `${minutes}m ${seconds % 60}s` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

const enc = encodeURIComponent
const base = '/admin/ingestion'

function search(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) if (value !== undefined && value !== '') query.set(key, String(value))
  const text = query.toString()
  return text ? `?${text}` : ''
}

export const listSources = () => apiRequest<IngestionSource[]>('GET', `${base}/sources`)
export const getSource = (id: string) => apiRequest<IngestionSource>('GET', `${base}/sources/${enc(id)}`)
export const createSource = (input: SourceInput & { slug: string }) => apiRequest<IngestionSource>('POST', `${base}/sources`, input)
export const updateSource = (id: string, input: Partial<SourceInput>) => apiRequest<IngestionSource>('PATCH', `${base}/sources/${enc(id)}`, input)
export const pauseSource = (id: string) => apiRequest<IngestionSource>('POST', `${base}/sources/${enc(id)}/pause`)
export const resumeSource = (id: string) => apiRequest<IngestionSource>('POST', `${base}/sources/${enc(id)}/resume`)
export const runSource = (id: string) => apiRequest<CrawlJob>('POST', `${base}/sources/${enc(id)}/run`)
export const parseSourceFile = (id: string, assetId: string) => apiRequest<CrawlJob>('POST', `${base}/sources/${enc(id)}/parse`, { assetId })

export const listJobs = (filter: { sourceId?: string; status?: JobStatus; limit?: number } = {}) => apiRequest<CrawlJob[]>('GET', `${base}/jobs${search(filter)}`)
export const getJob = (id: string) => apiRequest<CrawlJob>('GET', `${base}/jobs/${enc(id)}`)

export const listBatches = (filter: { sourceId?: string; limit?: number } = {}) => apiRequest<ImportBatch[]>('GET', `${base}/batches${search(filter)}`)
export const getBatch = (id: string) => apiRequest<ImportBatch>('GET', `${base}/batches/${enc(id)}`)

export const listStaged = (filter: StagedFilter = {}) => apiRequest<StagedSummary[]>('GET', `${base}/staged${search(filter)}`)
export const getStaged = (id: string) => apiRequest<StagedRecord>('GET', `${base}/staged/${enc(id)}`)
export const approveStaged = (id: string, body: { fields?: string[]; correction?: Record<string, unknown>; note?: string } = {}) =>
  apiRequest<ApprovalResult>('POST', `${base}/staged/${enc(id)}/approve`, body)
export const rejectStaged = (id: string, note: string) => apiRequest<StagedRecord>('POST', `${base}/staged/${enc(id)}/reject`, { note })
export const approveStagedMany = (ids: string[]) => apiRequest<BulkApprovalResult>('POST', `${base}/staged/approve`, { ids })

export const importCsv = (input: { source: string; entityType: string; fileName: string; csv: string }) => apiRequest<ImportResult>('POST', `${base}/imports`, input)

export const listConflicts = (resolution: ConflictResolution = 'open') => apiRequest<IngestionConflict[]>('GET', `${base}/conflicts${search({ resolution })}`)
export const resolveConflict = (id: string, resolution: Exclude<ConflictResolution, 'open'>) => apiRequest<IngestionConflict>('POST', `${base}/conflicts/${enc(id)}/resolve`, { resolution })

type UploadTicket = { asset: { id: string }; upload: { method: 'PUT'; url: string; headers: Record<string, string> } }

const RAW_MIMES: Record<string, string> = {
  csv: 'text/csv',
  html: 'text/html',
  htm: 'text/html',
  pdf: 'application/pdf',
  json: 'application/json',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xls: 'application/vnd.ms-excel',
}

export const RAW_FILE_ACCEPT = Object.keys(RAW_MIMES)
  .map((ext) => `.${ext}`)
  .join(',')

export function rawMimeOf(file: File) {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  return RAW_MIMES[ext] ?? null
}

export async function uploadRawFile(file: File) {
  const mime = rawMimeOf(file)
  if (!mime) throw new Error('Upload a CSV, Excel, HTML, PDF or JSON file.')
  const ticket = await apiRequest<UploadTicket>('POST', '/admin/assets/uploads', { kind: 'ingestion.raw', fileName: file.name, mime, sizeBytes: file.size })
  const put = await fetch(ticket.upload.url, { method: 'PUT', body: file, headers: ticket.upload.headers })
  if (!put.ok) throw new Error('The file could not be uploaded. Please try again.')
  await apiRequest('POST', `/admin/assets/${enc(ticket.asset.id)}/complete`)
  return ticket.asset.id
}
