import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { Routes } from "constants/navigationRoutes";
import { useRouter } from "next/router"
import { useSelector } from "react-redux";
import { RootState } from "lib/store/store";
export const SuccessDialog = () => {
  const showSuccessModal = useSelector(
    (state: RootState) => state.contentEditorPage.showSuccessModal
  );
  const contentId = useSelector(
    (state: RootState) => state.contentEditorPage.contentId
  );
  const history = useRouter();
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
