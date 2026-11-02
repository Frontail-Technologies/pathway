import * as React from 'react'
import { FactList, StatusBadge } from '../../../kit'
import { EditorSection } from '../../shared/section-kit'

export type SourceReviewSectionProps = {
  isEdit: boolean
}

export function SourceReviewSection({ isEdit }: SourceReviewSectionProps) {
  return (
    <EditorSection id="review" title="Source and review" description="Data quality is recalculated from sources and completeness when you save.">
      <FactList
        columns={3}
        items={[
          { label: 'Source', value: 'Added manually' },
          { label: 'Sync', value: <StatusBadge>Manual</StatusBadge> },
          { label: 'Stage', value: isEdit ? 'Existing record' : 'New record' },
        ]}
      />
    </EditorSection>
  )
}
