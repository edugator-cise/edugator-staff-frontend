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
import { useFetchLesson } from "hooks/useFetchLesson";

const ContentEditorPage = () => {
  const router = useRouter();
  const params = router.query;
  const { moduleName, moduleId, lessonId } = params;

  const {
    status,
    lesson: currentLesson,
    rawLesson,
    error,
  } = useFetchLesson({
    id: params && lessonId ? (lessonId as string) : "",
  });

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
    dispatch(updateContentId(lessonId as string));
    dispatch(updateModuleId(moduleId as string));
    dispatch(updateModuleName(moduleName as string));

    return () => {
      dispatch(resetState());
    };
  }, [moduleId, moduleName, dispatch]);

  if (!currentLesson) return <CircularProgress />;
  return (
    <>
      <AdminLayout
        pageTitle={`${moduleName ? moduleName + " - " : ""}${
          currentLesson.title || "New Lesson"
        }`}
        actionButtons={
          lessonId ? [actions.back, actions.delete] : [actions.back]
        }
      >
        {status === FetchStatus.loading ? (
          <CircularProgress />
        ) : (
          <TextStack rawLesson={rawLesson} moduleId={moduleId as string} />
        )}
      </AdminLayout>
      <SuccessDialog />
      <WarningDialog />
      <FailureDialog />
    </>
  );
};

export default ContentEditorPage;
