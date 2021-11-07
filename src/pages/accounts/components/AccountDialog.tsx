import React from "react";
import { Stack } from "@mui/material";
import Dialog from "../../../shared/GenericDialog";
import { AccountInfo, AdminActions, AccountEditForm } from ".";

interface AccountDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function AccountDialog({ open, handleClose }: AccountDialogProps) {
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const FooterButtons = [
    {
      label: "Close",
      onClick: () => handleClose(),
      color: "error",
    },
    {
      label: "Edit",
      onClick: () => setEditMode(true),
      variant: "contained",
    },
  ];

  const EditFooterButtons = [
    {
      label: "Cancel",
      onClick: () => setEditMode(false),
      color: "error",
    },
    {
      label: "Edit Account Information",
      onClick: () => {},
      variant: "contained",
    },
  ];

  const getAccountDialogTitle = (editing: boolean) => {
    if (!editing) {
      return "Account Information: <Insert Name>";
    } else {
      return "Editing Account: <Insert Name>";
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth={!editMode ? "sm" : "xs"}
      fullWidth
      title={getAccountDialogTitle(editMode)}
      handleClose={handleClose}
      footerContent={!editMode ? FooterButtons : EditFooterButtons}
    >
      <>
        {!editMode ? (
          <Stack spacing={2}>
            <AccountInfo />

            <AdminActions />
          </Stack>
        ) : (
          <AccountEditForm />
        )}
      </>
    </Dialog>
  );
}
