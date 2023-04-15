import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";
import * as Select from "@radix-ui/react-select";

export interface EditorOptions {
  language: string;
  filename: string;
  fileExtension: string;
  header: string;
  body: string;
  footer: string;
  solution: string;
}

const CodeEditorPane = () => {
  const [editorOptions, setEditorOptions] = useState<EditorOptions[]>([]);
  const [languageSelection, setLanguageSelection] = useState<boolean>(true);
  const [languageSelectOpen, setLanguageSelectOpen] = useState<boolean>(false);

  const addEditor = ({ language }: { language: string }) => {
    setEditorOptions((prev) => [
      ...prev,
      {
        language,
        filename: "",
        fileExtension: "",
        header: "",
        body: "",
        footer: "",
        solution: "",
      },
    ]);
  };

  const removeEditor = (index: number) => {
    setEditorOptions((prev) => {
      const newOptions = [...prev];
      newOptions.splice(index, 1);
      if (newOptions.length === 0) {
        setLanguageSelection(true);
      }
      return newOptions;
    });
  };

  const updateEditor = (index: number, options: EditorOptions) => {
    setEditorOptions((prev) => {
      const newOptions = [...prev];
      newOptions[index] = options;
      return newOptions;
    });
  };

  return (
    <div className={`w-full h-full bg-slate-100 flex flex-col justify-start`}>
      <div className="w-full dark:border-b-slate-700 border-b-slate-600 border-b px-5 dark:bg-nav-darkest bg-nav-dark justify-between flex items-center">
        <p className="text-sm text-slate-300 font-dm dark:text-white pt-4 pb-3">
          Code Editor
        </p>
        {editorOptions.length > 0 ? (
          <div className="flex items-center space-x-2">
            <p className="text-white/80 text-sm font-dm">Select a language: </p>
            <Select.Root
              open={languageSelectOpen}
              onOpenChange={(open) => setLanguageSelectOpen(open)}
            >
              <Select.Trigger
                aria-label="Select a language"
                className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] bg-white shadow-black/10 hover:bg-white/80 data-[placeholder]:text-violet9 outline-none"
              >
                <p className="text-nav-darkest text-sm font-dm">C++</p>
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
                    {editorOptions.map((editor, index) => (
                      <Select.Item
                        key={index}
                        className="text-sm leading-none rounded-sm font-dm flex items-center h-6 pr-9 pl-6 relative select-none data-[highlighted]:outline-none data-[highlighted]:bg-blue-500 data-[highlighted]:text-blue-50"
                        value={editor.language}
                      >
                        <Select.ItemText>{editor.language}</Select.ItemText>
                        <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
                          <CheckIcon />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
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
        className={`w-full h-full flex flex-col ${
          languageSelection ? "justify-center" : "justify-start"
        }`}
      >
        {languageSelection ? (
          <>
            <h1 className="text-center text-xl font-dm font-bold">
              Select a language
            </h1>
            <div className="flex justify-center space-x-4 mt-4 font-dm">
              <button
                onClick={() => {
                  addEditor({ language: "C++" });
                  setLanguageSelection(false);
                }}
                className="bg-blue-500/20 hover:bg-blue-500/10 rounded-md px-4 py-2 text-blue-600 text-sm font-bold"
              >
                C++
              </button>
              <button
                onClick={() => {
                  addEditor({ language: "Python" });
                  setLanguageSelection(false);
                }}
                className="bg-blue-500/20 hover:bg-blue-500/10 rounded-md px-4 py-2 text-blue-600 text-sm font-bold"
              >
                Python
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CodeEditorPane;
