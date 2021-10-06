import React from "react";
import { ProblemEditorContainer } from "./ProblemEditorContainer/ProblemEditorContainer";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { Theme } from "@mui/material";

export const ProblemEditorPage = () => {
  const actions = [
    {
      label: "Back to Modules",
      onClick: () =>
        console.log("TODO: route back to modules and handle delete logic"),
      variant: "contained",
      color: "error",
    },
  ];

  return (
    <LayoutContainer pageTitle="New Problem" actionButtons={actions}>
      <ProblemEditorContainer />
    </LayoutContainer>
  );
};
