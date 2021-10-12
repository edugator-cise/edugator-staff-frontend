import * as React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'
import { setActiveTab, setStdin, setCompilerOutput } from '../CodeEditorSlice'
import {CompileOutput} from './CompileOutput'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from "../../../app/common/store"
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
const TabBar = styled('div')(({theme}) => `
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: rgb(250,250,250);
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
// const ActiveTab = styled(Tab)(({theme}) => `
//   background-color: white;
// `)

export const InputOutputView = () => {
  const dispatch = useDispatch()

  const activeTab = useSelector((state: RootState) => state.codeEditor.activeTab)
  const stdin = useSelector((state: RootState) => state.codeEditor.stdin)
  const compileOutput = useSelector((state: RootState) => state.codeEditor.compilerOutput)
  const submissionOutput = useSelector((state: RootState) => state.codeEditor.submissionOutput)
  const isAcceptedOutput = useSelector((state: RootState) => state.codeEditor.isAcceptedOutput)
  const handleChange = (event: any, newValue: number) => {
    dispatch(setActiveTab(newValue))
  };

  const handleStdinChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault()
    dispatch(setStdin(event.target.value))
  }

  // const handleChangeIndex = (index) => {
  //   setTabValue(index);
  // };
console.log(activeTab)
  return (
    <Paper>
      <TabBar>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          textColor="inherit"
          sx = {{
            '& .Mui-selected': {
              backgroundColor: 'white',
              borderLeft: '2px solid transparent',
              borderRight: '2px solid transparent'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'transparent'
            }
          }}
        >
          <Tab disableRipple label="Stdin"></Tab>
          <Tab disableRipple label="Compiler Output"></Tab>
          <Tab disableRipple label="Submission"></Tab>
        </Tabs>
      </TabBar>
    <Box sx={{height: '20vh', padding: 2}}>
      {activeTab === 0 ? (
        <FormControl sx={{ width: '100%' }} variant="outlined">
            <OutlinedInput
              id="outlined-stdin"
              multiline
              minRows={6}
              value={stdin}
              onChange={handleStdinChange}
              aria-describedby="outlined-stdin-text"
              inputProps={{
                'aria-label': 'stdin',
              }}
            />
      </FormControl>
      ): activeTab === 1 ? (
        <>
        <CompileOutput accepted={isAcceptedOutput} compileBody={compileOutput.compilerBody} compileMessage={compileOutput.compilerMessage}/>
        </>
      ) :  <OutputPaper>
        Press Submit to run code
      </OutputPaper>}
    </Box>
    </Paper>
  )
}