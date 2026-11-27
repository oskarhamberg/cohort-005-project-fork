import { describeDraft, type NoteDraft } from "./lib/draft";

export type { NoteDraft };

/**
 * What the note editor should show for the text in the box, given the body
 * last saved (or null before the first save): the character count against
 * the limit, whether there are unsaved changes, and whether Save would be
 * accepted. Mirrors the server's rules, so a disabled Save never hides a
 * save the server would take.
 */
export function noteDraft(draft: string, savedBody: string | null): NoteDraft {
  return describeDraft(draft, savedBody);
}
