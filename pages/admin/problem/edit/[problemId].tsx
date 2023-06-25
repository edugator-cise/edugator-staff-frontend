import AdminLayout from "components/AdminLayout/AdminLayout";
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
import AdminProblemEditor from "components/ProblemEditor/NewEditor/ProblemEditor";

const ProblemEditPage = () => {
  const router = useRouter();
  const { problemId, moduleName, moduleId } = router.query;
  console.log(problemId);
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

    if (!problemId) {
      return;
    }
    setStatus(FetchStatus.loading);
    getProblemRequest()
      .then((value) => {
        dispatch(updateModuleId(moduleId as string));
        dispatch(updateModuleName(moduleName as string));
        console.log(value);
        dispatch(requestGetProblemSuccess(value.data));
        setStatus(FetchStatus.succeed);
      })
      .catch((e) => {
        console.log(e);
        toast.error("failed to get problem");
        setStatus(FetchStatus.failed);
      });

    return () => {
      dispatch(resetState());
    };
  }, [problemId, moduleName]);

  return status === FetchStatus.loading ? (
    //return true ? (
    // <CircularProgress /> // replace with skeleton loader
    <div className="w-full h-full flex flex-col">
      <div className="h-14 py-3 bg-nav-darkest w-full flex justify-between px-4 items-center">
        <div className="h-full w-48 rounded-md animate-pulse bg-nav-inactive-dark/50"></div>
        <div className="flex space-x-2 items-center h-full">
          <div className="w-8 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
          <div className="w-8 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
          <div className="w-24 h-8 rounded-md bg-nav-inactive-dark/50 animate-pulse"></div>
        </div>
      </div>
      <div className="w-full h-full flex">
        {/* Metadata */}
        <div className="h-full w-full bg-slate-100 border-r border-slate-300 p-4 flex flex-col items-start space-y-4">
          <div className="rounded-md h-12 w-80 bg-slate-300 animate-pulse"></div>
          <div className="flex items-center justify-center space-x-4">
            <div className="rounded-full h-6 w-24 bg-slate-300 animate-pulse"></div>
            <div className="rounded-full h-6 w-16 bg-slate-300 animate-pulse"></div>
            <div className="rounded-full h-6 w-20 bg-slate-300 animate-pulse"></div>
          </div>
          <div className="rounded-md w-56 h-4 bg-slate-300 animate-pulse !mt-12"></div>
          <div className="rounded-md w-80 h-4 bg-slate-300 animate-pulse"></div>
          <div className="rounded-md w-96 h-4 bg-slate-300 animate-pulse"></div>
          <div className="rounded-md w-48 h-4 bg-slate-300 animate-pulse"></div>
          <div className="rounded-md w-24 h-4 animate-pulse"></div>
          <div className="rounded-md w-52 h-4 bg-slate-300 animate-pulse"></div>
          <div className="rounded-md w-28 h-4 bg-slate-300 animate-pulse"></div>
          <div className="rounded-md w-36 h-4 bg-slate-300 animate-pulse"></div>
        </div>
        <div className="h-full w-full flex flex-col">
          {/* Code Editor */}
          <div className="h-full w-full border-b border-slate-300 space-y-4 bg-slate-100 p-4 flex flex-col">
            <div className="w-full h-full rounded-md bg-gradient-to-b from-slate-300 to-slate-200 animate-pulse"></div>
            <div className="w-full flex justify-end items-center space-x-4">
              <div className="w-24 h-8 rounded-md bg-slate-300 animate-pulse"></div>
              <div className="w-24 h-8 rounded-md bg-slate-300 animate-pulse"></div>
            </div>
          </div>
          <div className="h-full w-full space-y-4 bg-slate-100 p-4 flex flex-col">
            <div className="w-full flex justify-start items-center space-x-4">
              <div className="w-24 h-10 rounded-md bg-slate-300 animate-pulse"></div>
              <div className="w-24 h-10 rounded-md bg-slate-300 animate-pulse"></div>
              <div className="w-24 h-10 rounded-md bg-slate-300 animate-pulse"></div>
            </div>
            <div className="w-full h-full rounded-md bg-gradient-to-b to-slate-300 from-slate-200 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <>
      <AdminProblemEditor />
      {/* Reference below component */}
      {/* <ProblemEditorContainer /> */}
    </>
  );
};

ProblemEditPage.getLayout = (page: React.ReactNode) => (
  <AdminLayout pageTitle="Problem Editor">{page}</AdminLayout>
);

export default ProblemEditPage;
