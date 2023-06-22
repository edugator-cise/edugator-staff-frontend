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
import { getFileExtension } from "components/ProblemEditor/NewEditor/utils";
import InputOutputEditorPane from "components/ProblemEditor/NewEditor/InputOutputEditorPane/InputOutputEditorPane";
import { useSelector } from "react-redux";
import { RootState } from "lib/store/store";

const Allotment = dynamic<AllotmentProps>(
  () => import("allotment").then((mod) => mod.Allotment),
  { ssr: false }
);

const getCodeData: (language: Language) => LanguageData = (
  language: Language
) => {
  if (language === "cpp") {
    return {
      solution:
        '#include <iostream>\n\nint main() {\n std::cout << "Hello, world!\\n";\n return 0;\n}',
      body: "#include <iostream>\n\nint main() {\n // TODO: Add code here\n return 0;\n}",
      fileName: `example.${getFileExtension("cpp")}`,
      header: "#ifndef HEADER_H\n#define HEADER_H\n#endif // HEADER_H",
      footer: "#endif // FOOTER_H",
    } as LanguageData;
  } else if (language === "java") {
    return {
      solution:
        'public class Main {\n public static void main(String[] args) {\n System.out.println("Hello, world!");\n }\n}',
      body: "public class Main {\n public static void main(String[] args) {\n // TODO: Add code here\n }\n}",
      fileName: `example.${getFileExtension("java")}`,
      header: "public class Header {\n}",
      footer: "}",
    } as LanguageData;
  } else if (language === "python") {
    return {
      solution: 'print("Hello, world!")',
      body: "# TODO: Add code here",
      fileName: `example.${getFileExtension("python")}`,
      header: "# Header.py",
      footer: "# Footer.py",
    } as LanguageData;
  } else {
    return {} as LanguageData;
  }
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
      console.log(action.payload);
      return {
        ...state,
        codeData: {
          ...state.codeData,
          [action.payload.language]: action.payload.data,
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
    default:
      return state;
  }
}

const AdminProblemEditor = () => {
  // collect values from global state to pass into form

  // first, module name and id
  const moduleName = useSelector(
    (state: RootState) => state.problemEditorContainer.moduleName
  );
  const moduleId = useSelector(
    (state: RootState) => state.problemEditorContainer.moduleId
  );

  // metadata for title, hidden, dueDate
  const metadataValues = useSelector(
    (state: RootState) => state.problemEditorContainer.metadata
  );

  // now problem data - problemStatement and templatePackage (might need to move templatepackage to codeData)
  const problemDataValues = useSelector(
    (state: RootState) => state.problemEditorContainer.problem
  );

  console.log(problemDataValues);

  // codeData for language, solution, body, fileName, header, footer
  // etc

  const initialProblemState: ProblemData = {
    title: metadataValues.title || undefined,
    hidden: false,
    dueDate: new Date().toISOString(),
    language: "cpp",
    description: problemDataValues?.problemStatement || undefined,
    codeData: getCodeData("cpp"),
    timeLimit: 5,
    memoryLimit: 2048,
    buildCommand: "",
    testCases: [
      {
        input: "1 2",
        expectedOutput: "3",
        hint: "Add the two numbers",
        visibility: TestCaseVisibility.IO_VISIBLE,
      },
    ],
  };

  console.log(metadataValues);

  const [preview, setPreview] = useState(false);
  const [problemState, problemDispatch] = useReducer(
    problemReducer,
    initialProblemState
  );

  return (
    <div
      className={`w-full h-full flex flex-col dark:bg-nav-darkest relative ${
        preview ? "bg-white" : "bg-slate-100"
      }`}
    >
      <div className="absolute left-8 opacity-70 hover:opacity-100 transition-opacity rounded-xl bg-nav-darkest border border-slate-700 z-10 space-x-8 shadow-md top-6 flex px-6 py-4 items-center justify-between">
        <div>
          <p className="text-xs text-slate-400 font-dm dark:text-white">
            {moduleName}
          </p>
          <h1 className="text-white font-dm font-medium text-xl">
            {problemState.title || "New Problem"}
          </h1>
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setPreview(!preview)}
            className="px-6 py-3 rounded-md border border-mirage-500 hover:bg-mirage-600/10 text-white font-dm font-medium text-sm flex items-center space-x-2"
          >
            <p>{preview ? "Edit" : "Preview"}</p>
          </button>
          <button className="px-6 py-3 rounded-md bg-mirage-500 hover:bg-mirage-600 text-white font-dm font-medium text-sm flex items-center space-x-2">
            <p>Publish</p>
          </button>
        </div>
      </div>
      <div className="w-full h-16 bg-nav-darkest flex items-center justify-between px-6 border-b border-b-slate-700">
        <div>
          <p className="text-xs text-slate-400 font-dm dark:text-white">
            {moduleName}
          </p>
          <h1 className="text-white font-dm font-medium text-xl">
            {problemState.title || "New Problem"}
          </h1>
        </div>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setPreview(!preview)}
            className="px-6 py-3 rounded-md border border-mirage-500 hover:bg-mirage-600/10 text-white font-dm font-medium text-sm flex items-center space-x-2"
          >
            <p>{preview ? "Edit" : "Preview"}</p>
          </button>
          <button className="px-6 py-3 rounded-md bg-mirage-500 hover:bg-mirage-600 text-white font-dm font-medium text-sm flex items-center space-x-2">
            <p>Publish</p>
          </button>
        </div>
      </div>
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
