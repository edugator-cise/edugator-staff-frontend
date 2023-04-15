import React, { ReactNode, useEffect, useRef, useState } from "react";
import "allotment/dist/style.css";
import dynamic from "next/dynamic";
import { AllotmentProps } from "allotment";
import {
  ChevronDownIcon,
  CodeIcon,
  EyeOpenIcon,
  FontBoldIcon,
  FontItalicIcon,
  HeadingIcon,
  Pencil2Icon,
  PlusIcon,
  StrikethroughIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import AnimateHeight from "react-animate-height";
import { toTitleCase } from "utils/textUtils";
import AdminLayout from "components/AdminLayout/AdminLayout";
import { OutputData } from "@editorjs/editorjs";
import EditorJsRenderer from "components/TestEditor/EditorJsRenderer";
import {
  useEditor,
  EditorContent,
  Editor,
  NodeViewWrapper,
  NodeViewContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Bold,
  Italic,
  Strikethrough,
  Code,
  SourceCode,
  List,
  ListNumbers,
  Underline,
} from "tabler-icons-react";
import CodeEditorPane from "components/ProblemEditor/NewEditor/CodeEditorPane/CodeEditorPane";

/* const EditorBlock = dynamic(() => import("components/TestEditor/Editor"), {
  ssr: false,
});
 */
const Allotment = dynamic<AllotmentProps>(
  () => import("allotment").then((mod) => mod.Allotment),
  { ssr: false }
);

const MultipleChoiceNode = Node.create({
  name: "multipleChoice",

  group: "block",

  content: "inline*",

  draggable: true,

  parseHTML() {
    return [
      {
        tag: "multiple-choice",
      },
    ];
  },

  // question and 4 answer options
  addAttributes() {
    return {
      question: {
        default: "This is a question",
      },
      answerOptions: {
        default: [
          { text: "This is an answer option", correct: false },
          { text: "This is an answer option", correct: true },
          { text: "This is an answer option", correct: false },
          { text: "This is an answer option", correct: false },
        ],
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return ["multiple-choice", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MultipleChoiceComponent);
  },
});

const MultipleChoiceComponent = (props: {
  node: any;
  updateAttributes: any;
  getPos: any;
}) => {
  const updateAnswerOption = (
    index: number,
    text: string,
    correct: boolean
  ) => {
    const answerOptions = [...props.node.attrs.answerOptions];
    answerOptions[index] = { text, correct };
    props.updateAttributes({ answerOptions });
  };

  const addAnswerOption = () => {
    const answerOptions = [...props.node.attrs.answerOptions];
    answerOptions.push({ text: "This is an answer option", correct: false });
    props.updateAttributes({ answerOptions });
  };

  const removeAnswerOption = (index: number) => {
    const answerOptions = [...props.node.attrs.answerOptions];
    answerOptions.splice(index, 1);
    props.updateAttributes({ answerOptions });
  };

  const updateQuestion = (text: string) => {
    props.updateAttributes({ question: text });
  };

  return (
    <NodeViewWrapper className="bg-blue-100 border-[3px] border-black rounded-md mt-4 relative px-4 flex flex-col">
      <span
        className="text-xs tracking-widest font-bold font-dm uppercase text-white w-fit bg-black rounded-br-md rounded-bl-md px-2 py-1"
        contentEditable={false}
      >
        Multiple Choice
      </span>

      <div className="flex flex-col space-y-4 py-4" contentEditable={false}>
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-bold" contentEditable={false}>
            Question
          </span>
          <div className="bg-white rounded-md p-2">
            <input
              type="text"
              value={props.node.attrs.question}
              onChange={(e) => updateQuestion(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-bold" contentEditable={false}>
            Answer Options
          </span>
          {props.node.attrs.answerOptions.map(
            (answerOption: any, index: number) => (
              <NodeViewContent>
                <div className="border-2 border-dashed border-blue-500/60 rounded-md p-2 flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={answerOption.correct}
                      onChange={(e) =>
                        updateAnswerOption(
                          index,
                          answerOption.text,
                          e.target.checked
                        )
                      }
                    />
                    <span className="text-sm font-bold" contentEditable={false}>
                      Correct
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={answerOption.text}
                      onChange={(e) =>
                        updateAnswerOption(
                          index,
                          e.target.value,
                          answerOption.correct
                        )
                      }
                      className="w-full bg-transparent border-none focus:outline-none"
                    />
                    <button
                      onClick={() => removeAnswerOption(index)}
                      className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/20 mr-1"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </NodeViewContent>
            )
          )}
          <button
            onClick={addAnswerOption}
            contentEditable={false}
            className="w-full bg-white rounded-md p-2 flex items-center justify-center space-x-2"
          >
            <PlusIcon />
            <span className="text-sm font-bold">Add Answer Option</span>
          </button>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full rounded-t-md bg-nav-dark text-white flex flex-wrap p-2 items-center">
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
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1`}
      >
        <H1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/20 mr-1`}
      >
        <H2 size={18} />
      </button>
      <div className="w-px h-6 bg-white/40 mr-2" />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
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

const AdminProblemEditor = () => {
  const [preview, setPreview] = useState(false);
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState<OutputData>();

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "!outline-none p-3",
      },
    },
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      MultipleChoiceNode,
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: {
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
        {
          type: "multipleChoice",
          attrs: {
            question: "What is the capital of India?",
            answerOptions: [
              {
                text: "Delhi",
                correct: true,
              },
              {
                text: "Mumbai",
                correct: false,
              },
              {
                text: "Kolkata",
                correct: false,
              },
              {
                text: "Chennai",
                correct: false,
              },
            ],
          },
        },
      ],
      /* content: [
        {
          type: "multipleChoice",
          attrs: {
            question: "What is the capital of India?",
            answerOptions: [
              {
                text: "Delhi",
                correct: true,
              },
              {
                text: "Mumbai",
                correct: false,
              },
              {
                text: "Kolkata",
                correct: false,
              },
              {
                text: "Chennai",
                correct: false,
              },
            ],
          },
        },
      ], */
    },
  });

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
                  &nbsp;&nbsp;&gt;&nbsp;&nbsp;{problemTitle || "Untitled"}
                </span>
              </p>
            </div>
            <div
              className={`w-full h-auto dark:bg-nav-darkest p-4 overflow-y-scroll ${
                preview ? "bg-white" : "bg-slate-100"
              }`}
            >
              <div className="h-auto w-full flex flex-col space-y-4">
                {preview ? (
                  <>
                    <h1 className="text-3xl font-ambit underline decoration-emerald-500 underline-offset-4 font-semibold text-slate-900 dark:text-slate-100 mb-4 mt-8">
                      {problemTitle}
                    </h1>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="problem-title"
                        className="text-sm text-slate-800 dark:text-white font-dm font-medium"
                      >
                        Problem Title
                      </label>
                      <input
                        type="text"
                        id="problem-title"
                        className="w-full h-14 text-xl rounded-md border border-slate-300 dark:border-slate-700 dark:bg-nav-darkest bg-white dark:text-white text-slate-800 px-3 font-dm font-medium outline-none"
                        placeholder="Untitled"
                        value={problemTitle}
                        onChange={(e) => setProblemTitle(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label
                        htmlFor="problem-description"
                        className="text-sm text-slate-800 dark:text-white font-dm font-medium"
                      >
                        Problem Description
                      </label>
                      <div className="w-full flex flex-col">
                        {editor && <MenuBar editor={editor} />}
                        <div className="w-full rounded-b-md border-[3px] border-t-0 overflow-hidden border-nav-dark dark:border-slate-700 dark:bg-nav-darkest bg-white dark:text-white text-slate-800 outline-none">
                          {/* <EditorBlock
                          data={problemDescription}
                          onChange={setProblemDescription}
                          holder="editorjs-container"
                        /> */}
                          <EditorContent
                            className="prose-sm prose-pre:bg-nav-dark dark:prose-pre:bg-slate-700 prose-pre:text-white
                             prose-headings:font-dm prose-h1:text-xl prose-h1:font-bold prose-h2:!text-base prose-h2:font-bold p-3 !outline-none "
                            editor={editor}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="w-full flex items-center justify-end sticky bottom-0">
                  <button
                    onClick={() => setPreview(!preview)}
                    className="px-6 h-12 rounded-md bg-slate-800 hover:bg-slate-900 text-white font-dm font-medium text-sm flex items-center space-x-2"
                  >
                    {preview ? (
                      <Pencil2Icon className="w-5 h-5" />
                    ) : (
                      <EyeOpenIcon className="w-5 h-5" />
                    )}
                    <p>{preview ? "Edit" : "Preview"}</p>
                  </button>
                </div>
                {/* <ProblemView
                  problemTitle={currentProblem?.title}
                  problemStatement={currentProblem?.statement}
                /> */}
              </div>
            </div>
          </div>
          <Allotment sizes={[100, 100]} vertical snap={false} minSize={300}>
            <>
              <CodeEditorPane />
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
