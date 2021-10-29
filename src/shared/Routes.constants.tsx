export enum Routes {
  Login = "/admin/login",
  Modules = "/admin/modules",
  ProblemEditor = "/admin/problem/edit/:problemId",
  ProblemEditorWithoutId = "/admin/problem/edit/", //To be used only when pushing to a route.
  ProblemCreator = "/admin/problem/create/:moduleId",
  ProblemCreatorWithoutId = "/admin/problem/create/", //To be used only when pushing to a route.
  Code = "/code",
}
