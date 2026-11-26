import { z } from "zod";

// A Note is plain text, trimmed, and refused (never truncated) past this cap.
// An empty body is allowed: saving an empty box clears the Note.
export const MAX_NOTE_LENGTH = 2000;

export const noteBodySchema = z
  .string()
  .trim()
  .max(
    MAX_NOTE_LENGTH,
    `A note must be ${MAX_NOTE_LENGTH.toLocaleString("en")} characters or fewer.`
  );
