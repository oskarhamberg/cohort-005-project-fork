import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteDraft = {
  /** Characters the server would store: it trims before it counts. */
  length: number;
  max: number;
  tooLong: boolean;
  empty: boolean;
  /** Differs from what is saved, so leaving now would lose it. */
  unsaved: boolean;
  canSave: boolean;
};

export function describeDraft(
  draft: string,
  savedBody: string | null
): NoteDraft {
  const trimmed = normaliseLineBreaks(draft).trim();
  const length = trimmed.length;
  const tooLong = length > MAX_NOTE_LENGTH;
  const empty = length === 0;
  const unsaved = trimmed !== normaliseLineBreaks(savedBody ?? "");

  return {
    length,
    max: MAX_NOTE_LENGTH,
    tooLong,
    empty,
    unsaved,
    canSave: unsaved && !empty && !tooLong,
  };
}

// The app's fetcher posts a textarea's line breaks as \n, but a form posted
// without JavaScript sends \r\n, so a saved note can hold either.
function normaliseLineBreaks(text: string) {
  return text.replace(/\r\n/g, "\n");
}
