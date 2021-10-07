import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Divider,
  Box,
  Paper,
  Grid
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { styled } from '@mui/material/styles';
interface Props {
  children: JSX.Element
}

export const CodeLayoutContainer = ({ children }: Props) => {
  const history = useHistory();
  return (
    <Box minHeight="100%" display="flex" flexDirection="column" sx={{bgcolor: "#f0f0f0"}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1">
            EDUGATOR
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};
