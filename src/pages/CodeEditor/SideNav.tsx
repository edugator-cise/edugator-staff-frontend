import { ListItem, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const handleMenu = (children, level = 0) => children.map(({
  children, title
})) => {
  if (!children) {
    return (
      <ListItemButton>
        <ListItemText primary="Nest"/>
        {}
      </ListItemButton>
    )
  }
}

export const Sidenav = () => {
  const handleClick = ()
  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper'}}
      component='nav'
      aria-labelledby="nested-exercises-list"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Exercises
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemText primary="Exercise 1"/>
      </ListItemButton>
    </List>
  )
}


