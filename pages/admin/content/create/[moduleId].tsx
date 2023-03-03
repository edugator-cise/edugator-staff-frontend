import React, { useEffect } from "react";
import { TextStack } from "components/ContentEditor/TextStack";
import { useRouter } from "next/router";
import AdminLayout from "components/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  openWarningModal,
  requestGetContentSuccess,
  resetState,
  updateContentId,
  updateModuleId,
  updateModuleName,
  WarningTypes,
} from "state/contentEditorPageSlice";
import { SuccessDialog } from "components/ContentEditor/SuccessDialog";
import { FailureDialog } from "components/ContentEditor/FailureDialog";
import { WarningDialog } from "components/ContentEditor/WarningDialog";
import { RootState } from "lib/store/store";
import { ILesson } from "lib/shared/types";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";
import { useState } from "react";
import { FetchStatus } from "hooks/types";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const ContentCreatePage = () => {
  const router = useRouter();
  const { moduleName, moduleId } = router.query;

  const lessonTitle = useSelector(
    (state: RootState) => state.contentEditorPage.metadata.title
  );

  const dispatch = useDispatch();
  const actions = {
    back: {
      label: "Back to Modules",
      onClick: () => dispatch(openWarningModal(WarningTypes.Quit)),
      variant: "contained",
      color: "primary",
    },
  };

  useEffect(() => {
    if (moduleId) {
      dispatch(updateModuleId(moduleId as string));
    }
    dispatch(updateModuleName(moduleName as string));

    return () => {
      dispatch(resetState());
    };
  }, [moduleId, moduleName, dispatch]);

  return (
    <>
      <AdminLayout
        pageTitle={`${moduleName ? moduleName + " - " : ""}${
          lessonTitle || "New Lesson"
        }`}
        actionButtons={[actions.back]}
      >
        <TextStack moduleId={moduleId as string} />
      </AdminLayout>
      <SuccessDialog />
      <WarningDialog />
      <FailureDialog />
    </>
  );
};

export default ContentCreatePage;
