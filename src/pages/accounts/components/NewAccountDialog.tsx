import React from "react";
//import { styled } from "@mui/material/styles";
//import { useAppDispatch } from "../../../app/common/hooks";
import Dialog from "../../../shared/GenericDialog";

interface NewAccountDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function NewAccountDialog({ open, handleClose }: NewAccountDialogProps) {
  //const dispatch = useAppDispatch();

  const FooterButtons = [
    {
      label: "Cancel",
      onClick: () => handleClose(),
      color: "error",
    },
    {
      label: "Add New Account",
      onClick: () => {},
      variant: "contained",
    },
  ];

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      title="Creating new Account"
      handleClose={handleClose}
      footerContent={FooterButtons}
    >
      <>Account Information</>
    </Dialog>
  );
}
