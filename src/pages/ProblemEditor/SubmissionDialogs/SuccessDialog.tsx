import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { useAppSelector } from "../../../app/common/hooks";

interface Props {}

export const SuccessDialog = (props: Props) => {
  const showSuccessModal = useAppSelector(
    (state) => state.problemEditorContainer.showSuccessModal
  );
  const history = useHistory();
  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Problem added successfully!
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => history.push("/modules")}
          variant="contained"
          color="success"
        >
          Ok!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
