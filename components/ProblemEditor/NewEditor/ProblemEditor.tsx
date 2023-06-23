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
} from "@radix-ui/react-icons";
import { Eye } from "tabler-icons-react";
import * as Tooltip from "@radix-ui/react-tooltip";

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
                  className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs font-medium rounded-md p-2`}
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
                  className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs font-medium rounded-md p-2`}
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
                  className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs font-medium rounded-md p-2`}
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
                  className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs font-medium rounded-md p-2`}
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
