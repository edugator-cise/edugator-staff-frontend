import { MenuItem, TextField, Typography } from "@mui/material";
import React from "react";
//import { styled } from "@mui/material/styles";
//import { useAppDispatch } from "../../../app/common/hooks";
import Dialog from "../../../shared/GenericDialog";
import { rolesEnum } from "../types";

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
      title="Creating new Admin Account"
      handleClose={handleClose}
      footerContent={FooterButtons}
    >
      <>
        <Typography>
          After you enter the information of the new account, click save to send
          it to the database.
        </Typography>

        <TextField
          required
          margin="normal"
          label="Name"
          onChange={() => {}}
          helperText=""
        />

        <TextField
          required
          type="email" // maybe?
          margin="normal"
          label="Username"
          helperText="Usually an email"
          onChange={() => {}}
        />

        <TextField
          margin="normal"
          type="password"
          required
          label="Password"
          onChange={() => {}}
        />

        <TextField
          type="tel"
          margin="normal"
          label="Phone number (optional)"
          helperText="Contact information for this account"
          onChange={() => {}}
        />

        <TextField
          select
          margin="normal"
          label="Role"
          helperText="Please select a role for this account"
          required
          onChange={() => {}}
        >
          <MenuItem value={rolesEnum.TA}>{rolesEnum.TA}</MenuItem>
          <MenuItem value={rolesEnum.Professor}>{rolesEnum.Professor}</MenuItem>
        </TextField>
      </>
    </Dialog>
  );
}
