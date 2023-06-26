import React, { useCallback, useReducer, useState } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  GearIcon,
  EyeOpenIcon,
  Pencil1Icon,
  CheckCircledIcon,
  RocketIcon,
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
import { Editor, EditorContent, useEditor } from "@tiptap/react";
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
import { Divider, MenuOption, menuOptions } from "./utils";
import Modal from "components/shared/Modals/Modal";

const AdminLessonEditor = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const moduleName = useSelector(
    (state: RootState) => state.contentEditorPage.moduleName
  );

  const moduleId = useSelector(
    (state: RootState) => state.contentEditorPage.moduleId
  );

  const metadataValues = useSelector(
    (state: RootState) => state.contentEditorPage.metadata
  );

  const lessonContent = useSelector(
    (state: RootState) => state.contentEditorPage.lessonContent
  );

  const initialLessonState: LessonData = {
    title: metadataValues?.title || undefined,
    author: metadataValues?.author || undefined,
    content: lessonContent || undefined,
  };

  function lessonReducer(state: LessonData, action: LessonAction) {
    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
      case "SET_AUTHOR":
        return { ...state, author: action.payload };
      case "SET_CONTENT":
        return { ...state, content: action.payload };
      default:
        return state;
    }
  }

  const [lessonState, lessonDispatch] = useReducer(
    lessonReducer,
    initialLessonState
  );

  const editor = useEditor(
    {
      onUpdate: ({ editor }) => {
        lessonDispatch({
          type: "SET_CONTENT",
          payload: editor.getJSON(),
        });
      },
      editorProps: {
        attributes: {
          class: "!outline-none p-3",
        },
      },
      extensions: [
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        // MultipleChoiceNode,
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
      ],
      content: lessonState?.content || undefined,
    }
    //[problemState?.testCases] // dependency change from edit to create
  ) as Editor;

  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [url, setUrl] = useState("");

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

  return (
    <div className="w-full h-full flex flex-col relative bg-slate-100">
      <div className="w-full h-16 bg-nav-dark flex items-center justify-between px-6 border-b border-b-slate-700">
        <div className="flex items-end">
          <p className="text-base text-slate-400 font-dm">
            {moduleName}
            <span className="text-slate-600">&nbsp;&nbsp;&gt;&nbsp;&nbsp;</span>
          </p>
          <h1 className="text-white font-dm text-base">
            {metadataValues.title || "New Lesson"}
          </h1>
        </div>
        <div className="flex space-x-2 items-center">
          <Tooltip.Provider delayDuration={100}>
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
                  className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                >
                  Settings
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <Tooltip.Provider delayDuration={100}>
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
                  className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                >
                  {preview ? "Edit" : "Preview"}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
          <button
            disabled={!unsavedChanges}
            className="px-3 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-40 text-white font-dm text-xs flex items-center space-x-2"
          >
            {metadataValues?.title ? <CheckCircledIcon /> : <RocketIcon />}
            <p>{metadataValues?.title ? "Save Changes" : "Publish"}</p>
          </button>
        </div>
      </div>
      <div className="w-full h-full flex justify-center items-start">
        <div className="max-w-4xl w-[90%] h-full flex flex-col py-4 bg-slate-100 space-y-4">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="problem-title"
              className="text-xs text-slate-800 font-dm"
            >
              Lesson Title
            </label>
            <input
              type="text"
              id="problem-title"
              className="w-full py-2 text-lg rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
              placeholder="Untitled"
              value={metadataValues?.title}
              onChange={(e) => {
                // dispatch(updateLessonTitle(e.target.value));
              }}
            />
          </div>
          {/* Toolbar */}
          <div className="flex flex-col h-full">
            <div className="w-full p-[10px] rounded-t-md bg-slate-700 flex items-center justify-between ring-1 ring-slate-700">
              <div className="flex flex-wrap gap-2 items-center">
                <Tooltip.Provider delayDuration={0}>
                  {menuOptions(openLinkModal, () => {}).map(
                    (option: MenuOption | Divider, index: number) => {
                      // check if option is a divider (if object is empty)
                      if (Object.keys(option).length === 0) {
                        return (
                          <div
                            key={index}
                            className="w-px h-6 bg-slate-500"
                          ></div>
                        );
                      }
                      const menuOption = option as MenuOption;
                      return (
                        <Tooltip.Root key={index}>
                          <Tooltip.Trigger asChild>
                            <div
                              key={index}
                              className={`w-8 h-8 rounded-sm cursor-pointer hover:bg-white/20 flex items-center justify-center text-slate-100 ${
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
                              side="top"
                              sideOffset={5}
                              align="center"
                              className={`z-20 TooltipContent data-[side=top]:animate-slideDownAndFade bg-gray-800 border border-slate-500 text-white font-dm text-xs rounded-md p-2`}
                            >
                              {menuOption.title}
                            </Tooltip.Content>
                          </Tooltip.Portal>
                        </Tooltip.Root>
                      );
                    }
                  )}
                </Tooltip.Provider>
              </div>
              {/* <button className="px-3 py-2 rounded-sm bg-blue-500 hover:bg-blue-600 text-white font-dm text-xs flex items-center space-x-2">
                <EyeOpenIcon />
                <p>Preview</p>
              </button> */}
            </div>
            <div className="h-full w-full rounded-b-md bg-white ring-1 ring-slate-300 text-slate-800">
              <EditorContent
                className="!prose-lime prose-a:!text-blue-400 prose-a:underline prose-sm prose-pre:bg-nav-dark prose-pre:text-white !list-inside !list-disc prose-headings:font-dm prose-h1:!my-4 prose-h2:!my-4 prose-h3:!my-4 prose-h3:!text-lg prose-h3:!font-dm prose-h1:text-2xl prose-h1:font-semibold prose-h2:!text-xl prose-h2:!font-semibold prose-headings:!my-0 p-2 !outline-none"
                editor={editor}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={linkModalOpen}
        setOpen={setLinkModalOpen}
        title="Edit Link"
        description="Insert a link to an external website."
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
