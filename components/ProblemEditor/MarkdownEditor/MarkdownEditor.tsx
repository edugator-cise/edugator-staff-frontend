import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import Editor from "@monaco-editor/react";
import { FormikProps } from "formik";
import { isBlank } from "utils/CodeEditorUtils";
import { Markdown } from "components/shared/Markdown";
import { defaultMarkdown } from "./MarkdownEditor.constants";

interface Props {
  form: FormikProps<any>;
}

export function MarkdownEditor({ form }: Props): React.ReactElement {
  const [markdownText, setMarkdown] = React.useState<string>(
    form.values.problemStatement
  );
  const [touched, setTouched] = React.useState(false);
  if (isBlank(markdownText) && !touched) {
    setMarkdown(defaultMarkdown);
  }

  return (
    <Stack
      direction="row"
      spacing={3}
      height="500px"
      flexGrow="initial"
      margin="12px"
    >
      <Stack width="50%" spacing={1}>
        <Typography component="h3">Problem Description Editor</Typography>
        <Divider />
        <Editor
          defaultValue={
            isBlank(markdownText) && !touched ? defaultMarkdown : markdownText
          }
          defaultLanguage="markdown"
          onChange={(value) => {
            form.setFieldValue("problemStatement", value);
            setMarkdown(value as string);
            setTouched(true);
          }}
        />
      </Stack>
      <Divider orientation="vertical" />
      <Stack width="50%" spacing={1} overflow="auto">
        <Typography component="h3">Problem Description Preview</Typography>
        <Divider />
        <Markdown markdownString={markdownText} />
      </Stack>
    </Stack>
  );
}
