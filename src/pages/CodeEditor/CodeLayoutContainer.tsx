import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Alert,
  Grow
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { setRunCodeError } from './CodeEditorSlice'
interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const CodeLayoutContainer = ({ children }: Props) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state: RootState) => state.codeEditor.runCodeError)
  return (
    <Box
      minHeight="100%"
      display="flex"
      flexDirection="column"
      sx={{ bgcolor: "#f0f0f0" }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="h1">
            EDUGATOR
          </Typography>
        </Toolbar>
      </AppBar>
      {(errorMessage.hasError) && (
        <Grow in timeout={500}>
          <Alert
              severity="error"
              sx={{
                position: 'absolute',
                left: '0',
                right: '0',
                width: '50%',
                marginTop: 5,
                marginRight: 'auto',
                marginLeft: 'auto'
              }}
              onClose={() => {
                dispatch(setRunCodeError({ hasError: false, errorMessage: ''}))
              }}
            >
              {errorMessage.errorMessage}
          </Alert>
        </Grow>
      )}
      {children}
    </Box>
  );
};
