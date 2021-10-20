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
import LandingPage from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="App">
          <ProblemEditorPage />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
