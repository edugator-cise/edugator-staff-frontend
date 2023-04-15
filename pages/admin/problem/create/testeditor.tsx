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
import ProblemEditorPane from "components/ProblemEditor/NewEditor/ProblemEditorPane/ProblemEditorPane";
import {
  ProblemAction,
  ProblemData,
} from "components/ProblemEditor/NewEditor/types";
import { getFileExtension } from "components/ProblemEditor/NewEditor/utils";

/* const EditorBlock = dynamic(() => import("components/TestEditor/Editor"), {
  ssr: false,
});
 */
const Allotment = dynamic<AllotmentProps>(
  () => import("allotment").then((mod) => mod.Allotment),
  { ssr: false }
);

const initialProblemState: ProblemData = {
  title: "",
  hidden: false,
  dueDate: new Date().toISOString(),
  description: {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: {
          level: 1,
        },
        content: [
          {
            type: "text",
            text: "Problem Statement",
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Write a program to print 'Hello World'",
          },
        ],
      },
    ],
  }, // assuming Content type is string, otherwise set a default value for Content
  codeData: {
    cpp: {
      solution:
        '#include <iostream>\n\nint main() {\n std::cout << "Hello, world!\\n";\n return 0;\n}',
      body: "#include <iostream>\n\nint main() {\n // TODO: Add code here\n return 0;\n}",
      fileName: `example.${getFileExtension("cpp")}`,
      header: "#ifndef HEADER_H\n#define HEADER_H\n#endif // HEADER_H",
      footer: "#endif // FOOTER_H",
      enabled: false,
    },
    java: {
      solution:
        'public class Main {\n public static void main(String[] args) {\n System.out.println("Hello, world!");\n }\n}',
      body: "public class Main {\n public static void main(String[] args) {\n // TODO: Add code here\n }\n}",
      fileName: `example.${getFileExtension("java")}`,
      header: "public class Header {\n}",
      footer: "}",
      enabled: false,
    },
    python: {
      solution: 'print("Hello, world!")',
      body: "# TODO: Add code here",
      fileName: `example.${getFileExtension("python")}`,
      header: "# Header.py",
      footer: "# Footer.py",
      enabled: false,
    },
  },
  timeLimit: 5,
  memoryLimit: 2048,
  buildCommand: "",
  testCases: [],
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
    case "ADD_LANGUAGE":
      // set language entry in codeData to enabled: true
      console.log(state);
      return {
        ...state,
        codeData: {
          ...state.codeData,
          [action.payload]: {
            ...state.codeData[action.payload],
            enabled: true,
          },
        },
      };
    case "REMOVE_LANGUAGE":
      // set language entry in codeData to enabled: false
      return {
        ...state,
        codeData: {
          ...state.codeData,
          [action.payload]: {
            ...state.codeData[action.payload],
            enabled: false,
          },
        },
      };

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
  const [preview, setPreview] = useState(false);
  const [problemState, problemDispatch] = useReducer(
    problemReducer,
    initialProblemState
  );

  return (
    <div
      className={`w-full h-full dark:bg-nav-darkest relative ${
        preview ? "bg-white" : "bg-slate-100"
      }`}
    >
      <div className="w-full h-full relative">
        {/* <AIChat /> */}
        <Allotment
          sizes={[310, 350]}
          snap={true}
          minSize={400}
          className="code-editor-allotment"
        >
          <div className="flex w-full h-full flex-col">
            <div className="w-full dark:border-b-slate-700 border-b-slate-600 pb-3 border-b pt-4 pl-5 pr-3 dark:bg-nav-darkest bg-nav-dark">
              <p className="text-sm text-slate-400 font-dm dark:text-white">
                Module Name
                <span className="text-slate-300 dark:text-slate-400 font-normal truncate">
                  &nbsp;&nbsp;&gt;&nbsp;&nbsp;{problemState.title || "Untitled"}
                </span>
              </p>
            </div>
            <ProblemEditorPane
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
            <div className="w-full h-full bg-amber-500/10">
              {/* <InputOutputView
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                submissionOutput={submissionOutput}
                stdin={stdin}
                setStdin={setStdin}
                compilerOutput={compilerOutput}
                isAcceptedOutput={isAcceptedOutput}
              /> */}
            </div>
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
