import { Editor, getNodeAttributes } from "@tiptap/react";
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
  H4,
  H5,
  H6,
  Blockquote,
  List,
  ListNumbers,
  SourceCode,
  ArrowBackUp,
  ArrowForwardUp,
  Photo,
  ListDetails,
  ListCheck,
} from "tabler-icons-react";

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
    command: (editor: Editor) => editor?.commands.undo(),
    icon: <ArrowBackUp size={ICON_SIZE} />,
    disabled: (editor: Editor) => !editor?.can().undo(),
  },
  {
    title: "Redo",
    command: (editor: Editor) => editor?.commands.redo(),
    icon: <ArrowForwardUp size={ICON_SIZE} />,
    disabled: (editor: Editor) => !editor?.can().redo(),
  },
  {},
  {
    title: "Bold",
    command: (editor: Editor) => editor?.commands.toggleBold(),
    icon: <Bold size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("bold"),
    disabled: (editor: Editor) => !editor?.can().toggleBold(),
  },
  {
    title: "Italic",
    command: (editor: Editor) => editor?.commands.toggleItalic(),
    icon: <Italic size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("italic"),
    disabled: (editor: Editor) => !editor?.can().toggleItalic(),
  },
  {
    title: "Underline",
    command: (editor: Editor) => editor?.commands.toggleUnderline(),
    icon: <Underline size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("underline"),
    disabled: (editor: Editor) => !editor?.can().toggleUnderline(),
  },
  {
    title: "Strikethrough",
    command: (editor: Editor) => editor?.commands.toggleStrike(),
    icon: <Strikethrough size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("strike"),
    disabled: (editor: Editor) => !editor?.can().toggleStrike(),
  },
  {
    title: "Code",
    command: (editor: Editor) => editor?.commands.toggleCode(),
    icon: <Code size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("code"),
    disabled: (editor: Editor) => !editor?.can().toggleCode(),
  },
  {
    title: "Subscript",
    command: (editor: Editor) => editor?.commands.toggleSubscript(),
    icon: <Subscript size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("subscript"),
    disabled: (editor: Editor) => !editor?.can().toggleSubscript(),
  },
  {
    title: "Superscript",
    command: (editor: Editor) => editor?.commands.toggleSuperscript(),
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
    command: (editor: Editor) => editor?.commands.toggleHeading({ level: 2 }),
    icon: <H2 size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("heading", { level: 2 }),
    disabled: (editor: Editor) => !editor?.can().toggleHeading({ level: 2 }),
  },
  {
    title: "Heading 3",
    command: (editor: Editor) => editor?.commands.toggleHeading({ level: 3 }),
    icon: <H3 size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("heading", { level: 3 }),
    disabled: (editor: Editor) => !editor?.can().toggleHeading({ level: 3 }),
  },
  {},
  {
    title: "Bullet List",
    command: (editor: Editor) => editor?.commands.toggleBulletList(),
    icon: <List size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("bulletList"),
    disabled: (editor: Editor) => !editor?.can().toggleBulletList(),
  },
  {
    title: "Numbered List",
    command: (editor: Editor) => editor?.commands.toggleOrderedList(),
    icon: <ListNumbers size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("orderedList"),
    disabled: (editor: Editor) => !editor?.can().toggleOrderedList(),
  },
  {},
  {
    title: "Source Code",
    command: (editor: Editor) => editor?.commands.toggleCodeBlock(),
    icon: <SourceCode size={ICON_SIZE} />,
    active: (editor: Editor) => editor?.isActive("codeBlock"),
    disabled: (editor: Editor) => !editor?.can().toggleCodeBlock(),
  },
  {},
  {
    title: "Muliple Choice",
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
