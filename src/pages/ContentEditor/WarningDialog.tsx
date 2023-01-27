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
import { useAppSelector } from "../../../lib/store/hooks";
import { Routes } from "constants/navigationRoutes";
import {
  closeWarningModal,
  requestDeleteContent,
  WarningTypes,
} from "./contentEditorPageSlice";

interface Props {}

export const WarningDialog = (props: Props) => {
  const history = useHistory();
  const showModal = useAppSelector(
    (state) => state.contentEditorPage.showWarningModal
  );
  const warningType = useAppSelector(
    (state) => state.contentEditorPage.warningType
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
            : "Leaving this page before submitting will mean losing your progress on this lesson."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (warningType === WarningTypes.Delete) {
              dispatch(requestDeleteContent());
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
