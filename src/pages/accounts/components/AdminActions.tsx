import React from "react";
import { Typography, TextField, MenuItem } from "@mui/material";
import { useAppDispatch } from "../../../app/common/hooks";

export function AdminActions() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Typography>Administrator Actions</Typography>
      <TextField
        select
        label="Role"
        helperText="Please select a role for this account"
        required
        onChange={() => {}}
        fullWidth={false}
      >
        <MenuItem value="default">Select Action</MenuItem>
        <MenuItem value="1">Change Role to TA</MenuItem>
        <MenuItem value="2">Change Role to Professor</MenuItem>
        <MenuItem value="3">Delete Account</MenuItem>
      </TextField>
    </div>
  );
}
