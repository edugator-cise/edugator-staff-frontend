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
      '#include <iostream>\n\nint main() {\n std::cout << "Hello, world!\\n";\n return 0;\n}',
    body: "#include <iostream>\n\nint main() {\n // TODO: Add code here\n return 0;\n}",
    fileName: `example.${getFileExtension("cpp")}`,
    header: "#ifndef HEADER_H\n#define HEADER_H\n#endif // HEADER_H",
    footer: "#endif // FOOTER_H",
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
