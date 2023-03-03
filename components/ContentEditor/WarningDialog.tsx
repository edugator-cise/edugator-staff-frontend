import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Routes } from "constants/navigationRoutes";
import {
  closeWarningModal,
  WarningTypes,
} from "../../state/contentEditorPageSlice";
import { RootState } from "lib/store/store";
import apiClient from "lib/api/apiClient";
import toast from "react-hot-toast";
import { apiRoutes } from "constants/apiRoutes";

export const WarningDialog = () => {
  const dispatch = useDispatch();
  const history = useRouter();
  const showModal = useSelector(
    (state: RootState) => state.contentEditorPage.showWarningModal
  );
  const warningType = useSelector(
    (state: RootState) => state.contentEditorPage.warningType
  );
  const contentId = useSelector(
    (state: RootState) => state.contentEditorPage.contentId
  );

  const handleDeleteContentRequest = async () => {
    try {
      await apiClient.delete(apiRoutes.admin.deleteLesson(contentId as string));
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
            : "Leaving this page before submitting will mean losing your progress on this lesson."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (warningType === WarningTypes.Delete) {
              handleDeleteContentRequest();
            }
            history.push(Routes.Modules);
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
