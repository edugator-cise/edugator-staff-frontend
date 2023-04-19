import AdminLayout from "components/AdminLayout";
import { useEffect } from "react";
import { ProblemEditorContainer } from "components/ProblemEditor/ProblemEditorContainer/ProblemEditorContainer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  openWarningModal,
  resetState,
  updateModuleId,
  updateModuleName,
  WarningTypes,
} from "state/problemEditorContainerSlice";

const ProblemCreatePage = () => {
  const router = useRouter();
  const { moduleId, moduleName } = router.query;

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
    dispatch(updateModuleId(moduleId as string));
    dispatch(updateModuleName(moduleName as string));

    return () => {
      dispatch(resetState());
    };
  }, [moduleId, moduleName]);

  return (
    <AdminLayout
      pageTitle={`${moduleName ? moduleName + " - " : ""}New Problem`}
      actionButtons={[actions.back]}
    >
      <ProblemEditorContainer />
    </AdminLayout>
  );
};

export default ProblemCreatePage;
