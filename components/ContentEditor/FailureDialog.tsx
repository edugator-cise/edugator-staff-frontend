import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { RootState } from "lib/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeFailureModal } from "../../state/contentEditorPageSlice";

interface Props {}

export const FailureDialog = (props: Props) => {
  const showFailureModal = useSelector(
    (state: RootState) => state.contentEditorPage.showFailureModal
  );

  const contentId = useSelector(
    (state: RootState) => state.contentEditorPage.contentId
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
