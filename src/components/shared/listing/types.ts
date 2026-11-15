export type FacetOption = { value: string; label: string; count?: number; hint?: string }

export type FacetGroup = {
  key: string
  title: string
  options: FacetOption[]
  searchable?: boolean
}

export type SelectedFilters = Record<string, string[]>

export type SortOption = { value: string; label: string }

export const countSelected = (selected: SelectedFilters) => Object.values(selected).reduce((total, values) => total + values.length, 0)

export function appliedFilters(groups: FacetGroup[], selected: SelectedFilters) {
  return groups.flatMap((group) =>
    (selected[group.key] ?? []).map((value) => ({
      group: group.key,
      value,
      label: group.options.find((option) => option.value === value)?.label ?? value.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    })),
  )
}
