import React from "react";
import { Typography, Box, TextField, MenuItem } from "@mui/material";
import { useAppDispatch } from "../../../app/common/hooks";

enum Actions {
  noAction = "noAction",
  createTA = "createTA",
  createProfessor = "createProfessor",
  deleteAccount = "deleteAccount",
}

export function AdminActions() {
  const dispatch = useAppDispatch();

  const [selected, setSelected] = React.useState<Actions>(Actions.noAction);

  return (
    <>
      <Typography>Administrator Actions</Typography>
      <Box>
        <TextField
          select
          value={selected}
          helperText="Please select a role for this account"
          required
          onChange={(event) => setSelected(event.target.value as Actions)}
          fullWidth={false}
        >
          <MenuItem value={Actions.noAction}>Select Action</MenuItem>
          <MenuItem value={Actions.createTA}>Change Role to TA</MenuItem>
          <MenuItem value={Actions.createProfessor}>
            Change Role to Professor
          </MenuItem>
          <MenuItem value={Actions.deleteAccount}>Delete Account</MenuItem>
        </TextField>
      </Box>
    </>
  );
}
