import React, {useEffect, useRef, useState} from "react";
import Editor from '@monaco-editor/react';
import {Paper, Button } from '@mui/material'
import * as monaco from "monaco-editor"
import { styled } from '@mui/material/styles'
import { GetApp, Add, RotateLeft, CloudDownload } from '@mui/icons-material'
import {useDispatch, useSelector} from "react-redux";
import { setCodeBody } from "../CodeEditorSlice"
import {RootState} from "../../../app/common/store"
const ColumnContainer = styled('div')(({theme}) => `
  display: flex;
  justify-content: flex-end;
  
`)


interface CodeEditorProps {
  code: string;
  templatePackage: string
}

export const CodeEditorView = ({code, templatePackage}: CodeEditorProps) => {
  const dispatch = useDispatch()
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const currentCode = useSelector((state: RootState) => state.codeEditor.codeBody)
  const header = useSelector((state:RootState) => state.codeEditor.currentProblem?.code.header)
  const footer = useSelector((state:RootState) => state.codeEditor.currentProblem?.code.footer)
  const hiddenFileInput = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setValue(code);
    }
  }, [code])

  const handleEditorMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor
  } 
  const handleDownload = () => {
    const blob = new Blob([header + currentCode + footer])
    const blobURL = URL.createObjectURL(blob);
    const filename = "edugator-code.cpp"
    
    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = blobURL;
    anchor.download = filename; 
    // Append to the DOM
    document.body.appendChild(anchor);
    // Trigger `click` event
    anchor.click();
    // Remove element from DOM
    document.body.removeChild(anchor);
  }

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue(code)
    }
  }

  const parseFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const reader = new FileReader();
    if (event.target && event.target.files) {
      reader.readAsText(event.target.files[0])
      reader.onload = async (event) => {
        const text = event.target?.result
        if(editorRef.current) {
          editorRef.current.setValue(text as string);
        }
      }
    }
  }
  const handleChooseFile = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click()
    }
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
        <input
          style={{ display: 'none' }}
          ref={hiddenFileInput}
          type="file"
          onChange={e => parseFile(e)}
        />
        <Button
          title="Choose File"
          // variant="contained"
          startIcon={<Add/>}
          onClick = { (e) => handleChooseFile(e)}
          sx={{marginRight: 1, marginTop: 1}}
        >Choose File</Button>
        <Button
          title="Download Submission"
          startIcon={<GetApp/>}
          onClick={handleDownload}
          sx={{marginRight: 1, marginTop: 1}}
        >Download Submission</Button>
        <Button
          title="Reset Code"
          startIcon={<RotateLeft/>}
          onClick={handleReset}
          sx={{marginRight: 1, marginTop: 1}}
        >Reset Code</Button>
      </ColumnContainer>
      <Editor
        height="50vh"
        defaultLanguage="cpp"
        defaultValue={currentCode}
        onChange={(value) => {dispatch(setCodeBody(value as string))}}
        onMount={handleEditorMount}
      />
    </Paper>
  )
}