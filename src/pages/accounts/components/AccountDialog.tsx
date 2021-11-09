import React from "react";
import Dialog from "../../../shared/GenericDialog";
import { AccountEditForm, AccountView } from ".";

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
      handleClose={handleClose}
      title={getAccountDialogTitle(editMode)}
      footerContent={!editMode ? FooterButtons : EditFooterButtons}
    >
      <>
        {!editMode ? (
          <AccountView setEditMode={setEditMode} />
        ) : (
          <AccountEditForm />
        )}
      </>
    </Dialog>
  );
}
