import * as React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/common/hooks";
import { closeAlert } from "../AdminAccountsPage.slice";

export function AccountSnackbar() {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector((state) => state.adminDashboard.feedback);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeAlert());
  };

  // may create generic component soon

  return (
    <Snackbar
      open={feedback.display}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert variant="filled" severity={feedback.type} sx={{ width: "100%" }}>
        {feedback.message}
      </Alert>
    </Snackbar>
  );
}
