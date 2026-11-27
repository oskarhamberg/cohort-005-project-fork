import { loadLessonPage } from "./lib/load-lesson-page";

export { loadLessonPage };
export { getCommentById } from "./lib/thread";
export { markLessonComplete } from "./lib/progress";
export { computeResult, getQuizById } from "./lib/quiz";

/**
 * Everything the lesson page shows: the locked view (title, module and
 * outline, plus why it is locked) or the full view. Viewing as someone who
 * can take the course marks the lesson in progress.
 */
export type LessonPageData = Awaited<ReturnType<typeof loadLessonPage>>;
