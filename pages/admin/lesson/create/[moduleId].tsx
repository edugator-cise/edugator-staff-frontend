import React, { useEffect } from "react";
import { TextStack } from "components/ContentEditor/TextStack";
import { useRouter } from "next/router";
import AdminLayout from "components/AdminLayout/AdminLayout";
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
import AdminLessonEditor from "components/LessonEditor/LessonEditor";

const ContentCreatePage = () => {
  const router = useRouter();
  const { moduleName, moduleId } = router.query;

  const lessonTitle = useSelector(
    (state: RootState) => state.contentEditorPage.metadata.title
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateModuleId(moduleId as string));
    dispatch(updateModuleName(moduleName as string));

    return () => {
      dispatch(resetState());
    };
  }, [moduleId, moduleName, dispatch]);

  return <AdminLessonEditor />;
};
{
  /* <TextStack moduleId={moduleId as string} /> */
}

ContentCreatePage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Lesson Editor">{page}</AdminLayout>
);

export default ContentCreatePage;
