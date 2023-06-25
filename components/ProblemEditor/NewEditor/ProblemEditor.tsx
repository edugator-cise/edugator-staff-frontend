import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useReducer,
} from "react";
import "allotment/dist/style.css";
import dynamic from "next/dynamic";
import { AllotmentProps } from "allotment";
import AdminLayout from "components/AdminLayout/AdminLayout";
import CodeEditorPane from "components/ProblemEditor/NewEditor/CodeEditorPane/CodeEditorPane";
import MetadataEditorPane from "components/ProblemEditor/NewEditor/MetadataEditorPane/MetadataEditorPane";
import {
  Language,
  LanguageData,
  ProblemAction,
  ProblemData,
  TestCaseVisibility,
} from "components/ProblemEditor/NewEditor/types";
import {
  getFileExtension,
  sampleCodeData,
  sampleEditorContent,
  sampleTestCases,
} from "components/ProblemEditor/NewEditor/utils";
import InputOutputEditorPane from "components/ProblemEditor/NewEditor/InputOutputEditorPane/InputOutputEditorPane";
import { useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import {
  ArrowRightIcon,
  CheckCircledIcon,
  CheckIcon,
  EyeOpenIcon,
  GearIcon,
  Pencil1Icon,
  Pencil2Icon,
  RocketIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Eye } from "tabler-icons-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import Modal from "components/shared/Modals/Modal";
import SwitchToggle from "components/shared/SwitchToggle";
import AlertModal from "components/shared/Modals/AlertModal";
import { toast } from "react-hot-toast";

const Allotment = dynamic<AllotmentProps>(
  () => import("allotment").then((mod) => mod.Allotment),
  { ssr: false }
);

const getSampleCodeData: (language: Language) => LanguageData = (
  language: Language
) => {
  return (
    sampleCodeData[language] ||
    ({
      solution: "",
      body: "",
      fileName: "",
      header: "",
    } as LanguageData)
  );
};

const AdminProblemEditor = () => {
  // collect values from global state to pass into form

  // first, module name and id
  const moduleName = useSelector(
    (state: RootState) => state.problemEditorContainer.moduleName
  );
  const moduleId = useSelector(
    (state: RootState) => state.problemEditorContainer.moduleId
  );

  // metadata for title, hidden, dueDate, fileName, language
  const metadataValues = useSelector(
    (state: RootState) => state.problemEditorContainer.metadata
  );

  const language = !metadataValues.language
    ? "cpp" // replace with course language later
    : metadataValues.language === "C++"
    ? "cpp"
    : (metadataValues.language as Language);

  // now problem data - problemStatement and templatePackage (might need to move templatepackage to codeData)
  const problemDataValues = useSelector(
    (state: RootState) => state.problemEditorContainer.problem
  );

  // next - codeData for solution, body, header, footer
  const codeDataValues = useSelector(
    (state: RootState) => state.problemEditorContainer.codeEditor
  );

  // finally, test cases
  const testCases = useSelector(
    (state: RootState) => state.problemEditorContainer.testCases
  );

  const initialProblemState: ProblemData = {
    title: metadataValues.title || "",
    hidden: false,
    dueDate: new Date().toISOString(),
    language: language, // should derive this from course info
    description: problemDataValues?.problemStatement || undefined,
    codeData: codeDataValues.code
      ? { ...codeDataValues?.code, fileName: metadataValues?.fileName }
      : getSampleCodeData(language),
    timeLimit: 5,
    memoryLimit: 2048,
    buildCommand: "",
    testCases: testCases ? testCases : sampleTestCases,
  };

  function problemReducer(
    state: ProblemData,
    action: ProblemAction
  ): ProblemData {
    switch (action.type) {
      case "SET_TITLE":
        console.log(action.payload);
        console.log(state);
        return { ...state, title: action.payload };
      case "SET_HIDDEN":
        return { ...state, hidden: action.payload };
      case "SET_DESCRIPTION":
        return { ...state, description: action.payload };

      case "SET_LANGUAGE_DATA":
        console.log(action.payload.data);
        return {
          ...state,
          language: action.payload.language,
          codeData: {
            ...action.payload.data,
          },
        };
      case "SET_TIME_LIMIT":
        return { ...state, timeLimit: action.payload };
      case "SET_MEMORY_LIMIT":
        return { ...state, memoryLimit: action.payload };
      case "SET_BUILD_COMMAND":
        return { ...state, buildCommand: action.payload };
      case "ADD_TEST_CASE":
        return { ...state, testCases: [...state.testCases, action.payload] };
      case "UPDATE_TEST_CASE":
        return {
          ...state,
          testCases: state.testCases.map((testCase, index) =>
            index === action.payload.index ? action.payload.testCase : testCase
          ),
        };
      case "REMOVE_TEST_CASE":
        return {
          ...state,
          testCases: state.testCases.filter(
            (_, index) => index !== action.payload
          ),
        };
      case "RESET_PROBLEM":
        return initialProblemState;

      default:
        return state;
    }
  }

  const [preview, setPreview] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [problemState, problemDispatch] = useReducer<
    React.Reducer<ProblemData, ProblemAction>
  >(problemReducer, initialProblemState);

  // this below useEffect is really bad practice

  // basically i cant figure out why this component isn't rerendering when you navigate to a new problem from
  // a populated problem. The old problem data is still rendered in the UI despite it changing in the redux store

  // so I hackily just check when testCases changes to undefined (only happens when you navigate to a new problem)
  // and then reset the problem state. this is then drilled down to the editor in MetadataEditorPane, so that pane
  // resets whenever test cases change as well

  useEffect(() => {
    console.log("test cases");
    console.log(testCases);
    console.log(problemDataValues.problemStatement);
    if (!testCases) {
      //reset problem state
      problemDispatch({
        type: "RESET_PROBLEM",
      });
    }
  }, [testCases]);

  // for testing

  useEffect(() => {
    console.log("problem state");
    console.log(problemState);
  }, [problemState]);

  return (
    <div
      className={`w-full h-full flex flex-col dark:bg-nav-darkest relative ${
        preview ? "bg-white" : "bg-slate-100"
      }`}
    >
      <Modal
        title="Problem Settings"
        open={settingsOpen}
        setOpen={setSettingsOpen}
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="hidden"
              className="text-xs text-slate-800 dark:text-white font-dm font-medium"
            >
              Visibility
            </label>
            <div className="flex items-center justify-between space-x-2 w-full">
              <div className="text-sm font-dm">Problem Hidden?</div>
              <SwitchToggle
                checked={problemState.hidden}
                onCheckedChange={(checked) => {
                  problemDispatch({
                    type: "SET_HIDDEN",
                    payload: checked,
                  });
                }}
              />
              {/* <button
                  className={`${
                    problemState.hidden
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-slate-800"
                  } px-4 py-2 rounded-md flex items-center space-x-2 font-dm font-medium text-xs`}
                  onClick={() => {
                    problemDispatch({
                      type: "SET_HIDDEN",
                      payload: true,
                    });
                  }}
                >
                  <CheckIcon />
                  <p>Hidden</p>
                </button>
                <button
                  className={`${
                    !problemState.hidden
                      ? "bg-emerald-500 text-white"
                      : "bg-white text-slate-800"
                  } px-4 py-2 rounded-md flex items-center space-x-2 font-dm font-medium text-xs`}
                  onClick={() => {
                    problemDispatch({
                      type: "SET_HIDDEN",
                      payload: false,
                    });
                  }}
                >
                  <CheckIcon />
                  <p>Visible</p>
                </button> */}
            </div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex flex-col space-y-2 w-full">
              <label
                htmlFor="time limit"
                className="text-xs text-slate-800 dark:text-white font-dm font-medium"
              >
                Time Limit (seconds)
              </label>
              <input
                type="number"
                id="time limit"
                className="w-full py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 dark:bg-nav-darkest bg-white dark:text-white text-slate-800 px-3 font-dm font-medium outline-none"
                placeholder="5"
                value={problemState.timeLimit}
                onChange={(e) => {
                  problemDispatch({
                    type: "SET_TIME_LIMIT",
                    payload: parseInt(e.target.value),
                  });
                }}
              />
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label
                htmlFor="memory limit"
                className="text-xs text-slate-800 dark:text-white font-dm font-medium"
              >
                Memory Limit (MB)
              </label>
              <input
                type="number"
                id="memory limit"
                className="w-full py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 dark:bg-nav-darkest bg-white dark:text-white text-slate-800 px-3 font-dm font-medium outline-none"
                placeholder="2048"
                value={problemState.memoryLimit}
                onChange={(e) => {
                  problemDispatch({
                    type: "SET_MEMORY_LIMIT",
                    payload: parseInt(e.target.value),
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 w-full">
            <label
              htmlFor="build command"
              className="text-xs text-slate-800 dark:text-white font-dm font-medium"
            >
              Build Command
            </label>
            <input
              type="text"
              id="build command"
              className="w-full py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 dark:bg-nav-darkest bg-white dark:text-white text-slate-800 px-3 font-dm font-medium outline-none"
              placeholder="g++ -std=c++17 -O2 -o main main.cpp"
              value={problemState.buildCommand}
              onChange={(e) => {
                problemDispatch({
                  type: "SET_BUILD_COMMAND",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="w-full py-3 bg-red-100 hover:bg-red-200 cursor-pointer text-red-600 rounded-md flex space-x-2 items-center justify-center"
          >
            <TrashIcon />
            <p className="text-xs font-dm font-medium">Delete Problem</p>
          </button>
        </div>
      </Modal>
      <AlertModal
        title="Delete Problem"
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        description="Are you sure you want to delete this problem? This action cannot be undone."
        cancel={true}
        onConfirm={() => {
          console.log("delete problem");
          toast.success("Problem deleted successfully!");
          setDeleteModalOpen(false);
          setSettingsOpen(false);
          // navigate to module page
        }}
        confirmText="Delete Problem"
      />

      {/* Top Banner */}
      <div className="w-full h-16 bg-nav-dark flex items-center justify-between px-6 border-b border-b-slate-700">
        <div className="flex items-end">
          <p className="text-base text-slate-400 font-dm dark:text-white">
            {moduleName}
            <span className="text-slate-600">&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
          </p>
          <h1 className="text-white font-dm font-medium text-base">
            {metadataValues.title || "New Problem"}
          </h1>
        </div>
        <div className="flex space-x-2 items-center">
          <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div
                  className="p-2 rounded-md cursor-pointer border border-slate-700 bg-white/5"
                  onClick={() => {
                    setSettingsOpen(!settingsOpen);
                  }}
                >
                  <GearIcon color="white" />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="bottom"
                  sideOffset={5}
                  align="center"
                  className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs font-medium rounded-md p-2`}
                >
                  Settings
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div
                  className="p-2 rounded-md cursor-pointer border border-slate-700 bg-white/5"
                  onClick={() => setPreview(!preview)}
                >
                  {preview ? (
                    <Pencil1Icon color="white" />
                  ) : (
                    <EyeOpenIcon color="white" />
                  )}
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="bottom"
                  sideOffset={5}
                  align="center"
                  className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs font-medium rounded-md p-2`}
                >
                  {preview ? "Edit" : "Preview"}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <button className="px-3 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-dm font-medium text-xs flex items-center space-x-2">
            {problemState?.title ? <CheckCircledIcon /> : <RocketIcon />}
            <p>{problemState?.title ? "Save Changes" : "Publish"}</p>
          </button>
        </div>
      </div>
      {/* Floating */}
      {/* <div className="absolute left-1/2 -translate-x-1/2 bottom-4 opacity-50 hover:opacity-100 transition-opacity rounded-xl bg-nav-darkest border border-slate-700 z-10 space-x-8 shadow-md flex px-6 py-4 items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 font-dm dark:text-white">
            {moduleName}
          </p>
          <h1 className="text-white font-dm font-medium text-xl">
            {problemState.title || "New Problem"}
          </h1>
        </div>
        <div className="flex space-x-2 items-center">
          <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div
                  className="p-2 rounded-md cursor-pointer border border-slate-700 bg-nav-dark"
                  onClick={() => setPreview(!preview)}
                >
                  <GearIcon color="white" />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="bottom"
                  sideOffset={5}
                  align="center"
                  className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs font-medium rounded-md p-2`}
                >
                  Settings
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div
                  className="p-2 rounded-md cursor-pointer border border-slate-700 bg-nav-dark"
                  onClick={() => setPreview(!preview)}
                >
                  {preview ? (
                    <Pencil1Icon color="white" />
                  ) : (
                    <EyeOpenIcon color="white" />
                  )}
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="bottom"
                  sideOffset={5}
                  align="center"
                  className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs font-medium rounded-md p-2`}
                >
                  {preview ? "Edit" : "Preview"}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <button className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-dm font-medium text-xs flex items-center space-x-2">
            <p>{problemState?.title ? "Save Changes" : "Publish"}</p>
          </button>
        </div>
      </div> */}

      <div className="w-full h-full relative">
        {/* <AIChat /> */}
        <Allotment
          sizes={[310, 350]}
          snap={true}
          minSize={400}
          className="code-editor-allotment"
        >
          <div className="flex w-full h-full flex-col">
            {/* <div className="w-full dark:border-b-slate-700 border-b-slate-600 pb-3 border-b pt-4 pl-5 pr-3 dark:bg-nav-darkest bg-nav-dark">
                <p className="text-sm text-slate-400 font-dm dark:text-white">
                  Module Name
                  <span className="text-slate-300 dark:text-slate-400 font-normal truncate">
                    &nbsp;&nbsp;&gt;&nbsp;&nbsp;{problemState.title || "Untitled"}
                  </span>
                </p>
              </div> */}
            <MetadataEditorPane
              preview={preview}
              setPreview={setPreview}
              problemState={problemState}
              dispatch={problemDispatch}
            />
          </div>
          <Allotment sizes={[100, 100]} vertical snap={false} minSize={300}>
            <>
              <CodeEditorPane
                problemState={problemState}
                dispatch={problemDispatch}
              />
            </>
            <>
              <InputOutputEditorPane
                problemState={problemState}
                dispatch={problemDispatch}
              />
            </>
          </Allotment>
        </Allotment>
      </div>
    </div>
  );
};

AdminProblemEditor.getLayout = (page: ReactNode) => (
  <AdminLayout pageTitle="Problem Editor">{page}</AdminLayout>
);

export default AdminProblemEditor;
