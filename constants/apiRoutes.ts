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
    health: "v1/health",
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
      getStructure: (courseId: string) =>
        `v3/course/${courseId}/structure?hidden=false`,

      // code evaluation
      runCode: "v2/code/run",
      runCodeEvaluation: "v2/code/run/evaluate",
      runCodeSubmission: "v2/code/run/submission",

      // invitations
      getInvitations: "v3/invitations",
      acceptInvitation: (invitationId: string) =>
        `v3/invitations/${invitationId}/accept`,
      rejectInvitation: (invitationId: string) =>
        `v3/invitations/${invitationId}/reject`,

      // enrollments
      getEnrollments: "v3/enrollments",
    },
    organization: {
      getAll: "v3/organization",
    },
    admin: {
      // organization
      getOrganizations: () => `v3/organization`,

      // course
      getStructure: (courseId: string) => `v3/course/${courseId}/structure`,
      getCourseById: (courseId: string) => `v3/course/${courseId}`,

      // module
      createModule: "v3/module",
      deleteModule: (moduleId: string) => `v3/module/${moduleId}`,

      // lesson
      createLesson: "v3/admin/lesson",
      getLesson: (lessonId: string) => `v3/admin/lesson/${lessonId}`,
      updateLesson: (lessonId: string) => `v3/admin/lesson/${lessonId}`,
      deleteLesson: (lessonId: string) => `v3/admin/lesson/${lessonId}`,

      // problem
      createProblem: "v3/admin/problem",
      getProblem: (problemId: string) => `v3/admin/problem/${problemId}`,
      updateProblem: (problemId: string) => `v3/admin/problem/${problemId}`,
      deleteProblem: (problemId: string) => `v3/admin/problem/${problemId}`,

      // reorder
      reorderContent: (moduleId: string) =>
        `v3/module/${moduleId}/changeContentOrder`,
      reorderModule: (courseId: string) =>
        `v3/course/${courseId}/changeModuleOrder`,

      // invitations and enrollments

      // invitations
      createInvitation: (courseId: string) =>
        `v3/course/${courseId}/invitations`,
      getCourseInvitations: (courseId: string) =>
        `v3/course/${courseId}/invitations`,
      deleteInvitation: (courseId: string, invitationId: string) =>
        `v3/course/${courseId}/invitations/${invitationId}`,

      // enrollments
      getCourseEnrollments: (courseId: string) =>
        `v3/course/${courseId}/enrollment`,
      deleteEnrollment: (courseId: string) =>
        `v3/course/${courseId}/enrollment`,
      updateEnrollment: (courseId: string) =>
        `v3/course/${courseId}/enrollment`,
    },
  },
};
