import AdminLayout from "components/AdminLayout";
import { useEffect, useState } from "react";
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

  const [showCppSettings, setShowCppSettings] = useState(false);
  const [showPythonSettings, setShowPythonSettings] = useState(false);

  function handleCppSettingsCheckboxChange() {
    setShowCppSettings(!showCppSettings);
  }

  function handlePythonSettingsCheckboxChange() {
    setShowPythonSettings(!showPythonSettings);
  }

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
      
      <div style={{ display: 'flex' }}>
        <h5>Select programming languages:</h5>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          <input
            type="checkbox"
            onChange={handleCppSettingsCheckboxChange}
            checked={showCppSettings}
          />
          {' '}
          C++
        </div>
        <div style={{ marginLeft: '16px' }}>
          <input
            type="checkbox"
            onChange={handlePythonSettingsCheckboxChange}
            checked={showPythonSettings}
          />
          {' '}
           Python
        </div>
      </div>
      <br/>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>General Settings</Accordion.Header>
          <Accordion.Body>
            <ProblemEditorContainer />
          </Accordion.Body>
        </Accordion.Item>
        {showCppSettings && (
          <Accordion.Item eventKey="1">
            <Accordion.Header>C++ Settings</Accordion.Header>
            <Accordion.Body>
              <ProblemEditorContainer />
            </Accordion.Body>
          </Accordion.Item>
        )}
        {showPythonSettings && (
          <Accordion.Item eventKey="2">
            <Accordion.Header>Python Settings</Accordion.Header>
            <Accordion.Body>
              <ProblemEditorContainer />
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>
    </AdminLayout>
  );
};

export default ProblemCreatePage;
