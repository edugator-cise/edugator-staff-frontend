import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";

export function MarkdownEditor(): React.ReactElement {
  const [markdownText, setMarkdown] = React.useState("# Your markdown here");
  return (
    <Stack
      direction="row"
      spacing={3}
      height="500px"
      flexGrow="initial"
      margin="12px"
    >
      <Stack width="50%" spacing={1}>
        <Typography component="h3">Markdown Editor</Typography>
        <Divider />
        <Editor
          defaultLanguage="markdown"
          onChange={(value) => {
            setMarkdown(value as string);
          }}
        />
      </Stack>
      <Divider orientation="vertical" />
      <Stack width="50%" spacing={1} overflow="auto">
        <Typography component="h3">Preview</Typography>
        <Divider />
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </Stack>
    </Stack>
  );
}
