import { createMuiTheme } from "@mui/material";
import { ThemeProvider, StyledEngineProvider } from "@mui/system";
import React from "react";
import "./App.css";
import { ProblemEditorPage } from "./pages/ProblemEditor/ProblemEditorPage";

function App() {
  const theme = createMuiTheme();

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
