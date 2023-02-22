
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
} from "components/ProblemEditor/problemEditorContainerSlice";
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProblemCreatePage = () => {
  const router = useRouter();
  const { moduleId , moduleName } = router.query;

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
      
      <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>General Settings</Accordion.Header>
        <Accordion.Body>
        <ProblemEditorContainer />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>C++ Settings</Accordion.Header>
        <Accordion.Body>
        <ProblemEditorContainer />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Python Settings</Accordion.Header>
        <Accordion.Body>
        <ProblemEditorContainer />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </AdminLayout>
  );
};

export default ProblemCreatePage;

