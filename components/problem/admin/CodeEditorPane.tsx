import React, { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { getFileExtension } from "./utils";
import { Language, LanguageData, ProblemAction } from "./types";
import Editor from "@monaco-editor/react";
import { toTitleCase } from "@/lib/textUtils";
import { Problem } from "hooks/problem/useGetProblem";

const languageLabels: { [key in Language]: string } = {
  cpp: "C++",
  java: "Java",
  python: "Python",
};

type EditorTab = "body" | "solution" | "footer" | "header";

const tabMapping: { [key in EditorTab]: string } = {
  body: "codeBody",
  solution: "solution",
  footer: "codeFooter",
  header: "codeHeader",
};

type TabState = {
  id: string;
  value: string;
  type: EditorTab;
  language: Language;
};

const CodeEditorPane = ({
  problemState,
  dispatch,
  problem,
}: {
  problemState: Problem;
  dispatch: React.Dispatch<ProblemAction>;
  problem: Problem;
}) => {
  const [activeLanguage, setActiveLanguage] = useState<Language>("cpp"); // active language - TODO - SET THIS TO COURSE LANGUAGE
  const [editorLanguage, setEditorLanguage] = useState<Language>("cpp"); // language for editor
  const [activeTab, setActiveTab] = useState(0);

  const [tabStates, setTabStates] = useState<TabState[]>([
    {
      id: `cpp-header-${problem?.id}`,
      type: "header",
      language: "cpp",
      value: problemState?.codeHeader as string,
    },

    {
      id: `cpp-body-${problem?.id}`,
      type: "body",
      language: "cpp",
      value: problemState?.codeBody as string,
    },
    {
      id: `cpp-footer-${problem?.id}`,
      type: "footer",
      language: "cpp",
      value: problemState?.codeFooter as string,
    },
    /* {
      id: `cpp-solution-${problem?.id}`,
      type: "solution",
      language: "cpp",
      value: problemState?.solution as string,
    }, */
  ]);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const beforeMount = (monaco: any) => {
    // before mount, we want to populate the editor with the previously entered code data
    for (const tabState of tabStates) {
      setTabStates((prev) => {
        return prev.map((tab) => {
          if (tab.id === tabState.id) {
            return {
              ...tab,
              value: tabState.value,
            };
          }
          return tab;
        });
      });
      // tabState.value = problemState?.[tabState.type] as string;
    }

    //setEditorLanguage(activeLanguage as Language);
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
            Code Configuration
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
              value={problemState?.fileName}
              onChange={(e) => {
                dispatch({
                  type: "SET_FILE_NAME",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex space-x-2">
            {tabStates.map((tab, index) => {
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
              value={
                problemState?.[
                  tabMapping[tabStates[activeTab].type] as
                    | "codeBody"
                    | "codeHeader"
                    | "codeFooter"
                ] as any
              }
              onChange={(value) => {
                // dispatch
                dispatch({
                  type: `SET_${tabStates[activeTab].type.toUpperCase()}` as any,
                  payload: value as string,
                });
              }}
              path={tabStates[activeTab].id}
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
