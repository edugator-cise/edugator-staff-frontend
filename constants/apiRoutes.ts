export const apiRoutes = {
  student: {
    getLesson: (id: string) => `v1/student/lesson/${id}`,
    getProblem: (id: string) => `v1/student/problem/${id}`,
    getModules: "v1/module/",
    getNavigation: "v1/module/WithNonHiddenProblems",
    runCode: "v1/code/run",
    runCodeSubmission: "v1/code/run/submission",
    runCodeEvaluation: "v1/code/run/evaluate",
  },
  admin: {
    getLesson: (id: string) => `v1/admin/lesson/${id}`,
    getProblem: (id: string) => `v1/admin/problem/${id}`,
    getNavigation: "v1/module/WithProblems",
  },
};
