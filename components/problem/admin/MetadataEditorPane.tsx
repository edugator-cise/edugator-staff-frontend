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
import { sampleEditorContent } from "./utils";
import { Extensions } from "@tiptap/react";
import { Problem } from "hooks/problem/useGetProblem";

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full rounded-t-md bg-slate-700 text-white flex flex-wrap p-2 items-center">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`
          w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1
            ${editor.isActive("bold") ? "bg-white/20" : ""}
          `}
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`
          w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1
            ${editor.isActive("italic") ? "bg-white/20" : ""}
          `}
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1
            ${editor.isActive("underline") ? "bg-white/20" : ""}
          `}
      >
        <UnderlineIcon size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`
          w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1
            ${editor.isActive("strike") ? "bg-white/20" : ""}
          `}
      >
        <Strikethrough size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`
          w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1
            ${editor.isActive("code") ? "bg-white/20" : ""}
          `}
      >
        <Code size={18} />
      </button>
      <div className="w-px h-6 bg-white/40 mr-2" />
      <button
        onClick={() => editor.commands.toggleHeading({ level: 1 })}
        disabled={!editor.can().toggleHeading({ level: 1 })}
        className={`w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1
        ${editor.isActive("heading", { level: 1 }) ? "bg-white/20" : ""}
        `}
      >
        <H1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1
        ${editor.isActive("heading", { level: 2 }) ? "bg-white/20" : ""}
        `}
      >
        <H2 size={18} />
      </button>
      <div className="w-px h-6 bg-white/40 mr-2" />
      <button
        onClick={() => editor.commands.toggleBulletList()}
        disabled={!editor.can().toggleBulletList()}
        className={`
              w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1
                  ${editor.isActive("bulletList") ? "bg-white/20" : ""}
              `}
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={`
              w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1   
                  ${editor.isActive("orderedList") ? "bg-white/20" : ""}
              `}
      >
        <ListNumbers size={18} />
      </button>
      {/* Code block */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor.can().chain().focus().toggleCodeBlock().run()}
        className={`
              w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1
                  ${editor.isActive("codeBlock") ? "bg-white/20" : ""}
              `}
      >
        <SourceCode size={18} />
      </button>
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
    content: problemState?.statement
      ? problemState?.statement
      : sampleEditorContent,
  });

  return (
    <div className={`w-full h-auto p-4 overflow-y-scroll bg-slate-100`}>
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
                className="prose-sm prose-p:tracking-[-0.010em] font-sans prose-pre:bg-nav-dark prose-pre:text-white !list-inside !list-disc
                prose-headings:font-sans prose-h1:!text-base prose-h1:!font-semibold prose-h2:!text-sm prose-h2:!font-semibold !outline-none"
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
