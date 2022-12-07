import React, { useEffect } from "react";
import { TextStack } from "./TextStack";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { LayoutContainer } from "../../shared/LayoutContainer";
import { Routes } from "../../shared/Routes.constants";
import { useAppSelector } from "../../app/common/hooks";
import { useDispatch } from "react-redux";
import {
  openWarningModal,
  requestGetContent,
  resetState,
  updateContentId,
  updateModuleId,
  updateModuleName,
  WarningTypes,
} from "./contentEditorPageSlice";
import { SuccessDialog } from "./SuccessDialog";
import { FailureDialog } from "./FailureDialog";
import { WarningDialog } from "./WarningDialog";

interface ContentEditorURL {
  contentId?: string;
}

interface ContentCreatorURL {
  moduleId?: string;
}

interface ContentLocationState {
  moduleName?: string;
}

export const ContentEditorPage = () => {
  const { moduleId, contentId } = useParams<
    ContentEditorURL & ContentCreatorURL
  >();

  const { moduleName } = useLocation<ContentLocationState>().state || {};

  const lessonTitle = useAppSelector(
    (state) => state.contentEditorPage.metadata.title
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
      label: "Delete Lesson",
      onClick: () => dispatch(openWarningModal(WarningTypes.Delete)),
      variant: "contained",
      color: "error",
    },
  };

  useEffect(() => {
    if (moduleId) {
      dispatch(updateModuleId(moduleId));
    }
    dispatch(updateContentId(contentId));
    dispatch(updateModuleName(moduleName));

    return () => {
      dispatch(resetState());
    };
  }, [moduleId, contentId, moduleName, dispatch]);

  useEffect(() => {
    if (contentId) {
      dispatch(requestGetContent(contentId));
    }
  }, [contentId, dispatch]);

  //Simple redirect fix with useHistory https://stackoverflow.com/questions/51393153/react-routing-redirect-onclick
  //Would recommend looking for more detailed fix in future
  const history = useHistory();

  return (
    <>
      <LayoutContainer
        pageTitle={`${moduleName ? moduleName + " - " : ""}${
          lessonTitle || "New Lesson"
        }`}
        actionButtons={
          contentId ? [actions.back, actions.delete] : [actions.back]
        }
      >
        <TextStack />
      </LayoutContainer>
      <SuccessDialog />
      <WarningDialog />
      <FailureDialog />
    </>
  );
};
