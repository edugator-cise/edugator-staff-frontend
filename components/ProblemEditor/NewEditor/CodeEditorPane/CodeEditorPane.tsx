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
  const [languageSelection, setLanguageSelection] = useState<boolean>(true); // page for language selection
  const [languageSelectOpen, setLanguageSelectOpen] = useState<boolean>(false); // dropdown for language selection
  const [activeLanguage, setActiveLanguage] = useState<Language>(); // active language
  const [editorLanguage, setEditorLanguage] = useState<Language>(); // language for editor
  const [activeTab, setActiveTab] = useState(0);

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const tabStates: Record<Language, TabState[]> = {
    python: [
      {
        id: "py-header",
        type: "header",
        language: "python",
        value: problemState?.codeData?.["python"]?.header as string,
      },
      {
        id: "py-footer",
        type: "footer",
        language: "python",
        value: problemState?.codeData?.["python"]?.footer as string,
      },
      {
        id: "py-body",
        type: "body",
        language: "python",
        value: problemState?.codeData?.["python"]?.body as string,
      },
      {
        id: "py-solution",
        type: "solution",
        language: "python",
        value: problemState?.codeData?.["python"]?.solution as string,
      },
    ],
    cpp: [
      {
        id: "cpp-header",
        type: "header",
        language: "cpp",
        value: problemState?.codeData?.["cpp"]?.header as string,
      },
      {
        id: "cpp-footer",
        type: "footer",
        language: "cpp",
        value: problemState?.codeData?.["cpp"]?.footer as string,
      },
      {
        id: "cpp-body",
        type: "body",
        language: "cpp",
        value: problemState?.codeData?.["cpp"]?.body as string,
      },
      {
        id: "cpp-solution",
        type: "solution",
        language: "cpp",
        value: problemState?.codeData?.["cpp"]?.solution as string,
      },
    ],
    java: [
      {
        id: "java-header",
        type: "header",
        language: "java",
        value: problemState?.codeData?.["java"]?.header as string,
      },
      {
        id: "java-footer",
        type: "footer",
        language: "java",
        value: problemState?.codeData?.["java"]?.footer as string,
      },
      {
        id: "java-body",
        type: "body",
        language: "java",
        value: problemState?.codeData?.["java"]?.body as string,
      },
      {
        id: "java-solution",
        type: "solution",
        language: "java",
        value: problemState?.codeData?.["java"]?.solution as string,
      },
    ],
  };
  /* const tabsState: TabState[] = [
    {
      id: "header",
      value: problemState?.codeData?.[activeLanguage as Language]
        ?.header as string,
    },
    {
      id: "footer",
      value: problemState?.codeData?.[activeLanguage as Language]
        ?.footer as string,
    },
    {
      id: "body",
      value: problemState?.codeData?.[activeLanguage as Language]
        ?.body as string,
    },
    {
      id: "solution",
      value: problemState?.codeData?.[activeLanguage as Language]
        ?.solution as string,
    },
  ]; */

  const beforeMount = (monaco: any) => {
    // iterate through tabStates
    for (const language in tabStates) {
      // iterate through each tabState
      for (const tabState of tabStates[language as Language]) {
        // set the value of the tabState
        tabState.value = problemState?.codeData?.[language as Language]?.[
          tabState.type
        ] as string;
      }
    }

    setEditorLanguage(activeLanguage as Language);
  };

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const addEditor = ({ language }: { language: Language }) => {
    dispatch({
      type: "ADD_LANGUAGE",
      payload: language,
    });
  };

  const removeEditor = ({ language }: { language: Language }) => {
    dispatch({
      type: "REMOVE_LANGUAGE",
      payload: language,
    });
  };

  const updateEditor = ({
    language,
    options,
  }: {
    language: Language;
    options: Pick<Record<Language, LanguageData>, Language>;
  }) => {
    dispatch({
      type: "SET_LANGUAGE_DATA",
      payload: {
        language,
        data: options[language],
      },
    });
  };

  return (
    <div className={`w-full h-full bg-slate-100 flex flex-col justify-start`}>
      <div className="w-full dark:border-b-slate-700 border-b-slate-600 border-b px-5 dark:bg-nav-darkest bg-nav-dark justify-between flex items-center">
        <p className="text-sm text-slate-300 font-dm dark:text-white pt-4 pb-3">
          Code Editor
        </p>
        {problemState?.codeData &&
        Object.keys(problemState?.codeData)?.length > 0 ? (
          <div className="flex items-center space-x-2">
            <p className="text-white/80 text-sm font-dm">Select a language: </p>
            <Select.Root
              open={languageSelectOpen}
              onOpenChange={(open) => setLanguageSelectOpen(open)}
              onValueChange={(value) => {
                setActiveLanguage(value as Language);
              }}
            >
              <Select.Trigger
                aria-label="Select a language"
                className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white shadow-black/10 hover:bg-white/80 data-[placeholder]:text-violet9 outline-none"
              >
                <p className="text-nav-darkest text-sm font-dm">
                  {activeLanguage
                    ? activeLanguage
                    : Object.keys(problemState?.codeData)[0]}
                </p>
                <ChevronDownIcon />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  className="overflow-hidden bg-white rounded-md z-50 SelectContent shadow-lg min-w-[100px]"
                  sideOffset={5}
                  side="bottom"
                  position="popper"
                >
                  <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
                    <ChevronUpIcon />
                  </Select.ScrollUpButton>
                  <Select.Viewport className="p-[5px]">
                    {Object.keys(problemState?.codeData)
                      .filter((language) => {
                        return problemState?.codeData[language as Language]
                          ?.enabled;
                      })
                      .map((language, index) => (
                        <Select.Item
                          key={index}
                          className="text-sm leading-none rounded-sm font-dm flex items-center h-6 pr-9 pl-6 relative select-none data-[highlighted]:outline-none data-[highlighted]:bg-blue-500 data-[highlighted]:text-blue-50"
                          value={language}
                        >
                          <Select.ItemText>{language}</Select.ItemText>
                          <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
                            <CheckIcon />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}

                    {Object.keys(problemState?.codeData).filter((language) => {
                      return !problemState?.codeData[language as Language]
                        ?.enabled;
                    }).length === 0 ? (
                      <></>
                    ) : (
                      <>
                        <Select.Separator className="h-px bg-nav-dark/20 my-[5px]" />
                        <button
                          onClick={() => {
                            setLanguageSelection(true);
                            setLanguageSelectOpen(false);
                          }}
                          className="text-sm font-dm text-blue-500 hover:text-blue-600 space-x-2 leading-none rounded-sm flex items-center h-6 pr-9 pl-6 relative select-none data-[highlighted]:outline-none"
                        >
                          <PlusIcon />
                          <p>Add a language</p>
                        </button>
                      </>
                    )}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div
        className={`w-full h-full flex flex-col p-4 ${
          languageSelection ? "justify-center" : "justify-start"
        }`}
      >
        {languageSelection ? (
          <>
            <h1 className="text-center text-xl font-dm font-bold">
              Select languages
            </h1>
            <p className={`text-center text-sm text-slate-600 font-dm mt-2`}>
              You can add more languages at any time
            </p>
            <div className="flex justify-center flex-col space-y-4 mt-4 font-dm items-center">
              {Object.keys(languageLabels).map((language, index) => {
                return (
                  <div className="flex items-center w-64 justify-between">
                    <div className="flex items-center">
                      <Checkbox.Root
                        className="shadow-sm hover:shadow-md transition-shadow flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white "
                        id={language}
                        //checked : codeData has the language enabled
                        checked={
                          problemState?.codeData?.[language as Language]
                            ?.enabled
                        }
                        onCheckedChange={(checked) => {
                          if (checked) {
                            addEditor({
                              language: language as Language,
                            });
                          } else {
                            removeEditor({
                              language: language as Language,
                            });
                          }
                        }}
                      >
                        <Checkbox.Indicator className="text-blue-500">
                          <CheckIcon />
                        </Checkbox.Indicator>
                      </Checkbox.Root>
                      <label
                        className={`pl-[15px] text-[15px] leading-none ${
                          problemState?.codeData?.[language as Language]
                            ?.enabled
                            ? "text-nav-dark"
                            : "text-slate-400"
                        }`}
                        htmlFor={language}
                      >
                        {languageLabels[language as Language]}
                      </label>
                    </div>
                    {/* Configure button */}
                    <button
                      onClick={() => {
                        setLanguageSelection(false);
                        setActiveLanguage(language as Language);
                      }}
                      disabled={
                        !problemState?.codeData?.[language as Language]?.enabled
                      }
                      className="text-blue-600 text-xs uppercase tracking-wide bg-blue-100 enabled:hover:bg-blue-200 rounded-md px-4 py-2 flex space-x-2 items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Configure
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="h-full w-full flex flex-col space-y-4">
            <button
              className="flex items-center space-x-2 text-blue-600"
              onClick={() => {
                setLanguageSelection(true);
              }}
            >
              <ArrowLeftIcon />
              <p className="text-sm font-dm">Back to languages</p>
            </button>
            <h1 className="text-xl font-dm font-bold">
              {languageLabels[activeLanguage as Language]} Configuration
            </h1>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="filename"
                className="text-sm text-slate-800 dark:text-white font-dm font-medium"
              >
                File Name
              </label>
              <input
                type="text"
                id="filename"
                className="w-fit h-12 text-lg rounded-md border border-slate-300 dark:border-slate-700 dark:bg-nav-darkest bg-white dark:text-white text-slate-800 px-3 font-dm font-medium outline-none"
                placeholder={`example.${getFileExtension(
                  activeLanguage as Language
                )}`}
                value={
                  problemState?.codeData[activeLanguage as Language]?.fileName
                }
                onChange={(e) => {
                  dispatch({
                    type: "SET_LANGUAGE_DATA",
                    payload: {
                      language: activeLanguage as Language,
                      data: {
                        ...(problemState?.codeData[
                          activeLanguage as Language
                        ] as LanguageData),
                        fileName: e.target.value,
                      },
                    },
                  });
                }}
              />
            </div>
            <div className="flex space-x-4">
              {tabStates[activeLanguage as Language]?.map((tab, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      handleTabClick(index);
                    }}
                    className={`${
                      activeTab === index
                        ? "bg-nav-dark text-white"
                        : "text-nav-dark hover:bg-nav-dark/10"
                    } rounded-md px-4 py-2 flex space-x-2 items-center`}
                  >
                    <p className="text-sm font-dm">{toTitleCase(tab.type)}</p>
                  </button>
                );
              })}
            </div>
            <Editor
              theme={"light"}
              className="rounded-md overflow-hidden border border-slate-300"
              height="100%"
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
                      ...(problemState?.codeData[
                        activeLanguage as Language
                      ] as LanguageData),
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
        )}
      </div>
    </div>
  );
};

export default CodeEditorPane;
