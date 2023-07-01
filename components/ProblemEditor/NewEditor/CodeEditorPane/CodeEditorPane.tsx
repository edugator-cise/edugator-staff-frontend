import {
  ArrowLeftIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import * as Select from "@radix-ui/react-select";
import { getFileExtension } from "../utils";
import { Language, LanguageData, ProblemAction, ProblemData } from "../types";
import Editor from "@monaco-editor/react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { toTitleCase } from "utils/textUtils";

const languageLabels: { [key in Language]: string } = {
  cpp: "C++",
  java: "Java",
  python: "Python",
};

type EditorTab = "body" | "solution" | "footer" | "header";

type TabState = {
  id: string;
  value: string;
  type: EditorTab;
  language: Language;
};

const CodeEditorPane = ({
  problemState,
  dispatch,
}: {
  problemState: ProblemData;
  dispatch: React.Dispatch<ProblemAction>;
}) => {
  const [activeLanguage, setActiveLanguage] = useState<Language>("cpp"); // active language - TODO - SET THIS TO COURSE LANGUAGE
  const [editorLanguage, setEditorLanguage] = useState<Language>(); // language for editor
  const [activeTab, setActiveTab] = useState(0);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const tabStates: Record<Language, TabState[]> = {
    // we define a list of tabs for each language. This is handled by Editor via the path prop
    python: [
      {
        id: "py-header",
        type: "header",
        language: "python",
        value: problemState?.codeData?.header as string,
      },
      {
        id: "py-body",
        type: "body",
        language: "python",
        value: problemState?.codeData?.body as string,
      },
      {
        id: "py-footer",
        type: "footer",
        language: "python",
        value: problemState?.codeData?.footer as string,
      },
      {
        id: "py-solution",
        type: "solution",
        language: "python",
        value: problemState?.codeData?.solution as string,
      },
    ],
    cpp: [
      {
        id: "cpp-header",
        type: "header",
        language: "cpp",
        value: problemState?.codeData?.header as string,
      },

      {
        id: "cpp-body",
        type: "body",
        language: "cpp",
        value: problemState?.codeData?.body as string,
      },
      {
        id: "cpp-footer",
        type: "footer",
        language: "cpp",
        value: problemState?.codeData?.footer as string,
      },
      {
        id: "cpp-solution",
        type: "solution",
        language: "cpp",
        value: problemState?.codeData?.solution as string,
      },
    ],
    java: [
      {
        id: "java-header",
        type: "header",
        language: "java",
        value: problemState?.codeData?.header as string,
      },

      {
        id: "java-body",
        type: "body",
        language: "java",
        value: problemState?.codeData?.body as string,
      },
      {
        id: "java-footer",
        type: "footer",
        language: "java",
        value: problemState?.codeData?.footer as string,
      },
      {
        id: "java-solution",
        type: "solution",
        language: "java",
        value: problemState?.codeData?.solution as string,
      },
    ],
  };

  const beforeMount = (monaco: any) => {
    // before mount, we want to populate the editor with the previously entered code data
    for (const tabState of tabStates[problemState?.language as Language]) {
      tabState.value = problemState?.codeData?.[tabState.type] as string;
    }

    setEditorLanguage(activeLanguage as Language);
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={`w-full h-full bg-slate-100 flex flex-col justify-start`}>
      <div className={`w-full h-full flex flex-col p-4 justify-start`}>
        <div className="h-full w-full flex flex-col space-y-4">
          <h1 className="text-lg font-dm font-medium text-slate-800">
            Code Configuration ({languageLabels[activeLanguage as Language]})
          </h1>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="filename"
              className="text-xs text-slate-800 font-dm"
            >
              File Name
            </label>
            <input
              type="text"
              id="filename"
              className="w-fit py-2 text-base rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
              placeholder={`example.${getFileExtension(
                activeLanguage as Language
              )}`}
              value={problemState?.codeData?.fileName}
              onChange={(e) => {
                dispatch({
                  type: "SET_LANGUAGE_DATA",
                  payload: {
                    language: activeLanguage as Language,
                    data: {
                      ...(problemState?.codeData as LanguageData),
                      fileName: e.target.value,
                    },
                  },
                });
              }}
            />
          </div>
          <div className="flex space-x-2">
            {tabStates[activeLanguage as Language]?.map((tab, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    handleTabClick(index);
                  }}
                  className={`${
                    activeTab === index
                      ? "bg-mirage-500/[15%] ring-1 ring-mirage-500/30 text-mirage-900"
                      : "text-nav-dark hover:bg-mirage-500/5"
                  } rounded-t-sm px-4 py-2 flex space-x-2 items-center transition`}
                >
                  <p className="text-xs font-dm">{toTitleCase(tab.type)}</p>
                </button>
              );
            })}
          </div>

          <div className="w-full h-full flex justify-start items-start !mt-0">
            <Editor
              theme={"light"}
              className={`rounded-md overflow-hidden ring-1 ring-slate-300 transition ${
                activeTab === 0 ? "rounded-tl-none" : "rounded-tl-md"
              }`}
              height="99%"
              beforeMount={beforeMount}
              language={editorLanguage}
              defaultValue={
                tabStates[activeLanguage as Language][activeTab].value
              }
              value={tabStates[activeLanguage as Language][activeTab].value}
              onChange={(value) => {
                // dispatch
                dispatch({
                  type: "SET_LANGUAGE_DATA",
                  payload: {
                    language: activeLanguage as Language,
                    data: {
                      ...(problemState?.codeData as LanguageData),
                      [tabStates[activeLanguage as Language][activeTab].type]:
                        value,
                    },
                  },
                });
              }}
              path={tabStates[activeLanguage as Language][activeTab].id}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
              onMount={handleEditorMount}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPane;
