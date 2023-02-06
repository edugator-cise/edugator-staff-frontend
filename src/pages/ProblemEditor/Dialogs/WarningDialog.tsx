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
import { useRouter } from "next/router";
import { Routes } from "constants/navigationRoutes";
import {
  closeWarningModal,
  requestDeleteProblem,
  requestDeleteProblemSuccess,
  requestDeleteProblemFailure,
  WarningTypes,
} from "../ProblemEditorContainer/problemEditorContainerSlice";
import { RootState } from "lib/store/store";
import apiClient from "lib/api/apiClient";

interface Props {}

export const WarningDialog = (props: Props) => {
  const showModal = useSelector(
    (state: RootState) => state.problemEditorContainer.showWarningModal
  );
  const warningType = useSelector(
    (state: RootState) => state.problemEditorContainer.warningType
  );

  const problemId = useSelector((state: RootState) => state.problemEditorContainer.problemId)
  const router = useRouter();
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
          onClick={async () => {
            if (warningType === WarningTypes.Delete) {
              try {
                await apiClient.delete(`/v1/admin/problem/${problemId}`);
                dispatch(requestDeleteProblemSuccess())
              } catch (e) {
                dispatch(requestDeleteProblemFailure(e));
              }
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
