'use client'

import * as React from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/lib/query-client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { ApiRequestError } from '@/features/auth/lib/session-client'
import { addAlias, aliasContextHelp, createTerm, mergeTerm, removeAlias, tableLabel, updateTerm, type AdminTerm, type AdminTermDetail, type TaxonomyKind } from '@/features/admin/data/admin-master-data-api'
import { Field, FormSelect } from '../demo/demo-form'
import { StatusBadge, Tag, UrlPreview } from '../kit'
import { slugify } from '@/features/admin/utils/slug'

const messageOf = (error: unknown, fallback: string) => (error instanceof ApiRequestError ? error.message : fallback)
const NONE = '__none__'
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function useInvalidateTaxonomy(kind: TaxonomyKind) {
  const queryClient = useQueryClient()
  return React.useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.adminTaxonomyTerms(kind) })
    void queryClient.invalidateQueries({ queryKey: queryKeys.adminTaxonomyKinds })
  }, [queryClient, kind])
}

export function TermDialog({ kind, terms, term, open, onOpenChange }: { kind: TaxonomyKind; terms: AdminTerm[]; term: AdminTerm | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const refresh = useInvalidateTaxonomy(kind)
  const [label, setLabel] = React.useState('')
  const [slug, setSlug] = React.useState('')
  const [parent, setParent] = React.useState(NONE)
  const [error, setError] = React.useState<string>()

  React.useEffect(() => {
    if (open) {
      setLabel(term?.label ?? '')
      setSlug(term?.slug ?? '')
      setParent(term?.parent?.slug ?? NONE)
      setError(undefined)
    }
  }, [open, term])

  const mutation = useMutation({
    mutationFn: () => {
      const parentSlug = parent === NONE ? null : parent
      return term ? updateTerm(kind, term.id, { label: label.trim(), parent: parentSlug }) : createTerm(kind, { slug, label: label.trim(), parent: parentSlug })
    },
    onSuccess: () => {
      refresh()
      toast.success(term ? 'Term updated' : 'Term added')
      onOpenChange(false)
    },
    onError: (err) => setError(messageOf(err, 'Could not save the term.')),
  })

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!label.trim()) return setError('Enter a label.')
    if (!term && !SLUG.test(slug)) return setError('Use a label with at least one letter or digit.')
    setError(undefined)
    mutation.mutate()
  }

  const parentOptions = [{ value: NONE, label: 'No parent' }, ...terms.filter((t) => t.isActive && t.id !== term?.id && t.parent?.id !== term?.id).map((t) => ({ value: t.slug, label: t.label }))]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={submit} className="grid gap-4" noValidate>
          <DialogHeader>
            <DialogTitle>{term ? 'Edit term' : 'Add term'}</DialogTitle>
            <DialogDescription>{term ? 'Change the label shown to people. The slug stays the same so saved links and data keep working.' : 'Give the term a label; its slug is created from it.'}</DialogDescription>
          </DialogHeader>
          <Field id="term-label" label="Label" required error={error}>
            <Input
              id="term-label"
              autoFocus
              value={label}
              onChange={(event) => {
                setLabel(event.target.value)
                if (!term) setSlug(slugify(event.target.value))
                setError(undefined)
              }}
              className="h-9"
            />
          </Field>
          <UrlPreview label="Slug" prefix="" slug={slug} locked={Boolean(term)} source="label" />
          <Field id="term-parent" label="Parent term" hint="Optional. Children sit under their parent where filters group terms.">
            <FormSelect id="term-parent" value={parent} onChange={setParent} options={parentOptions} />
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving…' : term ? 'Save changes' : 'Add term'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function MergeDialog({ kind, terms, term, open, onOpenChange }: { kind: TaxonomyKind; terms: AdminTerm[]; term: AdminTerm | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const refresh = useInvalidateTaxonomy(kind)
  const [into, setInto] = React.useState('')
  const [error, setError] = React.useState<string>()
  React.useEffect(() => {
    if (open) {
      setInto('')
      setError(undefined)
    }
  }, [open])
  const targets = terms.filter((t) => t.isActive && t.id !== term?.id).map((t) => ({ value: t.id, label: `${t.label} (${t.slug})` }))
  const mutation = useMutation({
    mutationFn: () => mergeTerm(kind, term!.id, into),
    onSuccess: (result) => {
      refresh()
      toast.success(`Merged into ${result.target.label}`, { description: `${result.moved} reference${result.moved === 1 ? '' : 's'} moved. “${result.source.label}” is now retired.` })
      onOpenChange(false)
    },
    onError: (err) => setError(messageOf(err, 'Could not merge the terms.')),
  })
  if (!term) return null
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Merge “{term.label}”</DialogTitle>
          <DialogDescription>
            Every record, alias and child that points to this term moves to the target. This term is then retired and kept for history. Used by {term.usage} record{term.usage === 1 ? '' : 's'}.
          </DialogDescription>
        </DialogHeader>
        <Field id="merge-into" label="Merge into" required error={error}>
          <FormSelect id="merge-into" value={into} onChange={setInto} options={targets} placeholder="Choose a term" />
        </Field>
        <DialogFooter>
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
            Cancel
          </Button>
          <Button type="button" variant="destructive" size="sm" disabled={!into || mutation.isPending} onClick={() => mutation.mutate()}>
            {mutation.isPending ? 'Merging…' : 'Merge and retire'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function TermSheet({ kind, term, open, onOpenChange }: { kind: TaxonomyKind; term: AdminTermDetail | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const refresh = useInvalidateTaxonomy(kind)
  const [context, setContext] = React.useState('fe.courses')
  const [alias, setAlias] = React.useState('')
  const [error, setError] = React.useState<string>()
  React.useEffect(() => {
    if (open) {
      setAlias('')
      setError(undefined)
    }
  }, [open])

  const add = useMutation({
    mutationFn: () => addAlias(kind, term!.id, { context, alias: alias.trim() }),
    onSuccess: () => {
      refresh()
      setAlias('')
      toast.success('Alias added')
    },
    onError: (err) => setError(messageOf(err, 'Could not add the alias.')),
  })
  const remove = useMutation({
    mutationFn: (aliasId: string) => removeAlias(aliasId),
    onSuccess: () => {
      refresh()
      toast.success('Alias removed')
    },
    onError: (err) => toast.error(messageOf(err, 'Could not remove the alias.')),
  })

  if (!term) return null
  const contexts = Object.keys(aliasContextHelp).map((value) => ({ value, label: `${aliasContextHelp[value]} · ${value}` }))
  const grouped = new Map<string, AdminTerm['aliases']>()
  for (const item of term.aliases) grouped.set(item.context, [...(grouped.get(item.context) ?? []), item])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {term.label}
            <StatusBadge tone={term.isActive ? 'success' : 'neutral'}>{term.isActive ? 'Active' : 'Retired'}</StatusBadge>
          </SheetTitle>
          <SheetDescription>
            <span className="font-mono text-[12px]">{term.slug}</span>
            {term.parent ? ` · under ${term.parent.label}` : ''}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-4 pb-6">
          <section>
            <h3 className="text-sm font-semibold text-foreground">Where it is used</h3>
            {term.usage === 0 ? (
              <p className="mt-1 text-[13px] text-muted-foreground">No records reference this term yet.</p>
            ) : (
              <ul className="mt-2 divide-y divide-border rounded-lg border border-border text-[13px]">
                {term.usageByTable.map((row) => (
                  <li key={row.table} className="flex items-center justify-between px-3 py-2">
                    <span className="text-foreground">{tableLabel(row.table)}</span>
                    <span className="tabular-nums text-muted-foreground">{row.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <h3 className="text-sm font-semibold text-foreground">Aliases</h3>
            <p className="mt-1 text-[13px] text-muted-foreground">Labels and URL values from the website and app that resolve to this term. Add one when a client still sends an older spelling.</p>
            {grouped.size === 0 ? (
              <p className="mt-3 text-[13px] text-muted-foreground">No aliases.</p>
            ) : (
              <div className="mt-3 space-y-3">
                {[...grouped.entries()].map(([ctx, items]) => (
                  <div key={ctx}>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{aliasContextHelp[ctx] ?? ctx}</p>
                    <ul className="mt-1.5 flex flex-wrap gap-1.5">
                      {items.map((item) => (
                        <li key={item.id} className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 py-0.5 pr-0.5 pl-2 text-[13px]">
                          {item.alias}
                          <button type="button" onClick={() => remove.mutate(item.id)} disabled={remove.isPending} aria-label={`Remove alias ${item.alias}`} className="rounded p-0.5 text-muted-foreground hover:text-destructive">
                            <Trash2 className="size-3.5" aria-hidden="true" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <form
              className="mt-4 grid gap-3 rounded-lg border border-border p-3"
              onSubmit={(event) => {
                event.preventDefault()
                if (!alias.trim()) return setError('Enter the alias text.')
                setError(undefined)
                add.mutate()
              }}
            >
              <Field id="alias-context" label="Context">
                <FormSelect id="alias-context" value={context} onChange={setContext} options={contexts} />
              </Field>
              <Field id="alias-text" label="Alias" error={error}>
                <Input id="alias-text" value={alias} onChange={(event) => setAlias(event.target.value)} placeholder="Text the client sends" className="h-9" />
              </Field>
              <div className="flex justify-end">
                <Button type="submit" size="sm" disabled={add.isPending}>
                  {add.isPending ? 'Adding…' : 'Add alias'}
                </Button>
              </div>
            </form>
          </section>

          {Object.keys(term.metadata).length ? (
            <section>
              <h3 className="text-sm font-semibold text-foreground">Metadata</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {Object.entries(term.metadata).map(([key, value]) => (
                  <Tag key={key}>
                    {key}: {typeof value === 'string' ? value : JSON.stringify(value)}
                  </Tag>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  )
}
