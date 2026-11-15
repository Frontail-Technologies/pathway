'use client'

import * as React from 'react'
import { ArrowDown, ArrowUp, Pencil, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { useAdminSession } from '@/features/admin/auth/admin-session'
import { useUrlFilters } from '@/features/admin/hooks/use-url-filters'
import { getPsychometricTest, reorderQuestions, updateQuestion, type AdminDimension, type AdminQuestion, type DimensionKey, type QuestionKind } from '@/features/admin/data/admin-psychometric-api'
import { AdminPageHeader, Panel, Tag } from '../kit'
import { DimensionDialog, QuestionDialog } from './psychometric-dialogs'
import { usePsychometricRefresh } from './use-psychometric-refresh'

const messageOf = (error: unknown, fallback: string) => (error instanceof ApiRequestError ? error.message : fallback)

function QuestionList({ kind, questions, labels, canManage, onEdit }: { kind: QuestionKind; questions: AdminQuestion[]; labels: Record<DimensionKey, string>; canManage: boolean; onEdit: (question: AdminQuestion) => void }) {
  const refresh = usePsychometricRefresh()
  const toggle = useMutation({
    mutationFn: (question: AdminQuestion) => updateQuestion(question.id, { active: !question.active }),
    onSuccess: (question) => {
      refresh()
      toast.success(question.active ? 'Question switched on' : 'Question switched off')
    },
    onError: (error) => toast.error(messageOf(error, 'Could not update the question.')),
  })
  const move = useMutation({
    mutationFn: (ids: string[]) => reorderQuestions(kind, ids),
    onSuccess: refresh,
    onError: (error) => toast.error(messageOf(error, 'Could not reorder.')),
  })
  const shift = (index: number, by: number) => {
    const ids = questions.map((question) => question.id)
    const [item] = ids.splice(index, 1)
    ids.splice(index + by, 0, item!)
    move.mutate(ids)
  }

  if (!questions.length) return <p className="py-6 text-center text-sm text-muted-foreground">No questions yet.</p>

  return (
    <ol className="divide-y">
      {questions.map((question, index) => (
        <li key={question.id} className="flex items-start gap-3 py-3">
          <span className="mt-0.5 w-6 shrink-0 text-right text-sm text-muted-foreground tabular-nums">{index + 1}</span>
          <div className="min-w-0 flex-1">
            <p className={question.active ? 'text-sm font-medium text-foreground' : 'text-sm text-muted-foreground line-through'}>{question.text}</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {kind === 'rating' && question.dimension ? <Tag>{labels[question.dimension]}</Tag> : null}
              {kind === 'choice'
                ? question.options?.map((option) => (
                    <Tag key={option.label}>
                      {option.label} → {labels[option.dimension]}
                    </Tag>
                  ))
                : null}
            </div>
          </div>
          {canManage ? (
            <div className="flex shrink-0 items-center gap-1">
              <Button variant="ghost" size="icon-sm" aria-label="Move up" disabled={index === 0 || move.isPending} onClick={() => shift(index, -1)}>
                <ArrowUp className="size-4" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Move down" disabled={index === questions.length - 1 || move.isPending} onClick={() => shift(index, 1)}>
                <ArrowDown className="size-4" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon-sm" aria-label="Edit question" onClick={() => onEdit(question)}>
                <Pencil className="size-4" aria-hidden="true" />
              </Button>
              <Switch checked={question.active} disabled={toggle.isPending} onCheckedChange={() => toggle.mutate(question)} aria-label={question.active ? 'Switch question off' : 'Switch question on'} className="ml-1" />
            </div>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

function DimensionList({ dimensions, canManage, counts, onEdit }: { dimensions: AdminDimension[]; canManage: boolean; counts: Record<string, number>; onEdit: (dimension: AdminDimension) => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {dimensions.map((dimension) => (
        <Panel
          key={dimension.key}
          title={dimension.label}
          action={
            canManage ? (
              <Button variant="outline" size="sm" onClick={() => onEdit(dimension)}>
                <Pencil className="size-3.5" aria-hidden="true" />
                Edit
              </Button>
            ) : null
          }
        >
          <dl className="space-y-2.5 text-sm">
            <div>
              <dt className="text-muted-foreground">Strength</dt>
              <dd className="text-foreground">{dimension.summary}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Environments</dt>
              <dd className="text-foreground">{dimension.environments}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Areas to explore</dt>
              <dd className="mt-1 flex flex-wrap gap-1.5">
                {dimension.areas.map((area) => (
                  <Tag key={area.label}>{area.stream ? `${area.label} · ${area.stream}` : area.label}</Tag>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Active rating questions</dt>
              <dd className="text-foreground tabular-nums">{counts[dimension.key] ?? 0}</dd>
            </div>
          </dl>
        </Panel>
      ))}
    </div>
  )
}

export function AdminPsychometricView() {
  const { session } = useAdminSession()
  const canManage = session?.role === 'admin' || session?.role === 'staff'
  const { values: f, set } = useUrlFilters({ tab: 'questions' })
  const test = useQuery({ queryKey: queryKeys.adminPsychometric, queryFn: getPsychometricTest, enabled: Boolean(session) })
  const [editing, setEditing] = React.useState<AdminQuestion | null>(null)
  const [creating, setCreating] = React.useState(false)
  const [dimension, setDimension] = React.useState<AdminDimension | null>(null)

  const dimensions = test.data?.dimensions ?? []
  const questions = test.data?.questions ?? []
  const labels = Object.fromEntries(dimensions.map((item) => [item.key, item.label])) as Record<DimensionKey, string>
  const ratings = questions.filter((question) => question.kind === 'rating')
  const choices = questions.filter((question) => question.kind === 'choice')
  const active = questions.filter((question) => question.active).length
  const counts = ratings.filter((question) => question.active).reduce<Record<string, number>>((acc, question) => ({ ...acc, [question.dimension!]: (acc[question.dimension!] ?? 0) + 1 }), {})

  return (
    <div className="space-y-5">
      <AdminPageHeader
        eyebrow="Content"
        title="Psychometric test"
        count={test.data ? `${active} of ${questions.length} questions on` : undefined}
        actions={
          canManage && f.tab === 'questions' ? (
            <Button onClick={() => setCreating(true)}>
              <Plus className="size-4" aria-hidden="true" />
              Add question
            </Button>
          ) : null
        }
      />

      <Tabs value={f.tab} onValueChange={(value) => set({ tab: String(value) })}>
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
        </TabsList>
      </Tabs>

      {test.isError ? <p className="text-sm text-destructive">{messageOf(test.error, 'Could not load the test.')}</p> : null}

      {f.tab === 'dimensions' ? (
        <DimensionList dimensions={dimensions} canManage={canManage} counts={counts} onEdit={setDimension} />
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          <Panel title={`Rating questions · ${ratings.length}`}>
            <QuestionList kind="rating" questions={ratings} labels={labels} canManage={canManage} onEdit={setEditing} />
          </Panel>
          <Panel title={`Choice questions · ${choices.length}`}>
            <QuestionList kind="choice" questions={choices} labels={labels} canManage={canManage} onEdit={setEditing} />
          </Panel>
        </div>
      )}

      <QuestionDialog open={creating || Boolean(editing)} question={editing} dimensions={dimensions} onOpenChange={(open) => (open ? null : (setCreating(false), setEditing(null)))} />
      <DimensionDialog dimension={dimension} onOpenChange={(open) => (open ? null : setDimension(null))} />
    </div>
  )
}
