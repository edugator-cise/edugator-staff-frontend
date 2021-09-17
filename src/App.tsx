import { Typography } from "@material-ui/core";
import React from "react";
import "./App.css";
import { ProblemEditorContainer } from "./features/ProblemEditorContainer/ProblemEditorContainer";
import { LayoutContainer } from "./shared/LayoutContainer";

function App() {
  return (
    <div className="App">
      <LayoutContainer
        pageTitle="New Problem"
        actionButtons={[
          { label: "Test", onClick: () => console.log("It works!") },
        ]}
      >
        <ProblemEditorContainer />
      </LayoutContainer>
    </div>
  );
}

export default App;
