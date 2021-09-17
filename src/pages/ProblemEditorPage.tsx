import React from "react";
import { ProblemEditorContainer } from "../features/ProblemEditorContainer/ProblemEditorContainer";
import { LayoutContainer } from "../shared/LayoutContainer";

export const ProblemEditorPage = () => {
  const actions = [
    { label: "Test", onClick: () => console.log("It works!") },
    {
      label: "Another button",
      onClick: () => console.log("Hey this works too!"),
    },
  ];

  return (
    <LayoutContainer pageTitle="New Problem" actionButtons={actions}>
      <ProblemEditorContainer />
    </LayoutContainer>
  );
};
