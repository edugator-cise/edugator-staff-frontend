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
} from "state/problemEditorContainerSlice";
import { RootState } from "lib/store/store";
import { useRouter } from "next/router";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";
import { toast } from "react-hot-toast";

export const WarningDialog = () => {
  const router = useRouter();
  const showModal = useSelector(
    (state: RootState) => state.problemEditorContainer.showWarningModal
  );
  const warningType = useSelector(
    (state: RootState) => state.problemEditorContainer.warningType
  );
  const problemId = useSelector(
    (state: RootState) => state.problemEditorContainer.problemId
  );
  const dispatch = useDispatch();

  const handleDeleteProblemRequest = async () => {
    try {
      await apiClient.delete(
        apiRoutes.admin.deleteProblem(problemId as string)
      );
      toast.success("Content successfully deleted");
    } catch (e) {
      toast.error("Content failed to delete");
    }
  };
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
              handleDeleteProblemRequest();
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
