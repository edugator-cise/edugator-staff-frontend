import { createMuiTheme } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import React from "react";
import "./App.css";
import { ProblemEditorPage } from "./pages/ProblemEditor/ProblemEditorPage";

function App() {
  const theme = createMuiTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ProblemEditorPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
