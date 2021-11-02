import React, { useEffect } from "react";
import { ProblemEditorContainer } from "./ProblemEditorContainer/ProblemEditorContainer";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppSelector } from "../../app/common/hooks";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  openWarningModal,
  resetState,
  updateModuleId,
  updateModuleName,
  updateProblemId,
} from "./ProblemEditorContainer/problemEditorContainerSlice";

interface ProblemEditorURL {
  problemId?: string;
}

interface ProblemCreatorURL {
  moduleId?: string;
}

interface ProblemLocationState {
  moduleName?: string;
}

export const ProblemEditorPage = () => {
  const { moduleId, problemId } = useParams<
    ProblemEditorURL & ProblemCreatorURL
  >();
  const { moduleName } = useLocation<ProblemLocationState>().state;

  const problemTitle = useAppSelector(
    (state) => state.problemEditorContainer.metadata.title
  );

  const dispatch = useDispatch();
  const actions = [
    {
      label: "Back to Modules",
      onClick: () => dispatch(openWarningModal()),
      variant: "contained",
      color: "error",
    },
  ];

  useEffect(() => {
    if (moduleId) {
      dispatch(updateModuleId(moduleId));
    }
    dispatch(updateProblemId(problemId));
    dispatch(updateModuleName(moduleName));

    return () => {
      dispatch(resetState());
    };
  }, [moduleId, problemId, moduleName, dispatch]);

  return (
    <LayoutContainer
      pageTitle={`${moduleName ? moduleName + " - " : ""}${
        problemTitle || "New Problem"
      }`}
      actionButtons={actions}
    >
      <ProblemEditorContainer />
    </LayoutContainer>
  );
};
