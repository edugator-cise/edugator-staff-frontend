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
import { ContentEditorPage } from "./pages/ContentEditor/ContentEditorPage";
import { CodeEditorPage } from "./pages/CodeEditor/CodeEditorPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import { AdminAccountsPage } from "./pages/accounts/AdminAccountsPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import PrivacyNotice from './pages/StaticPages/PrivacyNotice'
import TermsOfUse from './pages/StaticPages/TermsOfUse'
import Ferpa from './pages/StaticPages/Ferpa'
import PrivacyNoticeDocument from "./pages/PrivacyNotice/PrivacyNoticePage";
import LearnPage from "./pages/LearnPage/LearnPage";

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
            <PrivateRoute exact path={Routes.ContentCreator}>
              <ContentEditorPage />
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
            <Route path={Routes.Learn}>
              <LearnPage />
            </Route>
            <Route exact path={Routes.Landing}>
              <LandingPage />
            </Route>
            <Route exact path={Routes.PrivacyNotice}>
              <PrivacyNotice />
            </Route>
            <Route exact path={Routes.PrivacyNoticeDocument}>
              <PrivacyNoticeDocument />
            </Route>
            <Route exact path={Routes.TermsOfUse}>
              <TermsOfUse />
            </Route>
            <Route exact path={Routes.FERPA}>
              <Ferpa />
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
