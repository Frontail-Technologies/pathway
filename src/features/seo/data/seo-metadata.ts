import { SeoMetadataRecord, SeoTargetType } from '../types/seo-metadata'

export const canonicalSeoMetadata: SeoMetadataRecord[] = []

export function getSeoMetadataRecords(): SeoMetadataRecord[] {
  return canonicalSeoMetadata
}

export function getSeoMetadataById(id: string): SeoMetadataRecord | undefined {
  return canonicalSeoMetadata.find((record) => record.id === id)
}

export function getSeoMetadataByTarget(
  targetType: SeoTargetType,
  identifier: string
): SeoMetadataRecord | undefined {
  return canonicalSeoMetadata.find((record) => {
    if (record.targetType !== targetType) return false
    if (targetType === 'static_page') {
      return record.routePath === identifier
    }
    return record.targetId === identifier
  })
}
