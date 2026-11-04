export function toUrlSearchParams(record: Record<string, string | string[] | undefined>) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(record)) {
    const first = Array.isArray(value) ? value[0] : value
    if (first !== undefined) params.set(key, first)
  }
  return params
}

export const apiQueryFrom = (serialized: string): Record<string, string> => Object.fromEntries(new URLSearchParams(serialized))
