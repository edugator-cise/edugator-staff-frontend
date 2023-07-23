import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Pencil1Icon,
  CheckCircledIcon,
  RocketIcon,
  TrashIcon,
  CheckIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
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

import { Divider, MenuOption, menuOptions, validateLesson } from "./utils";
import Modal from "components/shared/Modals/Modal";
import { TrailingNode } from "./Extensions/TrailingNode";
import { MultipleChoice } from "./Extensions/MultipleChoice";
import { MultipleSelect } from "./Extensions/MultipleSelect";
import { toast } from "react-hot-toast";
import { useCreateLesson } from "hooks/lesson/useCreateLesson";
import { Lesson } from "hooks/lesson/useGetLesson";
import { useRouter } from "next/router";
import { useUpdateLesson } from "hooks/lesson/useUpdateLesson";
import AlertModal from "components/shared/Modals/AlertModal";
import { useQueryClient } from "@tanstack/react-query";
import ActionButton from "components/shared/Buttons/ActionButton";
import { isUrl } from "utils/textUtils";
import { useNavigationConfirmation } from "hooks/shared/useConfirmNavigation";
import { useDeleteLesson } from "hooks/lesson/useDeleteLesson";
import { Trash } from "tabler-icons-react";

export const DeleteLessonModal = ({
  open,
  setOpen,
  removeLesson,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  removeLesson: () => void;
}) => {
  return (
    <AlertModal
      title="Delete Lesson"
      open={open}
      setOpen={setOpen}
      description="Are you sure you want to delete this lesson? This action cannot be undone."
      onCancel={() => {
        setOpen(false);
      }}
      onConfirm={async () => {
        console.log("delete lesson");
        await removeLesson();
      }}
      confirmText="Delete Lesson"
    />
  );
};

const AdminLessonEditor = ({ lesson }: { lesson?: Lesson }) => {
  // MODAL CONTROLS

  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // STATES FOR LINKS

  const [url, setUrl] = useState("");
  const [modalUrl, setModalUrl] = useState("");
  const [modalUrlText, setModalUrlText] = useState("");
  const [editingLink, setEditingLink] = useState(false);

  const [unsavedChanges, setUnsavedChanges] = useState(false); // true when user makes any changes to lesson
  const [disableToolbar, setDisableToolbar] = useState(false); // enable toolbar when user is editing a question
  const [nextUrl, setNextUrl] = useState<null | string>(null); // stores the url to navigate to when user confirms navigation

  const [editable, setEditable] = useState(lesson ? false : true); // whether editor is in preview mode or edit mode

  // QUERY PARAMS

  const router = useRouter();
  const params = router.query;
  const { moduleName, moduleId, lessonId } = params;

  // MUTATORS

  const queryClient = useQueryClient();

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

  const {
    mutate: deleteLesson,
    isLoading: deleteLessonLoading,
    isError: deleteLessonError,
  } = useDeleteLesson();

  const removeLesson = async () => {
    setUnsavedChanges(false);
    await deleteLesson(lessonId as string);
    setDeleteModalOpen(false);
    /* setSettingsOpen(false); */
    // navigate to module page
    router.push(`/admin/dashboard`);
  };

  // REDUCER (for local lesson state)

  const initialLessonState: LessonData = {
    title: lesson?.title || undefined,
    content: lesson?.content
      ? JSON.parse(lesson?.content as string)
      : undefined,
  };

  function lessonReducer(state: LessonData, action: LessonAction) {
    setUnsavedChanges(true);

    switch (action.type) {
      case "SET_TITLE":
        return { ...state, title: action.payload };
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

  // UTIL FUNCTIONS

  // Reset editor content to originally fetched content
  const resetEditor = () => {
    setTimeout(() => {
      if (lesson?.content)
        editor?.commands.setContent(JSON.parse(lesson?.content as string));
    });
  };

  // Toggle editable state of editor
  const toggleEditable = (editable: boolean) => {
    setTimeout(() => {
      setEditable(editable);
      editor?.setOptions({ editable });
    }, 0);
  };

  // Reset editor content to originally fetched content
  const onCancelChanges = () => {
    // set content back to old content
    setConfirmModalOpen(false);
    setTimeout(() => {
      resetEditor();
      toggleEditable(false);
      queryClient.invalidateQueries(["lesson", lessonId]);
    }, 200);
  };

  // Publish a new lesson
  const publishLesson = async () => {
    if (
      !validateLesson(lessonState.content as any, lessonState.title as string)
    ) {
      return;
    }
    const content = JSON.stringify(lessonState.content);
    // create lesson
    await createLesson({
      title: lessonState?.title as string,
      content: content,
      hidden: false, // TODO: add hidden checkbox
      moduleId: moduleId as string,
    });
  };

  // Save changes to existing lesson
  const saveLesson = async () => {
    // check for empty MCQ / MSQ
    if (
      !validateLesson(lessonState.content as any, lessonState.title as string)
    ) {
      return;
    }
    // update lesson
    await updateLesson({
      title: lessonState.title as string,
      content: JSON.stringify(lessonState.content),
      hidden: false, // TODO: add hidden checkbox
    });
  };

  // EDITOR INITIALIZATION

  const editor = useEditor(
    {
      editable: editable,
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
        MultipleChoice.configure({
          isStudentView: !editable,
        }),
        MultipleSelect.configure({
          isStudentView: !editable,
        }),
        Gapcursor,
        HardBreak,
        Image,
        TrailingNode,
      ],
    },
    [editable]
  ) as Editor;

  // Uhhh.. when the url changes in the BubbleMenu, update the url in the modal (for some reason)
  useEffect(() => {
    setModalUrl(url);
  }, [url]);

  // Custom callback function to insert and edit links
  const openLinkModal = useCallback(() => {
    console.log(editor.chain().focus());
    setUrl(editor.getAttributes("link").href);
    // extend selection to whole link, grab url text, then set selection to whole link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .command(({ tr, state }) => {
        console.log(state);
        setModalUrlText(
          state.doc.textBetween(state.selection.from, state.selection.to)
        );
        return true;
      })
      .run();
    setLinkModalOpen(true);
  }, [editor]);

  const closeLinkModal = useCallback(() => {
    setLinkModalOpen(false);
  }, []);

  const saveLink = useCallback(() => {
    if (!isUrl(modalUrl)) {
      toast.error("Please enter a valid URL.");
      return;
    }
    if (!modalUrlText || modalUrlText === "") {
      toast.error("Please enter a link text.");
      return;
    }
    if (modalUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: modalUrl, target: "_blank" })
        .command(({ tr, state }) => {
          console.log(state);
          tr.insertText(modalUrlText);
          return true;
        })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    closeLinkModal();
  }, [editor, modalUrl, closeLinkModal, modalUrlText]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeLinkModal();
  }, [editor, closeLinkModal]);

  const onCancelWithoutChanges = () => {
    console.log("no unsaved changes");
    toggleEditable(false);
    return;
  };

  useEffect(() => {
    if (editor?.isActive("link")) {
      setUrl(editor.getAttributes("link").href);
      let urlText = "";
      // extend selection to whole link, grab url text, then set selection to whole link
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .command(({ tr, state }) => {
          console.log(state);
          urlText = state.doc.textBetween(
            state.selection.from,
            state.selection.to
          );
          return true;
        })
        .setTextSelection({
          from: editor.state.selection.to,
          to: editor.state.selection.to,
        })
        .run();
      setModalUrlText(urlText);
    }
    setEditingLink(false);
  }, [editor?.getAttributes("link").href]);

  // image logic TODO replace with custom callback like with link above
  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // make user confirm navigation if there are unsaved changes

  const {
    confirmModalOpen: confirmNavigationModalOpen,
    handleModalClose: handleConfirmNavigationModalClose,
    setConfirmModalOpen: setConfirmNavigationModalOpen,
  } = useNavigationConfirmation(unsavedChanges, router);

  return (
    <div className="w-full h-full flex flex-col relative bg-white">
      {/* Modal for cancelling changes */}
      <AlertModal
        title="Are you sure?"
        open={confirmModalOpen}
        setOpen={setConfirmModalOpen}
        description="Are you sure you want to cancel? All unsaved changes will be lost."
        onCancel={() => {
          setConfirmModalOpen(false);
        }}
        onConfirm={() => {
          onCancelChanges();
        }}
        confirmText="Confirm"
      />
      {/* Modal for confirming navigation */}
      <AlertModal
        title="Are you sure?"
        open={confirmNavigationModalOpen}
        setOpen={setConfirmNavigationModalOpen}
        description="Are you sure you want to leave? All unsaved changes will be lost."
        onCancel={() => {
          handleConfirmNavigationModalClose(false);
        }}
        onConfirm={() => {
          setConfirmModalOpen(false);
          setTimeout(() => {
            handleConfirmNavigationModalClose(true);
          }, 200);
        }}
        confirmText="Confirm"
      />
      {/* Modal for deleting lesson */}
      <DeleteLessonModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        removeLesson={removeLesson}
      />

      <div
        className="w-full 
      h-16 min-h-[3.5rem] max-h-[3.5rem] bg-nav-dark overflow-hidden flex items-center justify-between px-6 border-b border-b-slate-950 z-10"
      >
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
          {lesson ? (
            <div className="flex space-x-2 items-center">
              {editable ? (
                <>
                  <ActionButton
                    color="gray"
                    onClick={() => {
                      if (!unsavedChanges) {
                        onCancelWithoutChanges();
                        return;
                      }
                      setConfirmModalOpen(true);
                    }}
                  >
                    <Cross2Icon />
                    <p>Discard Changes</p>
                  </ActionButton>

                  <ActionButton
                    color="green"
                    disabled={
                      lessonState.title === "" ||
                      lessonState.content === "" ||
                      !lessonState.title ||
                      !lessonState.content ||
                      updateLessonLoading ||
                      !editable ||
                      !unsavedChanges
                    }
                    onClick={async () => {
                      console.log(lessonState);
                      await saveLesson();
                    }}
                  >
                    <CheckCircledIcon />
                    <p>Save Changes</p>
                  </ActionButton>
                  <Tooltip.Provider delayDuration={100}>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <div className="w-fit">
                          <ActionButton
                            disabled={deleteLessonLoading}
                            color="red"
                            onClick={() => setDeleteModalOpen(true)}
                            className="!px-2"
                          >
                            <Trash className="w-4 h-4" strokeWidth={1.5} />
                          </ActionButton>
                        </div>
                      </Tooltip.Trigger>
                      <Tooltip.Portal>
                        <Tooltip.Content
                          side="bottom"
                          sideOffset={5}
                          align="center"
                          className={`z-20 TooltipContent data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade bg-gray-800 text-white font-dm text-xs rounded-md p-2`}
                        >
                          Delete Lesson
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </>
              ) : (
                <>
                  <ActionButton
                    color="blue"
                    onClick={() => {
                      toggleEditable(true);
                    }}
                  >
                    <Pencil1Icon />
                    <p>Edit</p>
                  </ActionButton>
                </>
              )}
            </div>
          ) : (
            <ActionButton
              color="green"
              disabled={
                lessonState.title === "" ||
                lessonState.content === "" ||
                !lessonState.title ||
                !lessonState.content ||
                createLessonLoading
              }
              onClick={async () => {
                console.log(lessonState);
                setUnsavedChanges(false);
                await publishLesson();
              }}
            >
              <RocketIcon />
              <p>Publish</p>
            </ActionButton>
          )}
        </div>
      </div>
      <div
        className={`w-full p-[10px] bg-slate-700 flex items-center justify-between border-b border-b-slate-400 border-t border-t-slate-600 transition-all ${
          !editable ? "-mt-[54px] !cursor-not-allowed pointer-events-none" : ""
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
                    <button
                      key={index}
                      className={`w-8 h-8 rounded-md cursor-pointer relative after:w-full after:hover:bg-white/10 after:transition after:scale-75 after:hover:scale-100 after:rounded-md after:absolute after:h-full transition flex items-center justify-center text-slate-100 ${
                        menuOption.active &&
                        menuOption.active(editor) &&
                        "bg-white/20"
                      } ${
                        disableToolbar &&
                        "opacity-50 cursor-not-allowed pointer-events-none"
                      }`}
                      onClick={() => {
                        if (disableToolbar) return;
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
        {/* <button className="px-3 py-2 rounded-sm bg-blue-500 hover:bg-blue-600 text-white font-dm text-xs flex items-center space-x-2">
                <EyeOpenIcon />
                <p>Preview</p>
              </button> */}
      </div>
      {/* Surrounding Border */}
      <div className="w-full h-full flex flex-col justify-center items-center bg-[#d3d9df] dark:bg-slate-950 p-3">
        {/* Editor and Title Holder ("Page") */}
        <div className="w-full h-full min-h-full max-h-[200px] !overflow-y-scroll flex flex-col justify-start items-center bg-white dark:bg-nav-darker border border-slate-300 dark:border-slate-800 rounded-md">
          <div
            className={`max-w-4xl w-[90%] h-full mt-14 flex flex-col py-4 space-y-4 transition-all`}
          >
            <div className="flex flex-col space-y-1">
              <input
                type="text"
                id="problem-title"
                className="w-full px-6 py-2 text-3xl rounded-md font-bold bg-white dark:bg-nav-darker dark:text-white text-slate-800 font-dm outline-none"
                autoComplete="off"
                disabled={!editable}
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

            {/* Bubble Menu (Only for Links for now) */}
            <BubbleMenu
              className="py-1 pr-1 max-h-10 pl-3 ring-slate-300 overflow-hidden items-center bg-slate-800 rounded-md flex space-x-1 font-dm"
              tippyOptions={{
                moveTransition: "transform 0.2s ease-out",
                zIndex: 101,
                duration: 150,
                onClickOutside(instance, event) {
                  instance.hide();
                  //clear url, set editing link to false, and close the instance
                  setTimeout(() => {
                    setUrl(editor?.getAttributes("link").href);
                  }, 300);
                  setEditingLink(false);
                },
              }}
              editor={editor}
              shouldShow={({ editor, view, state, oldState, from, to }) => {
                // only show the bubble menu for links.
                if (!editor || !editable) return false;
                return from === to && editor.isActive("link");
              }}
            >
              {/* Input to edit the link */}
              <input
                type="text"
                className="w-full py-1 pr-2 bg-slate-800 text-ellipsis text-slate-200 rounded-md text-xs font-dm outline-none"
                placeholder="https://example.com"
                value={url}
                onClick={(e) => {
                  // select the input text when the user clicks on it.
                  e.currentTarget.select();
                }}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setEditingLink(true);
                }}
              />
              <div className="w-px h-6 bg-slate-600" />
              <Tooltip.Provider delayDuration={300}>
                <Tooltip.Root delayDuration={300}>
                  <Tooltip.Trigger asChild className="relative">
                    <button
                      className="rounded-sm min-w-[31px] overflow-hidden transition hover:bg-white/10 text-slate-300 p-2 flex items-center justify-center"
                      onClick={
                        editingLink
                          ? () => {
                              if (!isUrl(url)) {
                                toast.error("Please enter a valid URL.");
                                return;
                              }
                              setUrl(editor.getAttributes("link").href);
                              //set editor link value to current link value
                              editor
                                ?.chain()
                                .focus()
                                .extendMarkRange("link")
                                .setLink({ href: url, target: "_blank" })
                                .run();
                              setTimeout(() => {
                                setEditingLink(false);
                              }, 300);
                            }
                          : openLinkModal
                      }
                    >
                      <>
                        <CheckIcon
                          className={`transition absolute -translate-y-[calc(100%+16px)] ${
                            editingLink ? "!translate-y-0" : ""
                          }`}
                        />

                        <Pencil1Icon
                          className={`transition ${
                            editingLink ? "translate-y-[calc(100%+16px)]" : ""
                          }`}
                        />
                      </>
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      sideOffset={5}
                      align="center"
                      className={`z-20 TooltipContent data-[side=bottom]:animate-slideDownAndFade data-[side=top]:animate-slideUpAndFade bg-gray-800 border border-slate-500 text-white font-dm text-xs rounded-md p-2`}
                    >
                      {editingLink ? "Save" : "Edit Link"}
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
                <Tooltip.Root delayDuration={300}>
                  <Tooltip.Trigger asChild className="relative">
                    <button
                      className={`rounded-sm overflow-hidden min-w-[31px] transition p-2 flex items-center justify-center ${
                        editingLink
                          ? "hover:bg-white/10"
                          : "hover:bg-red-500/30"
                      }`}
                      onClick={
                        editingLink
                          ? () => {
                              // cancel current link changes
                              setUrl(editor.getAttributes("link").href);
                              setEditingLink(false);
                            }
                          : removeLink
                      }
                    >
                      <>
                        <Cross2Icon
                          className={`transition absolute text-slate-300 translate-y-[calc(100%+16px)] ${
                            editingLink ? "!translate-y-0" : ""
                          }`}
                        />

                        <TrashIcon
                          className={`transition text-red-500 ${
                            editingLink ? "-translate-y-[calc(100%+16px)]" : ""
                          }`}
                        />
                      </>
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      sideOffset={5}
                      align="center"
                      className={`z-20 TooltipContent data-[side=bottom]:animate-slideDownAndFade data-[side=top]:animate-slideUpAndFade bg-gray-800 border border-slate-500 font-dm text-xs rounded-md p-2 ${
                        editingLink ? "text-slate-300" : "text-red-500"
                      }`}
                    >
                      {editingLink ? "Cancel" : "Remove Link"}
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </BubbleMenu>
            <EditorContent
              onFocus={() => setDisableToolbar(false)}
              className="!prose-lime px-6 pb-6 prose-a:!text-blue-400 prose-a:underline prose-sm prose-pre:bg-nav-dark prose-pre:text-white !list-inside !list-disc prose-headings:font-dm prose-h1:!my-4 prose-h2:!my-4 prose-h3:!my-4 prose-h3:!text-lg prose-h3:!font-dm prose-h1:text-2xl prose-h1:font-semibold prose-h2:!text-xl prose-h2:!font-semibold prose-headings:!my-0 !outline-none"
              editor={editor}
            />
          </div>
        </div>
      </div>
      <Modal
        onClose={() => {
          setTimeout(() => {
            setModalUrl(url);
            setModalUrlText("");
          }, 300);
        }}
        open={linkModalOpen}
        setOpen={setLinkModalOpen}
        title="Edit Link"
        description="Insert a link to an external website."
        overlayClassName="!z-[102]"
        contentClassName="!z-[200]"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex space-y-1 flex-col">
            <label
              htmlFor="link-text"
              className="text-xs text-slate-800 font-dm"
            >
              Link Text
            </label>
            <input
              type="text"
              id="link-text"
              className="w-full py-2 text-base rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
              placeholder="Example"
              value={modalUrlText}
              onChange={(e) => setModalUrlText(e.target.value)}
            />
          </div>
          <div className="flex space-y-1 flex-col">
            <label
              htmlFor="link-url"
              className="text-xs text-slate-800 font-dm"
            >
              Link URL
            </label>
            <input
              type="text"
              id="link-url"
              className="w-full py-2 text-base rounded-md border border-slate-300 bg-white text-slate-800 px-3 font-dm outline-none"
              placeholder="https://example.com"
              value={modalUrl}
              onChange={(e) => setModalUrl(e.target.value)}
            />
          </div>

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
