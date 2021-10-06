import React from "react";
import "./App.css";
import { LoginPage } from "./app/Login/Login";
import { Typography } from "@material-ui/core";
import { ProblemEditorPage } from "./pages/ProblemEditor/ProblemEditorPage";
import VerticalNavigation from "./shared/VerticalNavigation";
import LandingHome from "./pages/LandingPage/LandingHome";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import theme from './shared/theme';

function App() {
  return (
    <div className="App">
      
      <ThemeProvider theme={theme}>
      <Typography variant="h3" color="textSecondary">
        <VerticalNavigation />
        <LandingHome />
        {/* <ProblemEditorPage></ProblemEditorPage> */}
        <div style={{height: 800, backgroundColor: '#0f287a', width: '100%'}} />
      </Typography>
      </ThemeProvider>
    </div>
  );
}

export default App;
