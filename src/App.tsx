import React from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/system";
import { Route, Switch } from "react-router-dom";
import { Routes } from "./shared/Routes.constants";
import { PrivateRoute } from "./shared/PrivateRoute";
import { LoginPage } from "./pages/Login/LoginPage";
import { ModulesPage } from "./pages/modules/ModulesPage";
import { ProblemEditorPage } from "./pages/ProblemEditor/ProblemEditorPage";

function App() {
  const theme = createTheme();

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ProblemEditorPage />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
