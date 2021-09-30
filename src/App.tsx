import { createTheme } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/system";
import React from "react";
import "./App.css";
import { LoginPage } from "./app/Login/Login";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./shared/Routes.constants";
import { PrivateRoute } from "./shared/PrivateRoute";
import Modules from "./pages/modules/ModulesView";
import { ProblemEditorPage } from "./pages/ProblemEditor/ProblemEditorPage";

function App() {
  const theme = createTheme();

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
            <PrivateRoute exact path={Routes.Modules}>
              <Modules />
            </PrivateRoute>
          </Switch>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
