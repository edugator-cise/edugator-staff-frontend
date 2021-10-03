import * as React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/common/hooks";
import { ModulesAlertEnum, AlertMsg } from "../config";
import { resetLatestAction } from "../ModulesPage.slice";

export function ModulesSnackbar() {
  const dispatch = useAppDispatch();
  const modulesState = useAppSelector((state) => state.modules);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(resetLatestAction());
  };

  return (
    <>
      {/** TODO: smarter way to make snackbar appear */}
      <Snackbar
        open={
          modulesState.latestAction === ModulesAlertEnum.requestModulesSuccess
        }
        autoHideDuration={4000}
        onClose={handleClose} // called after 6000 ms = 6 seconds
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          {AlertMsg[ModulesAlertEnum.requestModulesSuccess]}
        </Alert>
      </Snackbar>
      <Snackbar
        open={
          modulesState.latestAction === ModulesAlertEnum.requestNewModuleFailure
        }
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
          {AlertMsg[ModulesAlertEnum.requestNewModuleFailure]}
        </Alert>
      </Snackbar>
    </>
  );
}
