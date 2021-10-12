import * as React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/common/hooks";
import { closeAlert } from "../ModulesPage.slice";

export function ModulesSnackbar() {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector((state) => state.modules.feedback);

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
    <>
      <Snackbar
        open={feedback.display}
        autoHideDuration={6000}
        onClose={handleClose} // called after 6000 ms = 6 seconds
      >
        <Alert variant="filled" severity={feedback.type} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}
