import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Underline from "@editorjs/underline";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Marker from "@editorjs/marker";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
import SimpleImage from "@editorjs/simple-image";
import RawTool from "@editorjs/raw";

export const EDITOR_TOOLS = {
  code: Code,
  header: {
    class: Header,
    inlineToolbar: ["link"],
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: [
      "link",
      "bold",
      "italic",
      "underline",
      "marker",
      "inlineCode",
    ],
  },
  underline: Underline,
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  warning: Warning,
  marker: {
    class: Marker,
    shortcut: "CMD+SHIFT+M",
  },
  delimiter: Delimiter,
  inlineCode: {
    class: InlineCode,
    shortcut: "CMD+SHIFT+C",
  },
  linkTool: LinkTool,
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+L",
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  table: {
    class: Table,
    inlineToolbar: true,
    shortcut: "CMD+ALT+T",
  },
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "http://localhost:8000/uploadFile", // Your backend file uploader endpoint
        byUrl: "http://localhost:8000/fetchUrl", // Your endpoint that provides uploading by Url
      },
    },
  },
  simpleImage: SimpleImage,
  raw: RawTool,
};

//JS file since editorjs plugins don't have types
