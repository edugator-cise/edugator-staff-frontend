import React, { useCallback, useEffect, useReducer, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  GearIcon,
  EyeOpenIcon,
  Pencil1Icon,
  CheckCircledIcon,
  RocketIcon,
  TrashIcon,
  QuestionMarkIcon,
  QuestionMarkCircledIcon,
  CheckIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import {
  Bold,
  Code,
  H1,
  H2,
  H3,
  Italic,
  List,
  ListNumbers,
  SourceCode,
  Strikethrough,
  Underline as UnderlineIcon,
} from "tabler-icons-react";
import { LessonAction, LessonData } from "./types";
import { Editor, EditorContent, useEditor, BubbleMenu } from "@tiptap/react";

/* TipTap Extensions */
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import { Markdown } from "tiptap-markdown";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import Gapcursor from "@tiptap/extension-gapcursor";
import HardBreak from "@tiptap/extension-hard-break";
import Image from "@tiptap/extension-image";

import { Divider, MenuOption, menuOptions, sampleLessonContent } from "./utils";
import Modal from "components/shared/Modals/Modal";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
  NodeConfig,
} from "@tiptap/react";
import { TrailingNode } from "./Extensions/TrailingNode";
import { MultipleChoice } from "./Extensions/MultipleChoice";
import { MultipleSelect } from "./Extensions/MultipleSelect";
import { toast } from "react-hot-toast";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { useCourseStructure } from "hooks/useNavigation";
import { useCreateLesson } from "hooks/lesson/useCreateLesson";
import { Lesson } from "hooks/lesson/useGetLesson";
import { useRouter } from "next/router";
import { Content } from "@tiptap/react";
import { useUpdateLesson } from "hooks/lesson/useUpdateLesson";

const AdminLessonEditor = ({ lesson }: { lesson?: Lesson }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [disableToolbar, setDisableToolbar] = useState(false);

  const router = useRouter();
  const params = router.query;
  const { moduleName, moduleId } = params;

  /* console.log(lesson); */

  const initialLessonState: LessonData = {
    title: lesson?.title || undefined,
    content: lesson?.content
      ? JSON.parse(lesson?.content as string)
      : undefined,
  };

  function lessonReducer(state: LessonData, action: LessonAction) {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_CONTENT":
        return { ...state, content: action.payload };
      case "RESET_LESSON":
        return initialLessonState;
      default:
        return state;
    }
  }

  useEffect(() => {
    console.log(lesson);
    // empty timeout, see https://github.com/ueberdosis/tiptap/issues/3764
    lessonDispatch({ type: "RESET_LESSON" });
    setTimeout(() => {
      if (lesson?.content)
        editor?.commands.setContent(JSON.parse(lesson?.content as string));
    });
  }, [lesson]);

  const [lessonState, lessonDispatch] = useReducer(
    lessonReducer,
    initialLessonState
  );

  const {
    mutate: updateLesson,
    isLoading: updateLessonLoading,
    isError: updateLessonError,
  } = useUpdateLesson(lesson?.id as string);

  const {
    mutate: createLesson,
    isLoading: createLessonLoading,
    isError: createLessonError,
  } = useCreateLesson(moduleId as string);

  const publishLesson = async () => {
    if (!lessonState.title || lessonState.title === "") {
      toast.error("Please enter a title for the lesson.");
      window.scrollTo(0, 0);
      return;
    } else if (!lessonState.content || lessonState.content === "") {
      toast.error("Please enter content for the lesson.");
      return;
    }
    console.log("creating lesson");
    console.log(lessonState);
    const content = JSON.stringify(lessonState.content);
    // create lesson
    await createLesson({
      title: lessonState.title,
      content: content,
      hidden: false, // TODO: add hidden checkbox
      moduleId: moduleId as string,
    });
  };

  const saveLesson = async () => {
    if (!lessonState.title || lessonState.title === "") {
      toast.error("Please enter a title for the lesson.");
      window.scrollTo(0, 0);
      return;
    } else if (!lessonState.content || lessonState.content === "") {
      toast.error("Please enter content for the lesson.");
      return;
    }
    console.log("updating lesson");
    console.log(lessonState);
    const content = JSON.stringify(lessonState.content);
    // update lesson
    await updateLesson({
      title: lessonState.title,
      content: content,
      hidden: false, // TODO: add hidden checkbox
    });
  };

  const editor = useEditor(
    {
      content: lessonState?.content || undefined,
      onUpdate: ({ editor }) => {
        console.log(editor.getJSON());
        lessonDispatch({
          type: "SET_CONTENT",
          payload: editor.getJSON(),
        });
      },
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
        MultipleChoice,
        MultipleSelect,
        Gapcursor,
        HardBreak,
        Image,
        TrailingNode,
      ],
      // content: lessonState?.content || undefined, //sampleLessonContent,
    }

    //[problemState?.testCases] // dependency change from edit to create
  ) as Editor;

  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [url, setUrl] = useState("");

  // link logic

  const openLinkModal = useCallback(() => {
    console.log(editor.chain().focus());
    setUrl(editor.getAttributes("link").href);
    setLinkModalOpen(true);
  }, [editor]);

  const closeLinkModal = useCallback(() => {
    setLinkModalOpen(false);
    setUrl("");
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    closeLinkModal();
  }, [editor, url, closeLinkModal]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeLinkModal();
  }, [editor, closeLinkModal]);

  // image logic

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="w-full h-full flex flex-col relative bg-white">
      <div className="w-full h-16 bg-nav-dark flex items-center justify-between px-6 border-b border-b-slate-700 z-10">
        <div className="flex items-end">
          <p className="text-base text-slate-400 font-dm">
            {moduleName}
            <span className="text-slate-600">&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
          </p>
          <h1 className="text-white font-dm text-base">
            {lesson?.title || "New Lesson"}
          </h1>
        </div>
        <div className="flex space-x-2 items-center">
          {/* <Tooltip.Provider delayDuration={100}>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div
                  className="p-2 rounded-md cursor-pointer border border-slate-700 bg-white/5"
                  onClick={() => {
                    setSettingsOpen(!settingsOpen);
                  }}
                >
                  <GearIcon color="white" />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="bottom"
                  sideOffset={5}
                  align="center"
                  className={`z-20 TooltipContent data-[side=bottom]:animate-slideDownAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                >
                  Settings
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <div
                  className="p-2 rounded-md cursor-pointer border border-slate-700 bg-white/5"
                  onClick={() => setPreview(!preview)}
                >
                  {preview ? (
                    <Pencil1Icon color="white" />
                  ) : (
                    <EyeOpenIcon color="white" />
                  )}
                </div>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  side="bottom"
                  sideOffset={5}
                  align="center"
                  className={`z-20 TooltipContent data-[side=bottom]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                >
                  {preview ? "Edit" : "Preview"}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider> */}
          {lesson ? (
            <button
              disabled={
                lessonState.title === "" ||
                lessonState.content === "" ||
                !lessonState.title ||
                !lessonState.content ||
                updateLessonLoading
              }
              onClick={async () => {
                console.log(lessonState);
                await saveLesson();
              }}
              className="px-3 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 text-white font-dm text-xs flex items-center space-x-2"
            >
              <CheckCircledIcon />
              <p>Save Changes</p>
            </button>
          ) : (
            <button
              disabled={
                lessonState.title === "" ||
                lessonState.content === "" ||
                !lessonState.title ||
                !lessonState.content ||
                createLessonLoading
              }
              onClick={async () => {
                console.log(lessonState);
                await publishLesson();
              }}
              className="px-3 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 text-white font-dm text-xs flex items-center space-x-2"
            >
              <RocketIcon />
              <p>Publish</p>
            </button>
          )}
        </div>
      </div>
      <div
        className={`w-full p-[10px] bg-slate-700 flex items-center justify-between border-b border-slate-600 transition ${
          disableToolbar
            ? "-translate-y-full !cursor-not-allowed pointer-events-none"
            : ""
        }`}
      >
        <div className="flex flex-wrap gap-2 items-center">
          <Tooltip.Provider delayDuration={400}>
            {menuOptions(
              openLinkModal, // on link click
              addImage // on image click
            ).map((option: MenuOption | Divider, index: number) => {
              // check if option is a divider (if object is empty)
              if (Object.keys(option).length === 0) {
                return (
                  <div key={index} className="w-px h-6 bg-slate-500"></div>
                );
              }
              const menuOption = option as MenuOption;
              return (
                <Tooltip.Root key={index} delayDuration={300}>
                  <Tooltip.Trigger asChild>
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-md cursor-pointer hover:bg-white/20 transition flex items-center justify-center text-slate-100 ${
                        menuOption.active &&
                        menuOption.active(editor) &&
                        "bg-white/20"
                      }`}
                      onClick={() => {
                        menuOption.command(editor);
                      }}
                    >
                      {menuOption.icon}
                    </div>
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
        {/* <button className="px-3 py-2 rounded-sm bg-blue-500 hover:bg-blue-600 text-white font-dm text-xs flex items-center space-x-2">
                <EyeOpenIcon />
                <p>Preview</p>
              </button> */}
      </div>
      <div className="w-full h-full flex flex-col justify-start items-center overflow-auto bg-white">
        <div className="max-w-4xl mt-14 w-[90%] h-auto flex flex-col py-4 bg-white space-y-4">
          <div className="flex flex-col space-y-1">
            <input
              type="text"
              id="problem-title"
              className="w-full px-6 py-2 text-3xl rounded-md font-bold bg-white !text-slate-800 font-dm outline-none"
              autoComplete="off"
              onFocus={() => setDisableToolbar(true)}
              onBlur={() => setDisableToolbar(false)}
              placeholder="Lesson Title"
              value={lessonState.title}
              onChange={(e) => {
                lessonDispatch({
                  type: "SET_TITLE",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <div className="h-auto w-full text-slate-800">
            {/* Bubble Menu (Only for Links for now) */}
            <BubbleMenu
              className="p-2 bg-slate-700 rounded-md flex space-x-2 font-dm"
              tippyOptions={{ duration: 150 }}
              editor={editor}
              shouldShow={({ editor, view, state, oldState, from, to }) => {
                // only show the bubble menu for links.
                return from === to && editor.isActive("link");
              }}
            >
              <button
                className="rounded-sm px-3 py-2 z-10 text-xs bg-slate-50 hover:bg-slate-200 transition text-slate-700"
                onClick={openLinkModal}
              >
                Edit
              </button>
              <button
                className="rounded-sm transition bg-red-200 hover:bg-red-500 text-red-500 hover:text-white p-2 flex items-center justify-center"
                onClick={removeLink}
              >
                <TrashIcon />
              </button>
            </BubbleMenu>
            <EditorContent
              onFocus={() => setDisableToolbar(false)}
              className="!prose-lime px-6 pb-6 h-auto prose-a:!text-blue-400 prose-a:underline prose-sm prose-pre:bg-nav-dark prose-pre:text-white !list-inside !list-disc prose-headings:font-dm prose-h1:!my-4 prose-h2:!my-4 prose-h3:!my-4 prose-h3:!text-lg prose-h3:!font-dm prose-h1:text-2xl prose-h1:font-semibold prose-h2:!text-xl prose-h2:!font-semibold prose-headings:!my-0 !outline-none"
              editor={editor}
            />
          </div>
        </div>
      </div>
      <Modal
        open={linkModalOpen}
        setOpen={setLinkModalOpen}
        title="Edit Link"
        description="Insert a link to an external website."
        overlayClassName="!z-[10000]"
        contentClassName="!z-[10001]"
      >
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            className="w-full py-2 text-base rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex space-x-2 justify-end items-center">
            <button
              className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-dm text-sm flex items-center space-x-2"
              onClick={removeLink}
            >
              <p>Remove</p>
            </button>
            <button
              className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-dm text-sm flex items-center space-x-2"
              onClick={saveLink}
            >
              <CheckCircledIcon />
              <p>Save</p>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminLessonEditor;
