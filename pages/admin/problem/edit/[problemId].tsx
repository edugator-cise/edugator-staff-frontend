import AdminLayout from "components/AdminLayout";
import { useEffect } from "react";
import { ProblemEditorContainer } from "components/ProblemEditor/ProblemEditorContainer/ProblemEditorContainer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  openWarningModal,
  requestGetProblemSuccess,
  resetState,
  updateModuleId,
  updateModuleName,
  updateProblemId,
  WarningTypes,
} from "state/problemEditorContainerSlice";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";
import { useState } from "react";
import { FetchStatus } from "hooks/types";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const ProblemEditPage = () => {
  const router = useRouter();
  const { problemId, moduleName, moduleId } = router.query;
  const [status, setStatus] = useState(FetchStatus.loading);
  const dispatch = useDispatch();

  dispatch(updateProblemId(problemId as string));

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
    const getProblemRequest = () =>
      apiClient.get(apiRoutes.admin.getProblem(problemId as string));

    getProblemRequest()
      .then((value) => {
        dispatch(updateModuleId(moduleId as string));
        dispatch(updateModuleName(moduleName as string));
        dispatch(requestGetProblemSuccess(value.data));
        setStatus(FetchStatus.succeed);
      })
      .catch((e) => {
        toast.error("failed to get problem");
        setStatus(FetchStatus.failed);
      });

    return () => {
      dispatch(resetState());
    };
  }, [problemId, moduleName]);

  return (
    <AdminLayout
      pageTitle={`${moduleName ? moduleName + " - " : ""}New Problem`}
      actionButtons={[actions.back, actions.delete]}
    >
      {status === FetchStatus.loading ? (
        <CircularProgress />
      ) : (
        <ProblemEditorContainer />
      )}
    </AdminLayout>
  );
};

export default ProblemEditPage;
