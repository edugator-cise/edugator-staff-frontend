import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux"
import { Routes } from "constants/navigationRoutes";
import { RootState } from "lib/store/store";
import { useRouter } from "next/router";

export const SuccessDialog = () => {
  const showSuccessModal = useSelector(
    (state: RootState) => state.problemEditorContainer.showSuccessModal
  );
  const problemId = useSelector(
    (state: RootState) => state.problemEditorContainer.problemId
  );
  const router = useRouter();
  return (
    <Dialog open={showSuccessModal} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">
        Problem {problemId ? "updated" : "added"} successfully!
      </DialogTitle>
      <DialogActions>
        <Button
          onClick={() => router.push(Routes.Modules)}
          variant="contained"
          color="success"
        >
          Ok!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
