import * as React from 'react'
import { FactList, StatusBadge } from '../../../kit'
import { EditorSection } from '../../../programs/shared/section-kit'

export function SourceReviewSection({ isEdit }: { isEdit: boolean }) {
  return (
    <EditorSection id="review" title="Source and review">
      <FactList
        columns={3}
        items={[
          { label: 'Source', value: 'Institution fee schedule' },
          { label: 'Sync', value: <StatusBadge>Manual</StatusBadge> },
          { label: 'Stage', value: isEdit ? 'Existing record' : 'New record' },
        ]}
      />
    </EditorSection>
  )
}
