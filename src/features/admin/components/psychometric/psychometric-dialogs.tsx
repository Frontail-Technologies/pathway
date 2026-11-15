'use client'

import * as React from 'react'
import { Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { catalogGet } from '@/services/api/catalog'
import { createQuestion, updateDimension, updateQuestion, type AdminDimension, type AdminQuestion, type DimensionKey, type PsychometricArea, type QuestionKind } from '@/features/admin/data/admin-psychometric-api'
import { Field, FormSelect } from '../demo/demo-form'
import { usePsychometricRefresh } from './use-psychometric-refresh'

const messageOf = (error: unknown, fallback: string) => (error instanceof ApiRequestError ? error.message : fallback)
const NO_STREAM = '__none__'

export function QuestionDialog({ open, question, dimensions, onOpenChange }: { open: boolean; question: AdminQuestion | null; dimensions: AdminDimension[]; onOpenChange: (open: boolean) => void }) {
  const refresh = usePsychometricRefresh()
  const [kind, setKind] = React.useState<QuestionKind>('rating')
  const [text, setText] = React.useState('')
  const [dimension, setDimension] = React.useState<DimensionKey>('analytical')
  const [options, setOptions] = React.useState<{ label: string; dimension: DimensionKey }[]>([])
  const [error, setError] = React.useState<string>()
  const dimensionOptions = dimensions.map((item) => ({ value: item.key, label: item.label }))

  React.useEffect(() => {
    if (!open) return
    setKind(question?.kind ?? 'rating')
    setText(question?.text ?? '')
    setDimension(question?.dimension ?? 'analytical')
    setOptions(
      question?.options ?? [
        { label: '', dimension: 'analytical' },
        { label: '', dimension: 'social' },
      ],
    )
    setError(undefined)
  }, [open, question])

  const mutation = useMutation({
    mutationFn: () => {
      const shape = kind === 'rating' ? { dimension, options: null } : { dimension: null, options: options.map((option) => ({ ...option, label: option.label.trim() })) }
      return question ? updateQuestion(question.id, { text: text.trim(), ...shape }) : createQuestion({ kind, text: text.trim(), ...shape })
    },
    onSuccess: () => {
      refresh()
      toast.success(question ? 'Question updated' : 'Question added')
      onOpenChange(false)
    },
    onError: (err) => setError(messageOf(err, 'Could not save the question.')),
  })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!text.trim()) return setError('Enter the question.')
    if (kind === 'choice') {
      if (options.some((option) => !option.label.trim())) return setError('Enter both options.')
      if (options[0]!.dimension === options[1]!.dimension) return setError('The two options need different dimensions.')
    }
    setError(undefined)
    mutation.mutate()
  }

  const setOption = (index: number, patch: Partial<{ label: string; dimension: DimensionKey }>) => setOptions((current) => current.map((option, i) => (i === index ? { ...option, ...patch } : option)))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>{question ? 'Edit question' : 'Add question'}</DialogTitle>
          </DialogHeader>

          {!question ? (
            <Field id="psy-kind" label="Type">
              <FormSelect
                id="psy-kind"
                value={kind}
                onChange={setKind}
                options={[
                  { value: 'rating', label: 'Rating (strongly dislike → strongly like)' },
                  { value: 'choice', label: 'Choice between two statements' },
                ]}
              />
            </Field>
          ) : null}

          <Field id="psy-text" label={kind === 'rating' ? 'Activity' : 'Prompt'} required error={error}>
            <Input id="psy-text" autoFocus value={text} onChange={(event) => setText(event.target.value)} maxLength={300} placeholder={kind === 'rating' ? 'e.g. Solving logical puzzles' : 'e.g. In a group, I naturally…'} />
          </Field>

          {kind === 'rating' ? (
            <Field id="psy-dimension" label="Dimension">
              <FormSelect id="psy-dimension" value={dimension} onChange={setDimension} options={dimensionOptions} />
            </Field>
          ) : (
            options.map((option, index) => (
              <div key={index} className="grid gap-2 sm:grid-cols-[1fr_11rem]">
                <Field id={`psy-option-${index}`} label={`Option ${index + 1}`}>
                  <Input id={`psy-option-${index}`} value={option.label} onChange={(event) => setOption(index, { label: event.target.value })} maxLength={200} />
                </Field>
                <Field id={`psy-option-dimension-${index}`} label="Dimension">
                  <FormSelect id={`psy-option-dimension-${index}`} value={option.dimension} onChange={(value) => setOption(index, { dimension: value })} options={dimensionOptions} />
                </Field>
              </div>
            ))
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {question ? 'Save' : 'Add question'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

type StreamOption = { slug: string; name: string }

export function DimensionDialog({ dimension, onOpenChange }: { dimension: AdminDimension | null; onOpenChange: (open: boolean) => void }) {
  const refresh = usePsychometricRefresh()
  const [label, setLabel] = React.useState('')
  const [summary, setSummary] = React.useState('')
  const [environments, setEnvironments] = React.useState('')
  const [areas, setAreas] = React.useState<PsychometricArea[]>([])
  const [error, setError] = React.useState<string>()
  const streams = useQuery({ queryKey: ['streams', 'options'], queryFn: () => catalogGet<StreamOption[]>('/streams'), enabled: Boolean(dimension), staleTime: 10 * 60_000 })
  const streamOptions = [{ value: NO_STREAM, label: 'No stream link' }, ...(streams.data ?? []).map((stream) => ({ value: stream.slug, label: stream.name }))]

  React.useEffect(() => {
    if (!dimension) return
    setLabel(dimension.label)
    setSummary(dimension.summary)
    setEnvironments(dimension.environments)
    setAreas(dimension.areas)
    setError(undefined)
  }, [dimension])

  const mutation = useMutation({
    mutationFn: () => updateDimension(dimension!.key, { label: label.trim(), summary: summary.trim(), environments: environments.trim(), areas: areas.filter((area) => area.label.trim()).map((area) => ({ label: area.label.trim(), stream: area.stream })) }),
    onSuccess: () => {
      refresh()
      toast.success('Dimension updated')
      onOpenChange(false)
    },
    onError: (err) => setError(messageOf(err, 'Could not save the dimension.')),
  })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!label.trim() || !summary.trim() || !environments.trim()) return setError('Fill in the label, strength and environments.')
    setError(undefined)
    mutation.mutate()
  }

  const setArea = (index: number, patch: Partial<PsychometricArea>) => setAreas((current) => current.map((area, i) => (i === index ? { ...area, ...patch } : area)))

  return (
    <Dialog open={Boolean(dimension)} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>Edit {dimension?.label}</DialogTitle>
          </DialogHeader>
          <Field id="dim-label" label="Label" required error={error}>
            <Input id="dim-label" value={label} onChange={(event) => setLabel(event.target.value)} maxLength={60} />
          </Field>
          <Field id="dim-summary" label="Strength (completes “You enjoy…”)" required>
            <Textarea id="dim-summary" value={summary} onChange={(event) => setSummary(event.target.value)} maxLength={300} rows={2} />
          </Field>
          <Field id="dim-environments" label="Environments (completes “You may enjoy work…”)" required>
            <Textarea id="dim-environments" value={environments} onChange={(event) => setEnvironments(event.target.value)} maxLength={300} rows={2} />
          </Field>
          <div className="grid gap-2">
            <p className="text-sm font-medium text-foreground">Areas to explore</p>
            {areas.map((area, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input value={area.label} onChange={(event) => setArea(index, { label: event.target.value })} maxLength={80} aria-label={`Area ${index + 1}`} className="flex-1" />
                <FormSelect value={area.stream ?? NO_STREAM} onChange={(value) => setArea(index, { stream: value === NO_STREAM ? null : value })} options={streamOptions} className="w-40" />
                <Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove area ${index + 1}`} onClick={() => setAreas((current) => current.filter((_, i) => i !== index))}>
                  <X className="size-4" aria-hidden="true" />
                </Button>
              </div>
            ))}
            {areas.length < 8 ? (
              <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => setAreas((current) => [...current, { label: '', stream: null }])}>
                <Plus className="size-4" aria-hidden="true" />
                Add area
              </Button>
            ) : null}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
