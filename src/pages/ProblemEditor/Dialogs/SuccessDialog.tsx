import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { useAppSelector } from "../../../app/common/hooks";
import { Routes } from "../../../shared/Routes.constants";

interface Props {}

export const SuccessDialog = (props: Props) => {
  const showSuccessModal = useAppSelector(
    (state) => state.problemEditorContainer.showSuccessModal
  );
  const problemId = useAppSelector(
    (state) => state.problemEditorContainer.problemId
  );
  const history = useHistory();
  return (
    <Dialog open={showSuccessModal} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">
        Problem {problemId ? "updated" : "added"} successfully!
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => history.push(Routes.Modules)}
          variant="contained"
          color="success"
        >
          Ok!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
