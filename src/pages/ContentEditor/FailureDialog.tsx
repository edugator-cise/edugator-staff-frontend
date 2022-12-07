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
import { useAppSelector } from "../../app/common/hooks";
import { closeFailureModal } from "./contentEditorPageSlice";

interface Props {}

export const FailureDialog = (props: Props) => {
  const showFailureModal = useAppSelector(
    (state) => state.contentEditorPage.showFailureModal
  );

  const contentId = useAppSelector(
    (state) => state.contentEditorPage.contentId
  );
  const dispatch = useDispatch();

  return (
    <Dialog
      open={showFailureModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Failed to {contentId ? "update" : "add new"} lesson.
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Be sure to check all fields and ensure that they are valid.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => dispatch(closeFailureModal())}
          variant="contained"
          color="error"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};
