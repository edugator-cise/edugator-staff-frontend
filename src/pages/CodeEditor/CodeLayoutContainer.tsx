import { Box, Alert, Grow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/common/store";
import { setRunCodeError } from "./CodeEditorSlice";
import VerticalNavigation from "../../shared/VerticalNavigation";
import { colors } from "../../shared/constants";
interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const CodeLayoutContainer = ({ children }: Props) => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(
    (state: RootState) => state.codeEditor.runCodeError
  );
  return (
    <Box
      minHeight="100%"
      display="flex"
      flexDirection="column"
      sx={{ bgcolor: colors.lightGray }}
    >
      <VerticalNavigation light={false} />
      {errorMessage.hasError && (
        <Grow in timeout={500}>
          <Alert
            severity="error"
            sx={{
              position: "absolute",
              left: "0",
              right: "0",
              width: "50%",
              marginTop: 5,
              marginRight: "auto",
              marginLeft: "auto",
            }}
            onClose={() => {
              dispatch(setRunCodeError({ hasError: false, errorMessage: "" }));
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
