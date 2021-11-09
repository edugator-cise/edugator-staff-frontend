import React from "react";
import { Stack, Button, Box, Divider } from "@mui/material";
import { AccountInfo, AdminActions } from ".";

interface IAccountView {
  setEditMode: (editing: boolean) => void;
}

export function AccountView({ setEditMode }: IAccountView) {
  return (
    <Stack spacing={2}>
      <AccountInfo />

      <Box>
        <Button variant="contained" onClick={() => setEditMode(true)}>
          Edit Account
        </Button>
      </Box>

      <Divider />

      <AdminActions />
    </Stack>
  );
}
