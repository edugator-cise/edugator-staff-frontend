import React from "react";
import { useAppSelector } from "../../../app/common/hooks";
import Dialog from "../../../shared/GenericDialog";
import { AccountEditForm, AccountView } from ".";
import { Chip, Typography } from "@mui/material";

interface AccountDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function AccountDialog({ open, handleClose }: AccountDialogProps) {
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const { selectedAccount } = useAppSelector((state) => state.accountManager);

  const FooterButtons = [
    {
      label: "Close",
      onClick: () => handleClose(),
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

  const DialogTitle = (
    <>
      <Typography variant="button" fontSize="subtitle2" color="primary">
        Account Information
      </Typography>
      <Typography variant="h5" component="div" fontWeight="bold">
        {selectedAccount?.name ?? "undefined"}{" "}
        <Chip
          label={selectedAccount?.role}
          color={selectedAccount?.role === "Professor" ? "primary" : undefined}
        />
      </Typography>
    </>
  );

  return (
    <Dialog
      open={open}
      maxWidth={!editMode ? "sm" : "xs"}
      fullWidth
      handleClose={handleClose}
      title={DialogTitle}
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
