import { Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import { FormikProps } from "formik";
import { isBlank } from "../../../shared/utils";

interface Props {
  form: FormikProps<any>;
}

const defaultMarkdown = `[comment]: # (The title is auto generated to be at the top of problem descriptions.)

## Problem Statement
Type your problem description here

### Example 1:

### Constraints

### Difficulty
Very Easy (1-14 minutes)  
Easy (15-29 minutes)  
Medium (30-44 minutes)  
Hard (45-59 minutes)  
Very Hard (+60 minutes)  

**Author:** \`Name\`, **Date Created:** \`Date\`, **Last Modified:** \`Date\`
***
### Sample Input:
>> \`add 1 1\`

### Sample Output:
>> \`2\`

## Markdown Tips
[comment]: # (TODO: Delete this section before releasing the problem)

*Two spaces and a new line* acts as a **break**.  
And this is the second line.

> "Do or do not there is no try."
>> -  Yoda ❤️ 


\`\`\` 
Code like lines
int main() {}
\`\`\`
1. The number of commands
2. Commands
    1. Command one
    2. Command two

* N is less than X
    * N is greater than 0  

<p>HTML tags are not supported</p>

Open as a **new tab** to find more markdown syntax [here](https://www.markdownguide.org/basic-syntax/) (not all supported)

Example image

![alt text. Albert the Gator](https://m.media-amazon.com/images/I/51K51FOpwQL._SY355_.jpg)

***

`;

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
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </Stack>
    </Stack>
  );
}
