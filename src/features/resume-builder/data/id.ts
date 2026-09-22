let counter = 0

/** Local-only entry id — no backend exists yet, so a stable-enough client id is sufficient. */
export function makeEntryId(prefix: string) {
  counter += 1
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${counter}`
}
