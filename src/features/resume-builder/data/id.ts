let counter = 0

 
export function makeEntryId(prefix: string) {
  counter += 1
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }
  return `${prefix}-${Date.now()}-${counter}`
}
