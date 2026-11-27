import { describe, it, expect } from "vitest";
import { MAX_NOTE_LENGTH } from "~/lib/notes";
import { noteDraft } from "../index";

describe("noteDraft", () => {
  it("can't save an empty box", () => {
    const draft = noteDraft("", null);
    expect(draft.empty).toBe(true);
    expect(draft.unsaved).toBe(false);
    expect(draft.canSave).toBe(false);
  });

  it("treats whitespace alone as empty, as the server does", () => {
    const draft = noteDraft("   \n  ", null);
    expect(draft.empty).toBe(true);
    expect(draft.length).toBe(0);
    expect(draft.canSave).toBe(false);
  });

  it("can save a first note", () => {
    const draft = noteDraft("Rewatch at 4:20", null);
    expect(draft).toEqual({
      length: 15,
      max: MAX_NOTE_LENGTH,
      tooLong: false,
      empty: false,
      unsaved: true,
      canSave: true,
    });
  });

  it("has nothing to save when the box matches the saved note", () => {
    const draft = noteDraft("Rewatch at 4:20", "Rewatch at 4:20");
    expect(draft.unsaved).toBe(false);
    expect(draft.canSave).toBe(false);
  });

  it("ignores surrounding whitespace when comparing with the saved note", () => {
    const draft = noteDraft("  Rewatch at 4:20\n", "Rewatch at 4:20");
    expect(draft.unsaved).toBe(false);
  });

  it("can save an edit to the saved note", () => {
    const draft = noteDraft("Rewatch at 4:30", "Rewatch at 4:20");
    expect(draft.unsaved).toBe(true);
    expect(draft.canSave).toBe(true);
  });

  it("counts the trimmed length", () => {
    expect(noteDraft("  abc  ", null).length).toBe(3);
  });

  it("accepts a note exactly at the limit", () => {
    const draft = noteDraft("a".repeat(MAX_NOTE_LENGTH), null);
    expect(draft.tooLong).toBe(false);
    expect(draft.canSave).toBe(true);
  });

  it("refuses a note one character over the limit", () => {
    const draft = noteDraft("a".repeat(MAX_NOTE_LENGTH + 1), null);
    expect(draft.tooLong).toBe(true);
    expect(draft.length).toBe(MAX_NOTE_LENGTH + 1);
    expect(draft.canSave).toBe(false);
  });

  it("still marks an emptied box as unsaved against a saved note", () => {
    const draft = noteDraft("", "Rewatch at 4:20");
    expect(draft.unsaved).toBe(true);
    expect(draft.canSave).toBe(false);
  });

  it("matches a multi-line note the browser saved with \\r\\n line breaks", () => {
    const draft = noteDraft("line one\nline two", "line one\r\nline two");
    expect(draft.unsaved).toBe(false);
  });

  it("matches a multi-line note saved with \\n line breaks", () => {
    const draft = noteDraft("line one\nline two", "line one\nline two");
    expect(draft.unsaved).toBe(false);
  });

  it("counts a line break as one character", () => {
    expect(noteDraft("a\nb", null).length).toBe(3);
  });
});
