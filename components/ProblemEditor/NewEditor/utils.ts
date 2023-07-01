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
