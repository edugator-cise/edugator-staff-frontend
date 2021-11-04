export enum Routes {
  Login = "/admin/login",
  Modules = "/admin/modules",
  ProblemEditor = "/admin/problem/edit/:problemId",
  ProblemEditorBaseWithoutId = "/admin/problem/edit/", //To be used only when pushing to a route.
  ProblemCreator = "/admin/problem/create/:moduleId",
  ProblemCreatorBaseWithoutId = "/admin/problem/create/", //To be used only when pushing to a route.
  Accounts = "/admin/accounts",
  Code = "/code",
}
