import React, {useEffect, useRef} from "react";
import Editor from '@monaco-editor/react';
import {Paper, Button } from '@mui/material'
import * as monaco from "monaco-editor"
import { styled } from '@mui/material/styles'
import { GetApp, Add, RotateLeft, CloudDownload } from '@mui/icons-material'

const ColumnContainer = styled('div')(({theme}) => `
  display: flex;
  justify-content: flex-end;
  
`)

export const CodeEditorView = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  useEffect(() => {
    if (editorRef.current) {
      console.log("yah")
    }
  }, [])

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  } 
  return (
    <Paper sx={{minHeight: "50vh"}}>
      <ColumnContainer>
        <Button
          title="Download Template"
          // variant="contained"
          startIcon={<CloudDownload/>}
          sx={{marginRight: 1, marginTop: 1}}
        >Download Template</Button>
        <Button
          title="Choose File"
          // variant="contained"
          startIcon={<Add/>}
          sx={{marginRight: 1, marginTop: 1}}
        >Choose File</Button>
        <Button
          title="Download Submission"
          startIcon={<GetApp/>}
          sx={{marginRight: 1, marginTop: 1}}
        >Download Submission</Button>
        <Button
          title="Reset Code"
          startIcon={<RotateLeft/>}
          sx={{marginRight: 1, marginTop: 1}}
        >Reset Code</Button>
      </ColumnContainer>
      <Editor
        height="500px"
        defaultLanguage="cpp"
        defaultValue={"hello world"}
        onMount={handleEditorMount}
      >
      </Editor>
    </Paper>
  )
}