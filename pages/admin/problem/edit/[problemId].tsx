
import AdminLayout from "components/AdminLayout";
import { useEffect } from "react";
import { ProblemEditorContainer } from "components/ProblemEditor/ProblemEditorContainer/ProblemEditorContainer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  openWarningModal,
  requestGetProblem,
  resetState,
  updateModuleName,
  WarningTypes,
} from "components/ProblemEditor/problemEditorContainerSlice";

const ProblemEditPage = () => {
  const router = useRouter();
  const { problemId , moduleName } = router.query;

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
    dispatch(updateModuleName(moduleName as string));
    return () => {
      dispatch(resetState());
    };
  }, [problemId, moduleName]);

  useEffect(() => {
    dispatch(requestGetProblem(problemId as string));
  }, [problemId]);

  return (
    <AdminLayout
      pageTitle={`${moduleName ? moduleName + " - " : ""}New Problem`}
      actionButtons={[actions.back, actions.delete]}
    >
      <ProblemEditorContainer />
    </AdminLayout>
  );
};

export default ProblemEditPage;

