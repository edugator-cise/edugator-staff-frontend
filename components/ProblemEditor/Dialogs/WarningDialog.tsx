import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes } from "constants/navigationRoutes";
import {
  closeWarningModal,
  requestDeleteProblem,
  WarningTypes,
} from "components/ProblemEditor/problemEditorContainerSlice";
import { RootState } from "lib/store/store";
import { useRouter } from "next/router";

export const WarningDialog = () => {
  const router = useRouter();
  const showModal = useSelector(
    (state: RootState) => state.problemEditorContainer.showWarningModal
  );
  const warningType = useSelector(
    (state: RootState) => state.problemEditorContainer.warningType
  );
  const dispatch = useDispatch();
  return (
    <Dialog
      open={showModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Are you sure you want to{" "}
        {warningType === WarningTypes.Delete ? "delete" : "leave"}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {warningType === WarningTypes.Delete
            ? "This action will be permanent."
            : "Leaving this page before submitting will mean losing your progress on this problem."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (warningType === WarningTypes.Delete) {
              dispatch(requestDeleteProblem());
            }
            router.push(Routes.Modules);
          }}
          variant="contained"
          color="error"
        >
          Yes
        </Button>
        <Button
          onClick={() => dispatch(closeWarningModal())}
          variant="contained"
          color="primary"
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
