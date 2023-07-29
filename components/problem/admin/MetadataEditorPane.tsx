import React, { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import {
  useEditor,
  EditorContent,
  Editor,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import { Markdown } from "tiptap-markdown";
import { mergeAttributes, Node, Content } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import {
  H1,
  H2,
  Bold,
  Italic,
  Strikethrough,
  Code,
  SourceCode,
  List,
  ListNumbers,
  Underline as UnderlineIcon,
} from "tabler-icons-react";
import { ProblemAction } from "./types";
import { JSONContent } from "@tiptap/react";
import {
  menuOptions,
  processProblemStatement,
  sampleEditorContent,
} from "./utils";
import { Extensions } from "@tiptap/react";
import { Problem } from "hooks/problem/useGetProblem";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Divider, MenuOption } from "components/lesson/admin/utils";

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full gap-2 rounded-t-md bg-slate-700 text-white flex flex-wrap p-2 items-center">
      <Tooltip.Provider delayDuration={400}>
        {menuOptions().map((option: MenuOption | Divider, index: number) => {
          // check if option is a divider (if object is empty)
          if (Object.keys(option).length === 0) {
            return <div key={index} className="w-px h-6 bg-slate-500"></div>;
          }
          const menuOption = option as MenuOption;
          return (
            <Tooltip.Root key={index} delayDuration={300}>
              <Tooltip.Trigger asChild>
                <button
                  key={index}
                  className={`w-8 h-8 rounded-md cursor-pointer relative after:w-full after:hover:bg-white/10 after:transition after:scale-75 after:hover:scale-100 after:rounded-md after:absolute after:h-full transition flex items-center justify-center text-slate-100 ${
                    menuOption.active &&
                    menuOption.active(editor) &&
                    "bg-white/20"
                  } `}
                  onClick={() => {
                    menuOption.command(editor);
                  }}
                >
                  {menuOption.icon}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="bottom"
                  sideOffset={5}
                  align="center"
                  className={`z-20 data-[side=bottom]:animate-fadeIn bg-gray-800 border border-slate-500 text-white font-dm text-xs rounded-md p-2`}
                >
                  {menuOption.title}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          );
        })}
      </Tooltip.Provider>
    </div>
  );
};

const MetadataEditorPane = ({
  problemState,
  dispatch,
}: {
  problemState: Problem;
  dispatch: React.Dispatch<ProblemAction>;
}) => {
  console.log(problemState);
  /* const editorContent =
    typeof problemState?.statement === "string"
      ? problemState?.statement
      : typeof problemState?.statement === "undefined"
      ? sampleEditorContent
      : (JSON.parse(
          problemState?.statement as unknown as string
        ) as JSONContent); */

  const content = processProblemStatement(problemState?.statement);

  const editor = useEditor({
    onUpdate: ({ editor }) => {
      dispatch({
        type: "SET_STATEMENT",
        payload: editor.getJSON(),
      });
    },
    editorProps: {
      attributes: {
        class: "!outline-none p-3",
      },
    },
    extensions: [
      Superscript,
      Subscript,
      Underline,
      Markdown,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal",
        },
      }),
    ],
    content: content,
  });

  return (
    <div className={`w-full h-auto p-4 overflow-y-scroll scroll bg-slate-100`}>
      <div className="h-auto w-full flex flex-col space-y-4">
        {/* <div className={`flex w-full items-center justify-center`}>
              <h1 className="text-xl text-left w-full font-dm font-bold">
                Problem Metadata
              </h1>
            </div> */}
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="problem-title"
            className="text-xs text-slate-800 font-dm"
          >
            Problem Title
          </label>
          <input
            type="text"
            id="problem-title"
            className="w-full py-2 text-lg rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
            placeholder="Sum of Two Numbers"
            value={problemState?.title}
            onChange={(e) => {
              dispatch({
                type: "SET_TITLE",
                payload: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="problem-description"
            className="text-xs text-slate-800 font-dm"
          >
            Problem Description
          </label>
          <div className="w-full flex flex-col">
            {editor && <MenuBar editor={editor} />}
            <div className="w-full rounded-b-md border-[2px] border-t-0 overflow-hidden border-slate-600 bg-white text-slate-800 outline-none">
              <EditorContent
                className="prose-sm prose-p:tracking-[-0.010em] text-slate-800 font-sans prose-pre:bg-nav-dark prose-pre:text-white !list-inside !list-disc
                prose-headings:font-sans prose-h1:!text-base prose-h1:!font-semibold prose-h2:!text-sm prose-h2:!font-semibold !outline-none prose-code:p-[0.125rem] prose-code:bg-slate-100 
                prose-code:border-slate-300 prose-code:border prose-code:rounded-[4px]"
                editor={editor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataEditorPane;
