import React from "react";
import { Icon, Button, IconButton, Typography } from "@mui/material";
import { /*useAppDispatch,*/ useAppSelector } from "../../../app/common/hooks";
import { IAccount } from "../types";

export function AccountInfo() {
  //const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.adminDashboard);

  // under the assumption that account always exists in this component
  const account = state.selectedAccount as IAccount;

  const onCopyClick = () => {};

  return (
    <div>
      {
        // always displaying a phone for demonstration purposes
        account?.phone || true ? (
          <>
            <Typography>Contact Information</Typography>
            <Button variant="outlined" fullWidth={false}>
              <Icon sx={{ mr: 1 }}>phone</Icon>
              111-111-1111
              <IconButton sx={{ ml: 3 }} onClick={onCopyClick}>
                <Icon>link</Icon>
              </IconButton>
            </Button>
          </>
        ) : (
          <></>
        )
      }
    </div>
  );
}
