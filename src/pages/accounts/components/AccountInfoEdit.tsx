import React from "react";
import { styled } from "@mui/material/styles";
import {
  Stack,
  Typography,
  TextField,
  MenuItem,
  TextFieldProps,
} from "@mui/material";
import { useAppDispatch } from "../../../app/common/hooks";
import { rolesEnum } from "../types";

export function AccountEditForm() {
  const dispatch = useAppDispatch();

  return (
    <Stack>
      <Typography>
        After editing the information, click save to send it to the database.
      </Typography>

      <TextField
        label="Name"
        required
        focused
        onChange={() => {}}
        helperText="Firstname and lastname"
        margin="normal"
      />

      <TextField
        type="email" // maybe?
        label="Email"
        required
        focused
        onChange={() => {}}
        helperText="Used as the username"
        margin="normal"
      />

      <TextField
        type="tel"
        label="Phone number (optional)"
        focused
        onChange={() => {}}
        helperText="Contact information for this account"
        margin="normal"
      />

      <TextField
        select
        label="Role"
        required
        focused
        value={rolesEnum.TA}
        onChange={() => {}}
        helperText="Permissions"
        margin="normal"
      >
        <MenuItem value={rolesEnum.TA}>{rolesEnum.TA}</MenuItem>
        <MenuItem value={rolesEnum.Professor}>{rolesEnum.Professor}</MenuItem>
      </TextField>
    </Stack>
  );
}
