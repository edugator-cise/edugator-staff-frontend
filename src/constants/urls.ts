export const getProblemUrl = (problemId: string, isAdmin: boolean) =>
  `v1/${isAdmin ? "admin" : "student"}/problem/${problemId}`;

export const getLessonUrl = (lessonId: string) =>
  `v1/student/lesson/${lessonId}`;

export const getModulesAndProblemsUrl = (isAdmin: boolean) =>
  `v1/module/${isAdmin ? "WithProblems" : "WithNonHiddenProblems"}`;

export const runCodeUrl = "v1/code/run";

export const runCodeSubmissionUrl = `v1/code/run/submission`;

export const submitCodeUrl = "v1/code/run/evaluate";
