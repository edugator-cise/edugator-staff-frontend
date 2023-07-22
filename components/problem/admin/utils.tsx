import { Language, LanguageData, TestCaseVisibility } from "./types";

export const getFileExtension = (language: Language) => {
  switch (language) {
    case "cpp":
      return "cpp";
    case "java":
      return "java";
    case "python":
      return "py";
    default:
      return "";
  }
};
import { Content, Editor, JSONContent, getNodeAttributes } from "@tiptap/react";
import { toast } from "react-hot-toast";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Subscript,
  Superscript,
  H1,
  H2,
  List,
  ListNumbers,
  SourceCode,
  ArrowBackUp,
  ArrowForwardUp,
} from "tabler-icons-react";
import { Divider, MenuOption } from "components/lesson/admin/utils";
import { Problem } from "hooks/problem/useGetProblem";

export const processProblemStatement = (
  statement: string | Content
): string => {
  let editorContent = "";

  if (statement === undefined) {
    // Use empty editor content
    editorContent = "";
  } else {
    try {
      // Try parsing problem.statement as JSONContent
      const parsedContent = JSON.parse(statement as string);
      editorContent = parsedContent;
    } catch {
      // Use problem.statement as a string
      editorContent = statement as string;
    }
  }
  return editorContent;
};

export const validateProblem = (problem: Problem) => {
  if (!problem.title) {
    toast.error("Please enter a title");
    return false;
  }
  /* if (!problem.statement) {
    toast.error("Please enter a statement");
    return false;
  } */
  if (!problem.fileName) {
    toast.error("Please enter a file name");
    return false;
  }
  if (!problem.dueDate) {
    toast.error("Please enter a due date");
    return false;
  }
  /* if (!problem.templatePackage) {
    toast.error("Please enter a template package");
    return false;
  } */
  if (!problem.timeLimit) {
    toast.error("Please enter a time limit");
    return false;
  }
  if (!problem.memoryLimit) {
    toast.error("Please enter a memory limit");
    return false;
  }
  /* if (!problem.buildCommand) {
    toast.error("Please enter a build command");
    return false;
  } */
  if (!problem.testCases || problem.testCases.length === 0) {
    toast.error("Please enter at least one test case");
    return false;
  }
  return true;
};

export const fileNameWithExtensionRegex = (language: Language) => {
  const extension = getFileExtension(language);
  return new RegExp(`^[a-zA-Z0-9_]+\\.${extension}$`);
};

export const sampleCodeData: Record<Language, LanguageData> = {
  cpp: {
    solution:
      "#include <iostream>\n\tint sumOfTwoNumbers(int a, int b) {\n\t return a + b;\n}\nint main() {\n\t int a, b;\n\t std::cin >> a >> b;\n\t std::cout << sumOfTwoNumbers(a, b);\n\t return 0;\n}",
    body: "int sumOfTwoNumbers(int a, int b) {\n\t// TODO: Add code here\n}",
    fileName: `example.${getFileExtension("cpp")}`,
    header: "#include <iostream>",
    footer:
      "int main() {\n\tint a, b;\n\tstd::cin >> a >> b;\n\tstd::cout << sumOfTwoNumbers(a, b);\n\treturn 0;\n}",
  },
  java: {
    solution:
      'public class Main {\n public static void main(String[] args) {\n System.out.println("Hello, world!");\n }\n}',
    body: "public class Main {\n public static void main(String[] args) {\n // TODO: Add code here\n }\n}",
    fileName: `example.${getFileExtension("java")}`,
    header: "public class Header {\n}",
    footer: "}",
  },
  python: {
    solution: 'print("Hello, world!")',
    body: "# TODO: Add code here",
    fileName: `example.${getFileExtension("python")}`,
    header: "# Header.py",
    footer: "# Footer.py",
  },
};

export const sampleTestCases = [
  {
    input: "1 2",
    expectedOutput: "3",
    hint: "Add the two numbers",
    visibility: TestCaseVisibility.IO_VISIBLE,
  },
];

export const sampleEditorContent = {
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
          text: "Sum of Two Numbers",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "Write a program to add two numbers.",
        },
      ],
    },
  ],
};

const ICON_SIZE = 18;

export const menuOptions: () => (MenuOption | Divider)[] = () => [
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
  {},
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
];
