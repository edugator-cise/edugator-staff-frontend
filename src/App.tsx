import { ThemeProvider, StyledEngineProvider } from "@mui/system";
import React from "react";
import "./App.css";
import { LoginPage } from "./pages/Login/LoginPage";
import theme from "./shared/theme";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./shared/Routes.constants";
import { PrivateRoute } from "./shared/PrivateRoute";
import { ModulesPage } from "./pages/modules/ModulesPage";
import { ProblemEditorPage } from "./pages/ProblemEditor/ProblemEditorPage";
import { CodeEditorPage } from "./pages/CodeEditor/CodeEditorPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { AdminAccountsPage } from "./pages/accounts/AdminAccountsPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import PrivacyNotice from "./pages/PrivacyNotice/PrivacyNoticePage";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route exact path={Routes.Login}>
              <LoginPage />
            </Route>
            <PrivateRoute exact path={Routes.ProblemEditor}>
              <ProblemEditorPage />
            </PrivateRoute>
            <PrivateRoute exact path={Routes.ProblemCreator}>
              <ProblemEditorPage />
            </PrivateRoute>
            <PrivateRoute exact path={Routes.Modules}>
              <ModulesPage />
            </PrivateRoute>
            <PrivateRoute exact path={Routes.Accounts}>
              <AdminAccountsPage />
            </PrivateRoute>
            <PrivateRoute exact path={Routes.AdminCodeWithProblem}>
              <CodeEditorPage />
            </PrivateRoute>
            <Route path={Routes.CodeWithProblem}>
              <CodeEditorPage />
            </Route>
            <Route exact path={Routes.Landing}>
              <LandingPage />
            </Route>
            <Route exact path={Routes.PrivacyNotice}>
              <PrivacyNotice />
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
