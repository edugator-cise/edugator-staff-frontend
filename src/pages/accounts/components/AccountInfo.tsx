import React from "react";
import { Stack, Icon, ButtonBase, IconButton, Typography } from "@mui/material";
import { /*useAppDispatch,*/ useAppSelector } from "../../../app/common/hooks";
import { IAccount } from "../types";

export function AccountInfo() {
  //const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.adminDashboard);

  // under the assumption that account always exists in this component
  const account = state.selectedAccount as IAccount;

  const onCopyClick = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <>
      <Typography>Contact Information</Typography>
      <Stack direction="row">
        <ButtonBase>
          <Icon sx={{ mr: 2 }}>email</Icon>
          {account?.username}
          <IconButton sx={{ ml: 2 }} onClick={onCopyClick}>
            <Icon>link</Icon>
          </IconButton>
        </ButtonBase>
        {
          // always displaying a phone for demonstration purposes
          (account?.phone || true) && (
            <>
              <ButtonBase>
                <Icon sx={{ mr: 2 }}>phone</Icon>
                111-111-1111
                <IconButton sx={{ ml: 2 }} onClick={onCopyClick}>
                  <Icon>link</Icon>
                </IconButton>
              </ButtonBase>
            </>
          )
        }
      </Stack>
    </>
  );
}
