import { Lesson } from "hooks/lesson/useGetLesson";
import React from "react";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import { Underline } from "@tiptap/extension-underline";
import { Typography } from "@tiptap/extension-typography";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Markdown } from "tiptap-markdown";
import { Placeholder } from "@tiptap/extension-placeholder";
import { ListItem } from "@tiptap/extension-list-item";
import { BulletList } from "@tiptap/extension-bullet-list";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextStyle } from "@tiptap/extension-text-style";
import { MultipleChoice } from "../admin/Extensions/MultipleChoice";
import { MultipleSelect } from "../admin/Extensions/MultipleSelect";
import { TrailingNode } from "../admin/Extensions/TrailingNode";

const LessonView = ({ lesson }: { lesson: Lesson }) => {
  const editor = useEditor({
    editable: false,
    content: lesson?.content ? JSON.parse(lesson?.content as string) : "",
    editorProps: {
      attributes: {
        class: "!outline-none",
      },
    },
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      // MultipleChoiceNode,
      Underline,
      Markdown.configure({
        transformPastedText: true,
        transformCopiedText: true,
      }),
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
      Superscript,
      Subscript,
      Link.configure({
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          // Allow search engines to follow links(remove nofollow)
          rel: "noopener noreferrer",
          // Remove target entirely so links open in current tab
          target: null,
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Heading";
          }
          if (node.type.name === "paragraph") {
            return "Start writing...";
          }
          return "";
        },
      }),
      Typography,
      MultipleChoice.configure({
        isStudentView: true,
      }),
      MultipleSelect.configure({
        isStudentView: true,
      }),
      Gapcursor,
      HardBreak,
      Image,
      TrailingNode,
    ],
  }) as Editor;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-3">
      <div className="absolute inset-0 w-full h-full"></div>
      <div className="z-10 h-full flex flex-col justify-start items-center overflow-auto bg-white dark:bg-nav-darker/80 border border-slate-300 dark:border-white/10 rounded-md">
        <div
          className={`max-w-4xl w-[90%] mt-14 h-auto flex flex-col py-4 space-y-4`}
        >
          <div className="flex flex-col space-y-1 ">
            <h1 className="w-full px-6 py-2 text-3xl rounded-md font-bold text-slate-800  font-dm outline-none dark:text-white">
              {lesson.title}
            </h1>
          </div>
          <div className="h-auto w-full text-slate-800 dark:text-white">
            <EditorContent
              className="!prose-lime  px-6 pb-6 h-auto transition-non prose-a:!text-sky-500 prose-a:underline  prose-sm prose-pre:bg-nav-dark prose-pre:text-white !list-inside !list-disc prose-headings:font-dm prose-h1:!my-4 prose-h2:!my-4 prose-h3:!my-4 prose-h3:!text-lg prose-h3:!font-dm prose-h1:text-2xl prose-h1:font-semibold prose-h2:!text-xl prose-h2:!font-semibold prose-headings:!my-0 !outline-none"
              editor={editor}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
