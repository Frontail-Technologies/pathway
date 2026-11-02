import { EditorSection } from '../../../shared/editor-kit'

export function TutorSourceSection() {
  return (
    <EditorSection id="source" title="Source">
      <p className="text-sm text-muted-foreground">
        Tutor profiles contain personal data, so they're entered by hand or from a signed agreement with the tutor. Automatic imports never change them.
      </p>
    </EditorSection>
  )
}
