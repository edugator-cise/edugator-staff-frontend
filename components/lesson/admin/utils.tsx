import { Editor, JSONContent, getNodeAttributes } from "@tiptap/react";
import { toast } from "react-hot-toast";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
  Link,
  Heading,
  H1,
  H2,
  H3,
  List,
  ListNumbers,
  SourceCode,
  ArrowBackUp,
  ArrowForwardUp,
  Photo,
  ListDetails,
  ListCheck,
} from "tabler-icons-react";
import { MultipleChoiceAttributes } from "./Extensions/MultipleChoice";
import { MultipleSelectAttributes } from "./Extensions/MultipleSelect";

type EditorContent = {
  type: string;
  content: JSONContent[];
};

export function validateLesson(content: EditorContent, title: string) {
  console.log(content);
  const errorMessages = {
    multipleChoice: {
      emptyQuestion: "Multiple choice question must not be empty.",
      emptyAnswer:
        "All answer choices for multiple choice question must be non-empty.",
      invalidCorrectAnswer:
        "Invalid correct answer index for multiple choice question.",
    },
    multipleSelect: {
      emptyQuestion: "Multiple select question must not be empty.",
      emptyAnswer:
        "All answer choices for multiple select question must be non-empty.",
      noCorrectAnswer:
        "At least one correct answer must be selected for multiple select question.",
    },
  };

  let isValid = true;

  if (!title || title === "") {
    toast.error("Please enter a title for the lesson.");
    window.scrollTo(0, 0);
    return;
  } else if (!content) {
    toast.error("Please enter content for the lesson.");
    return;
  }

  content.content.forEach((item: JSONContent) => {
    const { type, attrs } = item;

    if (type === "multipleChoice") {
      const { question, answers, correctAnswer } =
        attrs as MultipleChoiceAttributes;
      if (question === "") {
        toast.error(errorMessages.multipleChoice.emptyQuestion);
        isValid = false;
      }

      if (answers.some((answer: string) => answer === "")) {
        toast.error(errorMessages.multipleChoice.emptyAnswer);
        isValid = false;
      }

      if (correctAnswer < 0 || correctAnswer >= answers.length) {
        toast.error(errorMessages.multipleChoice.invalidCorrectAnswer);
        isValid = false;
      }
    }

    if (type === "multipleSelect") {
      const { question, answers, correctAnswers } =
        attrs as MultipleSelectAttributes;
      if (question === "") {
        toast.error(errorMessages.multipleSelect.emptyQuestion);
        isValid = false;
      }

      if (answers.some((answer: string) => answer === "")) {
        toast.error(errorMessages.multipleSelect.emptyAnswer);
        isValid = false;
      }

      if (correctAnswers.length === 0) {
        toast.error(errorMessages.multipleSelect.noCorrectAnswer);
        isValid = false;
      }
    }
  });

  return isValid;
}

export const sampleLessonContent = {
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
          text: "Lesson 1: Hello World",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "You can use this lesson to learn how to print 'Hello World' in different languages.",
        },
      ],
    },
  ],
};

export interface MenuOption {
  title: string;
  command: (editor: Editor) => void;
  icon: React.ReactNode;
  active?: (editor: Editor) => boolean;
  disabled?: (editor: Editor) => boolean;
}

export type Divider = {};

const ICON_SIZE = 18;

export const menuOptions: (
  onLinkClick: () => void,
  onImageClick: () => void
) => (MenuOption | Divider)[] = (
  onLinkClick: () => void,
  onImageClick: () => void
) => [
  {
    title: "Undo",
    command: (editor: Editor) => editor?.chain().focus().undo().run(),
    icon: <ArrowBackUp size={ICON_SIZE} />,
    disabled: (editor: Editor) => !editor?.can().undo(),
  },
  {
    title: "Redo",
    command: (editor: Editor) => editor?.chain().focus().redo().run(),
    icon: <ArrowForwardUp size={ICON_SIZE} />,
    disabled: (editor: Editor) => !editor?.can().redo(),
  },
  {},
  {
    title: "Bold",
    command: (editor: Editor) => editor?.chain().focus().toggleBold().run(),
    icon: <Bold size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("bold"),
    disabled: (editor: Editor) => !editor?.can().toggleBold(),
  },
  {
    title: "Italic",
    command: (editor: Editor) => editor?.chain().focus().toggleItalic().run(),
    icon: <Italic size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("italic"),
    disabled: (editor: Editor) => !editor?.can().toggleItalic(),
  },
  {
    title: "Underline",
    command: (editor: Editor) =>
      editor?.chain().focus().toggleUnderline().run(),
    icon: <Underline size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("underline"),
    disabled: (editor: Editor) => !editor?.can().toggleUnderline(),
  },
  {
    title: "Strikethrough",
    command: (editor: Editor) => editor?.chain().focus().toggleStrike().run(),
    icon: <Strikethrough size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("strike"),
    disabled: (editor: Editor) => !editor?.can().toggleStrike(),
  },
  {
    title: "Code",
    command: (editor: Editor) => editor?.chain().focus().toggleCode().run(),
    icon: <Code size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("code"),
    disabled: (editor: Editor) => !editor?.can().toggleCode(),
  },
  {
    title: "Subscript",
    command: (editor: Editor) =>
      editor?.chain().focus().toggleSubscript().run(),
    icon: <Subscript size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("subscript"),
    disabled: (editor: Editor) => !editor?.can().toggleSubscript(),
  },
  {
    title: "Superscript",
    command: (editor: Editor) =>
      editor?.chain().focus().toggleSuperscript().run(),
    icon: <Superscript size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("superscript"),
    disabled: (editor: Editor) => !editor?.can().toggleSuperscript(),
  },
  {},
  {
    title: "Link",
    command: onLinkClick,
    icon: <Link size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("link"),
    disabled: (editor: Editor) => false,
  },
  {
    title: "Image",
    command: onImageClick,
    icon: <Photo size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("image"),
    disabled: (editor: Editor) => false,
  },
  {},
  {
    title: "Heading 1",
    command: (editor: Editor) =>
      editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    icon: <H1 size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("heading", { level: 1 }),
    disabled: (editor: Editor) => !editor?.can().toggleHeading({ level: 1 }),
  },
  {
    title: "Heading 2",
    command: (editor: Editor) =>
      editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    icon: <H2 size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("heading", { level: 2 }),
    disabled: (editor: Editor) => !editor?.can().toggleHeading({ level: 2 }),
  },
  {
    title: "Heading 3",
    command: (editor: Editor) =>
      editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    icon: <H3 size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("heading", { level: 3 }),
    disabled: (editor: Editor) => !editor?.can().toggleHeading({ level: 3 }),
  },
  {},
  {
    title: "Bullet List",
    command: (editor: Editor) =>
      editor?.chain().focus().toggleBulletList().run(),
    icon: <List size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("bulletList"),
    disabled: (editor: Editor) => !editor?.can().toggleBulletList(),
  },
  {
    title: "Numbered List",
    command: (editor: Editor) =>
      editor?.chain().focus().toggleOrderedList().run(),
    icon: <ListNumbers size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("orderedList"),
    disabled: (editor: Editor) => !editor?.can().toggleOrderedList(),
  },
  {},
  {
    title: "Source Code",
    command: (editor: Editor) =>
      editor?.chain().focus().toggleCodeBlock().run(),
    icon: <SourceCode size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("codeBlock"),
    disabled: (editor: Editor) => !editor?.can().toggleCodeBlock(),
  },
  {},
  {
    title: "Multiple Choice",
    command: (editor: Editor) => {
      // insert a gap, then a multiple choice question, then a gap
      /* editor
        ?.chain()
        .setNode("multipleChoice", { question: "", answers: ["", "", "", ""] })
        .run() */
      console.log("nodesize", editor?.state.doc.nodeSize);
      const endPos = editor?.state.selection.$to.pos;
      console.log("endpos", endPos);
      editor?.commands.focus("start");
      editor
        ?.chain()
        .insertContentAt(endPos, { type: "multipleChoice" })

        .run();
      /* editor
        ?.chain()
        .setHardBreak()
        .focus()
        .setNode("multipleChoice", { question: "", answers: ["", "", "", ""] })
        .focus()
        .run(); */
      //editor?.chain().focus().setHardBreak().run();
    },
    icon: <ListDetails size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("multipleChoice"),
    disabled: (editor: Editor) => false,
  },
  {
    title: "Multiple Select",
    command: (editor: Editor) => {
      // insert a gap, then a multiple choice question, then a gap
      /* editor
        ?.chain()
        .setNode("multipleChoice", { question: "", answers: ["", "", "", ""] })
        .run() */
      console.log("nodesize", editor?.state.doc.nodeSize);
      const endPos = editor?.state.selection.$to.pos;
      console.log("endpos", endPos);
      editor?.commands.focus("start");
      editor
        ?.chain()
        .insertContentAt(endPos, { type: "multipleSelect" })

        .run();
      /* editor
        ?.chain()
        .setHardBreak()
        .focus()
        .setNode("multipleChoice", { question: "", answers: ["", "", "", ""] })
        .focus()
        .run(); */
      //editor?.chain().focus().setHardBreak().run();
    },
    icon: <ListCheck size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("multipleSelect"),
    disabled: (editor: Editor) => false,
  },
];
