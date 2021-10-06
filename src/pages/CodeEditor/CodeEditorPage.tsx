import React, {useEffect} from 'react'
import {CodeLayoutContainer} from '../../shared/CodeLayoutContainer'
import { Sidenav } from './SideNav'
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../../app/common/store"
import { requestModulesAndProblems } from "./CodeEditorSlice";
import { Grid, Paper, CircularProgress, Box, Stack} from "@mui/material"
import { styled } from '@mui/material/styles';
import {ProblemView} from "./CodeEditorContainer/ProblemView"
import {CodeEditorView} from "./CodeEditorContainer/CodeEditorView"
import {InputOutputView} from "./CodeEditorContainer/InputOutputView"

export const CodeEditorPage = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootState) => state.codeEditor.isLoading)
  const currentProblem = useSelector((state: RootState) => state.codeEditor.currentProblem)
  useEffect(() => {
    console.log("Reload Code Editor")
    dispatch(requestModulesAndProblems(true))
  }, [])
  if (isLoading) {
    return (
      <CodeLayoutContainer>
        <Grid container justifyContent="center" direction="column"
  alignItems="center">
          <Box minHeight="20vh"/>
          <CircularProgress/>
        </Grid>
      </CodeLayoutContainer>
    )
  } else {
    return (
      <CodeLayoutContainer>
        <Grid container spacing={0} sx={{height: "100%"}}>
          <Grid item xs={12} md={2} sx={{height: "100%"}}>
            <Sidenav/>
          </Grid>
          <Grid container item xs={12} md={10} spacing={2}>
            <Grid item xs={12} md={4} sx={{height: "100%"}}>
              {currentProblem === undefined ? <div/> : 
              <ProblemView problemTitle={currentProblem.title} problemStatement={currentProblem.statement}/>
              }
            </Grid>
            <Grid item xs={12} md={8} container direction="column" spacing={3} sx={{ padding: 2 }}>
              <Grid item sx={{ marginTop: 2}}>
                <CodeEditorView/>
              </Grid>
              <Grid item>
              <InputOutputView/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CodeLayoutContainer>
    )
  }
}