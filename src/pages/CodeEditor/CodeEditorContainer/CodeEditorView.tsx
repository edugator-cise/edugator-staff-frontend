import React from "react";
import Editor from '@monaco-editor/react';
import {Paper} from '@mui/material'
export const CodeEditorView = () => {
  return (
    <Paper sx={{height: "50vh"}}>
      <Editor
        height="80%"
        defaultLanguage="cpp"
        defaultValue={"hello world"}
        
      >

      </Editor>
    </Paper>
  )
}