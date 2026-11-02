import { EditorSection } from '../../../shared/editor-kit'

export function CoachingSourceSection() {
  return (
    <EditorSection id="source" title="Source">
      <p className="text-sm text-muted-foreground">
        Records are entered by hand or imported from the provider’s official site. Imported changes are held for review and never overwrite this record directly.
      </p>
    </EditorSection>
  )
}
