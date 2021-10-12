import React from 'react';
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles'

const CompileOutputContainer = styled('div')(({theme}) => `
  text-align: left;
  height: 100%;
  overflow-y: auto;
`)

const OutputPaper = styled(Paper)(({theme}) => `
  height: 100%;
  white-space: pre-wrap;
  height: auto;
  box-shadow: none;
  position: relative;
  padding: ${theme.spacing(1)} ${theme.spacing(2)};
  line-height: 20px;
  font-weight: 400;
  border-radius: 0;
  overflow: auto;
  background-color: #f7f9fa;
`)

interface Props {
  accepted: boolean | undefined
  compileMessage: string,
  compileBody: string
}
export const CompileOutput = ({accepted, compileMessage, compileBody}: Props) => {

  if (accepted) {
    return (
    <CompileOutputContainer>
    <Typography variant="h5" color="#388e3c">
      Accepted
    </Typography>
    <Paper sx={{backgroundColor: '#f0f0f0', height: '60%', p: 2}}>
      {compileBody}
    </Paper>
    </CompileOutputContainer>
    )
  } else if (accepted === false) {
    return (
    <CompileOutputContainer>
    <Typography variant="h5" color="#d81b60">
      {compileMessage}
    </Typography>
    <Paper sx={{backgroundColor: '#fce4ec', color: '#d81b60', height: '60%', p: 2}}>
      {compileBody}
    </Paper>
    </CompileOutputContainer>
    )
  }
  return (
    <OutputPaper>
      Press Run to run code
    </OutputPaper>
  )
}