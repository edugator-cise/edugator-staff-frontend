import * as React from "react";
import { styled } from "@mui/material/styles";
import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/common/hooks";
import { closeAlert } from "../AdminAccountsPage.slice";

const ManagerAlert = styled(Alert)({
  textAlign: "left",
});

export function AccountSnackbar() {
  const dispatch = useAppDispatch();
  const feedback = useAppSelector((state) => state.accountManager.feedback);

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
      onClose={handleClose}
    >
      <ManagerAlert
        variant="filled"
        severity={feedback.type}
        sx={{ width: "100%" }}
        onClose={handleClose}
      >
        {feedback.title && <AlertTitle>{feedback.title}</AlertTitle>}
        {feedback.message}
      </ManagerAlert>
    </Snackbar>
  );
}
