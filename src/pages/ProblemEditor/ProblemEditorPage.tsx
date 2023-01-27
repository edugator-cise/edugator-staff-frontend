import React, { useEffect } from "react";
import { ProblemEditorContainer } from "./ProblemEditorContainer/ProblemEditorContainer";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppSelector } from "../../../lib/store/hooks";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  openWarningModal,
  requestGetProblem,
  resetState,
  updateModuleId,
  updateModuleName,
  updateProblemId,
  WarningTypes,
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
  const actions = {
    back: {
      label: "Back to Modules",
      onClick: () => dispatch(openWarningModal(WarningTypes.Quit)),
      variant: "contained",
      color: "primary",
    },
    delete: {
      label: "Delete Problem",
      onClick: () => dispatch(openWarningModal(WarningTypes.Delete)),
      variant: "contained",
      color: "error",
    },
  };

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

  useEffect(() => {
    if (problemId) {
      dispatch(requestGetProblem(problemId));
    }
  }, [problemId, dispatch]);

  return (
    <LayoutContainer
      pageTitle={`${moduleName ? moduleName + " - " : ""}${
        problemTitle || "New Problem"
      }`}
      actionButtons={
        problemId ? [actions.back, actions.delete] : [actions.back]
      }
    >
      <ProblemEditorContainer />
    </LayoutContainer>
  );
};
