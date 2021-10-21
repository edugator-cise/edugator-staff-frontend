import { Divider, Stack, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import { PropsOf } from "@mui/lab/node_modules/@mui/system";
import { FormikProps } from "formik";

interface Props {
  form: FormikProps<any>;
}

export function MarkdownEditor({ form }: Props): React.ReactElement {
  const [markdownText, setMarkdown] = React.useState(
    form.values.problemStatement
  );
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
          defaultValue={form.values.problemStatement}
          defaultLanguage="markdown"
          onChange={(value) => {
            form.setFieldValue("problemStatement", value);
            setMarkdown(value as string);
          }}
        />
      </Stack>
      <Divider orientation="vertical" />
      <Stack width="50%" spacing={1} overflow="auto">
        <Typography component="h3">Preview</Typography>
        <Divider />
        <ReactMarkdown>
          {markdownText || "# Your problem statement here"}
        </ReactMarkdown>
      </Stack>
    </Stack>
  );
}
