export enum Routes {
  Login = "/admin/login",
  Modules = "/admin/modules",
  ProblemEditor = "/admin/problem/edit/:problemId",
  ProblemEditorBaseWithoutId = "/admin/problem/edit/", //To be used only when pushing to a route.
  ContentEditorBaseWithoutId = "/admin/content/edit/", //To be used only when pushing to a route.
  ProblemCreator = "/admin/problem/create/:moduleId",
  ContentEditor = "/admin/content/edit/:contentId",
  ContentCreator = "/admin/content/create/:moduleId",
  ContentCreatorBaseWithoutId = "/admin/content/create/", //To be used only when pushing to a route.
  ProblemCreatorBaseWithoutId = "/admin/problem/create/", //To be used only when pushing to a route.
  CodeWithProblem = "/playground/code/:problemId?",
  Accounts = "/admin/accounts",
  AdminCodeWithProblem = "/admin/code/:problemId?",
  AdminCode = "/admin/code",
  Code = "/playground/code",
  Learn = "/playground/learn",
  LearnWithLesson = "/playground/learn/:lessonId?",
  Landing = "/",
  PrivacyNotice = "/privacy_notice",
  FERPA = "/ferpa",
  TermsOfUse = "/termsofuse",
  Playground = "/playground",
}

export enum NextRoutes {
  Code = "/code",
  Login = "/admin/login"
}
