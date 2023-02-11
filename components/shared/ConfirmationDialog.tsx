//https://javascript.plainenglish.io/creating-a-confirm-dialog-in-react-and-material-ui-3d7aaea1d799

import {Button, Dialog, DialogActions, DialogTitle, DialogContent} from "@mui/material";
import React from "react";

const ConfirmDialog = (props: {
  title?: string;
  children?: any;
  open: boolean;
  setOpen: any;
  onConfirm: any;
}) => {
  const { title, children, open, setOpen, onConfirm } = props;
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => setOpen(false)}
          color="secondary"
        >
          No
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            onConfirm();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmDialog;
