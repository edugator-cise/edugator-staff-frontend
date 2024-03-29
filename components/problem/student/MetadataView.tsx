import React from "react";
import { Content, EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { processProblemStatement, sampleEditorContent } from "../admin/utils";
import StarterKit from "@tiptap/starter-kit";
import { Extensions } from "@tiptap/react";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { Markdown } from "tiptap-markdown";
import Underline from "@tiptap/extension-underline";
import { ThumbDown, ThumbUp } from "tabler-icons-react";
import { Problem } from "hooks/problem/useGetProblem";

const MetadataView = ({ problem }: { problem: Problem }) => {
  // preview editor, not editable and has no toolbar or anything

  // if problem?.statement is undefined, then use empty editor content
  // then, try to parse problem?.statement as JSONContent
  // if that works then use that as editor content
  // if that doesnt work, just use it as a string

  const content = processProblemStatement(problem?.statement);

  const editor = useEditor({
    content: content,
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
    editable: false,
  });

  const formattedDate = new Date(problem?.dueDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full h-full flex flex-col justify-start p-3 pr-[6px] ">
      <div className="h-full w-full flex flex-col justify-start rounded-md shadow-sm overflow-hidden bg-white dark:bg-nav-darker border border-slate-300 dark:border-slate-700">
        <div className="w-full dark:border-b-slate-700 border-b-slate-300 border-b px-4 py-3 dark:bg-nav-darkest bg-slate-100">
          <p className="text-xs text-slate-800 font-dm font-bold dark:text-white">
            Modules
            <span className="text-slate-500 dark:text-slate-400 font-normal truncate">
              &nbsp;&nbsp;&gt;&nbsp;&nbsp;{problem?.moduleName}
            </span>
            <span className="text-slate-500 dark:text-slate-400 font-normal truncate">
              &nbsp;&nbsp;&gt;&nbsp;&nbsp;{problem?.title}
            </span>
          </p>
        </div>
        <div className="overflow-auto h-full w-full flex flex-col space-y-4 p-6">
          <h1 className="text-2xl font-dm font-semibold text-slate-800 dark:text-white underline underline-offset-4 dark:decoration-sky-500 decoration-emerald-500">
            {problem?.title || "New Problem"}
          </h1>
          <div className="flex space-x-2 items-center">
            <div className="py-1 px-3 rounded-full text-xs bg-slate-100 dark:bg-slate-100/20 dark:text-white text-slate-600 w-fit font-dm">
              Due {formattedDate}
            </div>
            <div className="p-1 rounded-full relative before:inset-0 before:z-0 !z-10 before:rounded-full before:w-full before:h-full before:absolute before:scale-75 before:hover:scale-100 before:hover:bg-red-500/20  before:transition cursor-pointer">
              <ThumbDown size={16} color="#F87171" />
            </div>
            <div className="p-1 rounded-full relative before:inset-0 before:z-0 !z-10 before:rounded-full before:w-full before:h-full before:absolute before:scale-75 before:hover:scale-100 before:hover:bg-emerald-500/20  before:transition cursor-pointer">
              <ThumbUp size={16} color="#34D399" />
            </div>
          </div>
          <EditorContent
            editor={editor}
            className="prose-sm prose-p:tracking-[-0.010em] dark:text-white text-slate-800 font-sans prose-pre:bg-nav-dark prose-pre:text-white !list-inside !list-disc
        prose-headings:font-sans prose-h1:!text-base prose-h1:!font-semibold prose-h2:!text-sm prose-h2:!font-semibold !outline-none prose-code:p-[0.125rem] prose-code:bg-slate-100 
        dark:prose-code:border-slate-700 dark:prose-code:bg-nav-dark prose-code:border prose-code:rounded-[4px]"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * heading 1: bold large
 * heading 2: bold base
 * heading 3: regular base
 */

export default MetadataView;
