import { ThemeProvider, StyledEngineProvider } from "@mui/system";
import React from "react";
import "./App.css";
import { LoginPage } from "./app/Login/Login";
import { Typography } from "@mui/material";
import VerticalNavigation from "./shared/VerticalNavigation";
import LandingHome from "./pages/LandingPage/LandingHome";
import theme from './shared/theme';
import { Route, Switch } from "react-router-dom";
import { Routes } from "./shared/Routes.constants";
import { PrivateRoute } from "./shared/PrivateRoute";
import Modules from "./pages/modules/ModulesView";
import { ProblemEditorPage } from "./pages/ProblemEditor/ProblemEditorPage";

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
            <PrivateRoute exact path={Routes.Modules}>
              <Modules />
            </PrivateRoute>
            <Route exact path='/'>
            <VerticalNavigation />
              <LandingHome />
              {/* <ProblemEditorPage></ProblemEditorPage> */}
              <div style={{height: 800, backgroundColor: '#0f287a', width: '100%'}} />
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
