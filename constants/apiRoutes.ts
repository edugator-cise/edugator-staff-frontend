export const apiRoutes = {
  // v1
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
    getAccounts: "v1/user/getUsers",
    createAccount: "v1/user/create",
    updateUser: "v1/user/updateUser",
    deleteUser: "v1/user/deleteUser",
    createProblem: "v1/admin/problem",
    editProblem: (id: string) => `v1/admin/problem/${id}`,
    putLesson: (id: string) => `v1/admin/lesson/${id}`,
    createLesson: "v1/admin/lesson",
    deleteLesson: (id: string) => `v1/admin/lesson/${id}`,
    deleteProblem: (id: string) => `v1/admin/problem/${id}`,
    changeProblemOrder: "v1/module/changeProblemOrder",
  },
  v2: {
    student: {
      getStructure: (courseId: string) => `v2/course/${courseId}/structure`,

      // code evaluation
      runCode: "v2/code/run",
      runCodeEvaluation: "v2/code/run/evaluate",
      runCodeSubmission: "v2/code/run/submission",
    },
    admin: {
      // module
      createModule: "v2/module",
      deleteModule: (moduleId: string) => `v2/module/${moduleId}`,

      // lesson
      createLesson: "v2/admin/lesson",
      getLesson: (lessonId: string) => `v2/admin/lesson/${lessonId}`,
      updateLesson: (lessonId: string) => `v2/admin/lesson/${lessonId}`,
      deleteLesson: (lessonId: string) => `v2/admin/lesson/${lessonId}`,

      // problem
      createProblem: "v2/admin/problem",
      getProblem: (problemId: string) => `v2/admin/problem/${problemId}`,
      updateProblem: (problemId: string) => `v2/admin/problem/${problemId}`,
      deleteProblem: (problemId: string) => `v2/admin/problem/${problemId}`,

      // reorder
      reorderContent: (moduleId: string) =>
        `v2/module/${moduleId}/changeContentOrder`,
      reorderModule: (courseId: string) =>
        `v2/course/${courseId}/changeModuleOrder`,
    },
  },
};
