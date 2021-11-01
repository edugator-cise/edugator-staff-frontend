import React, { useEffect } from "react";
import { ProblemEditorContainer } from "./ProblemEditorContainer/ProblemEditorContainer";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { useAppSelector } from "../../app/common/hooks";
import { useHistory } from "react-router";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
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
  const history = useHistory();
  const dispatch = useDispatch();
  const actions = [
    {
      label: "Back to Modules",
      onClick: () => history.push("/admin/modules"),
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
  }, []);

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
