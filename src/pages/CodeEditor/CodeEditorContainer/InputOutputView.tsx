import * as React from 'react'
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles'

const TabBar = styled('div')(({theme}) => `
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: rgb(250,250,250);
`)

// const ActiveTab = styled(Tab)(({theme}) => `
//   background-color: white;
// `)

export const InputOutputView = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setTabValue(newValue);
  };

  // const handleChangeIndex = (index) => {
  //   setTabValue(index);
  // };

  return (
    <Paper>
      <TabBar>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab disableRipple label="Stdin"></Tab>
          <Tab disableRipple label="Compiler Output"></Tab>
          <Tab disableRipple label="Submission"></Tab>
        </Tabs>
      </TabBar>
    <Box sx={{height: '20vh'}}>
      Hello world
    </Box>
    </Paper>
  )
}