import React from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./shared/Routes.constants";
import { PrivateRoute } from "./shared/PrivateRoute";
import { LoginPage } from "./pages/Login/LoginPage";
import { ModulesPage } from "./pages/modules/ModulesPage";
import { ProblemEditorPage } from "./pages/ProblemEditor/ProblemEditorPage";

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path={Routes.Login}>
          <LoginPage />
        </Route>
        <PrivateRoute exact path={Routes.ProblemEditor}>
          <ProblemEditorPage />
        </PrivateRoute>
        <PrivateRoute exact path={Routes.Modules}>
          <ModulesPage />
        </PrivateRoute>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
