import React from "react";
import { ProblemEditorContainer } from "./ProblemEditorContainer/ProblemEditorContainer";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppSelector } from "../../app/common/hooks";
import { useHistory } from "react-router";

export const ProblemEditorPage = () => {
  const problemTitle = useAppSelector(
    (state) => state.problemEditorContainer.metadata.title
  );
  const history = useHistory();
  const actions = [
    {
      label: "Back to Modules",
      onClick: () => history.push("/modules"),
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
