import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../../app/common/hooks";
import { closeWarningModal } from "../ProblemEditorContainer/problemEditorContainerSlice";

interface Props {}

export const WarningDialog = (props: Props) => {
  const history = useHistory();
  const showModal = useAppSelector(
    (state) => state.problemEditorContainer.showWarningModal
  );
  const dispatch = useDispatch();
  return (
    <Dialog
      open={showModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to leave?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Leaving this page before submitting will mean losing your progress on
          this problem.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => history.push("/admin/modules")}
          variant="contained"
          color="error"
        >
          Leave
        </Button>
        <Button
          onClick={() => dispatch(closeWarningModal())}
          variant="contained"
          color="primary"
        >
          Stay
        </Button>
      </DialogActions>
    </Dialog>
  );
};
