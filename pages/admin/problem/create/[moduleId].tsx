import AdminLayout from "components/AdminLayout/AdminLayout";
import { ReactNode, useEffect } from "react";
import { ProblemEditorContainer } from "components/ProblemEditor/ProblemEditorContainer/ProblemEditorContainer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  openWarningModal,
  requestResetProblem,
  resetState,
  updateModuleId,
  updateModuleName,
  WarningTypes,
} from "state/problemEditorContainerSlice";
import AdminProblemEditor from "components/ProblemEditor/NewEditor/ProblemEditor";

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
    console.log("new problem");
    dispatch(requestResetProblem());
    dispatch(updateModuleId(moduleId as string));
    dispatch(updateModuleName(moduleName as string));

    /* return () => {
      console.log("resetting state");
      dispatch(resetState());
    }; */
  }, [moduleId, moduleName]);

  return <AdminProblemEditor />;
};

ProblemCreatePage.getLayout = (page: ReactNode) => (
  <AdminLayout pageTitle="Problem Editor">{page}</AdminLayout>
);

{
  /* Reference below component */
}
{
  /* <ProblemEditorContainer /> */
}

export default ProblemCreatePage;
