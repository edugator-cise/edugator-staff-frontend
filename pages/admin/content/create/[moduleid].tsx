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
} from "components/ContentEditor/contentEditorPageSlice";
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

const ContentEditorPage = () => {
  const router = useRouter();
  const { lessonId, moduleName, moduleId } = router.query;

  const lessonTitle = useSelector(
    (state: RootState) => state.contentEditorPage.metadata.title
  );

  const [status, setStatus] = useState(FetchStatus.loading);

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
    console.log("useEffect");
    if (moduleId) {
      console.log(moduleId);
      dispatch(updateModuleId(moduleId as string));
    }
    dispatch(updateContentId(lessonId as string));
    dispatch(updateModuleName(moduleName as string));

    return () => {
      dispatch(resetState());
    };
  }, [moduleId, lessonId, moduleName, dispatch]);

  const handleGetContentRequest = async (payload: string) => {
    try {
      const { data }: { data: ILesson } = await apiClient.get(
        apiRoutes.admin.getLesson(payload)
      );
      dispatch(requestGetContentSuccess(data));
      setStatus(FetchStatus.succeed);
    } catch (e) {
      toast.error("Failed to get problem");
      setStatus(FetchStatus.failed);
    }
  };
  useEffect(() => {
    if (lessonId) {
      handleGetContentRequest(lessonId as string);
    } else {
      setStatus(FetchStatus.succeed);
    }
  }, [lessonId]);

  return (
    <>
      <AdminLayout
        pageTitle={`${moduleName ? moduleName + " - " : ""}${
          lessonTitle || "New Lesson"
        }`}
        actionButtons={
          lessonId ? [actions.back, actions.delete] : [actions.back]
        }
      >
        {status === FetchStatus.loading ? <CircularProgress /> : <TextStack />}
      </AdminLayout>
      <SuccessDialog />
      <WarningDialog />
      <FailureDialog />
    </>
  );
};

export default ContentEditorPage;