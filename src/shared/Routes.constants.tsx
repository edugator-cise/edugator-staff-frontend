export enum Routes {
  Login = "/admin/login",
  Modules = "/admin/modules",
  ProblemEditor = "/admin/problem/edit/:problemId",
  ProblemEditorBaseWithoutId = "/admin/problem/edit/", //To be used only when pushing to a route.
  ProblemCreator = "/admin/problem/create/:moduleId",
  ProblemCreatorBaseWithoutId = "/admin/problem/create/", //To be used only when pushing to a route.
  CodeWithProblem = "/code/:problemId?",
  Accounts = "/admin/accounts",
  AdminCodeWithProblem = "/admin/code/:problemId?",
  AdminCode = "/admin/code",
  Code = "/code",
  Landing = "/",
  PrivacyNotice = "/privacy_notice",
}
