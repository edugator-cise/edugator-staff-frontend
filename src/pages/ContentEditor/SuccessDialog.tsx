import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import { Routes } from "../../shared/Routes.constants";
import { useAppSelector } from "../../app/common/hooks";

interface Props {}

export const SuccessDialog = (props: Props) => {
  const showSuccessModal = useAppSelector(
    (state) => state.contentEditorPage.showSuccessModal
  );
  const contentId = useAppSelector(
    (state) => state.contentEditorPage.contentId
  );
  const history = useHistory();
  return (
    <Dialog open={showSuccessModal} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">
        Lesson {contentId ? "updated" : "added"} successfully!
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
