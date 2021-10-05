import React, {useEffect} from 'react'
import {CodeLayoutContainer} from '../../shared/CodeLayoutContainer'
import { Sidenav } from './SideNav'
import {IModuleItem, IProblemItem} from "./types";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "../../app/common/store"
import { requestModulesAndProblems } from "./CodeEditorSlice";
import { Grid, Paper, CircularProgress, Box } from "@mui/material"
import { styled } from '@mui/material/styles';
import {ProblemView} from "./CodeEditorContainer/ProblemView"
import {CodeEditorView} from "./CodeEditorContainer/CodeEditorView"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// const payload = fakemodwithprobs as [IModuleItem]
export const CodeEditorPage = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootState) => state.codeEditor.isLoading)
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
          <Grid container item xs={12} md={10} spacing={2} sx={{height: "100%"}}>
            <Grid item xs={12} md={4} sx={{height: "100%"}}>
              <ProblemView problemTitle={"problem string"} problemStatement={"# problem statement"}/>
            </Grid>
            <Grid item xs={12} md={8}>
              <CodeEditorView/>
            </Grid>
          </Grid>
        </Grid>
      </CodeLayoutContainer>
    )
  }
}