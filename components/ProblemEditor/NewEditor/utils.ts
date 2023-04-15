import { Language } from "./types";

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
