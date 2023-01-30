import * as React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeAlert } from "components/Modules/ModulesSlice";
import { RootState } from "lib/store/store";

export function ModulesSnackbar() {
  const dispatch = useDispatch();
  const feedback = useSelector((state: RootState) => state.modules.feedback);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeAlert());
  };

  return (
    <Snackbar
      open={feedback.display}
      autoHideDuration={3000}
      onClose={handleClose} // called after 6000 ms = 6 seconds
    >
      <Alert
        variant="filled"
        severity={feedback.type}
        sx={{ width: "100%" }}
        onClose={handleClose}
      >
        {feedback.message}
      </Alert>
    </Snackbar>
  );
}
