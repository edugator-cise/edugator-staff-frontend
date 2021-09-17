import { Typography } from "@material-ui/core";
import React from "react";
import "./App.css";
import { ProblemEditorContainer } from "./features/ProblemEditorContainer/ProblemEditorContainer";
import { LayoutContainer } from "./shared/LayoutContainer";

function App() {
  return (
    <div className="App">
      <LayoutContainer pageTitle="New Problem">
        <ProblemEditorContainer />
      </LayoutContainer>
    </div>
  );
}

export default App;
