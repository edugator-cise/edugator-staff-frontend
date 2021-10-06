import * as React from 'react'
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles'

const TabBar = styled('div')(({theme}) => `
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: rgb(250,250,250);
`)

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
          <Tab label="Stdin"></Tab>
          <Tab label="Compiler Output"></Tab>
          <Tab label="Submission"></Tab>
        </Tabs>
      </TabBar>
    </Paper>
  )
}