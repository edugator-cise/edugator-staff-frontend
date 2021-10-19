import React from "react";
import { ProblemEditorContainer } from "./ProblemEditorContainer/ProblemEditorContainer";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppSelector } from "../../app/common/hooks";

export const ProblemEditorPage = () => {
  const problemTitle = useAppSelector(
    (state) => state.problemEditorContainer.metadata.title
  );
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
    <LayoutContainer
      pageTitle={problemTitle || "New Problem"}
      actionButtons={actions}
    >
      <ProblemEditorContainer />
    </LayoutContainer>
  );
};
