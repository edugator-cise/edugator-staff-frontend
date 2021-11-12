import React from "react";
import {
  Grid,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { /*useAppDispatch*/ useAppSelector } from "../../../app/common/hooks";
import { IAccount, rolesEnum } from "../types";

export function AccountEditForm() {
  //const dispatch = useAppDispatch();

  const { selectedAccount } = useAppSelector((state) => state.accountManager);

  const [edited, setEdited] = React.useState<IAccount>({
    role: selectedAccount?.role ?? rolesEnum.TA,
    username: selectedAccount?.username ?? "",
    name: selectedAccount?.name,
    phone: selectedAccount?.phone,
  });

  return (
    <Grid container>
      <Typography>
        After editing the information, click save to send it to the database.
      </Typography>

      <Grid item xs={12}>
        <TextField
          label="Name"
          required
          fullWidth
          margin="normal"
          value={edited.name}
          helperText="Firstname and lastname"
          onChange={(event) =>
            setEdited({ ...edited, name: event.target.value })
          }
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          type="email"
          label="Email"
          required
          fullWidth
          margin="normal"
          value={edited.username}
          helperText="Used as the username"
          onChange={(event) =>
            setEdited({ ...edited, username: event.target.value })
          }
        />
      </Grid>

      <Grid container direction="row" justifyContent="space-between">
        <Grid item xs={6}>
          <TextField
            type="tel"
            label="Phone number (optional)"
            margin="normal"
            value={edited.phone}
            helperText="Contact information for this account"
            onChange={(event) =>
              setEdited({ ...edited, phone: event.target.value })
            }
          />
        </Grid>

        <Grid item xs={5}>
          <TextField
            select
            label="Role"
            required
            fullWidth
            margin="normal"
            value={edited.role}
            helperText="Permissions"
            onChange={(event) =>
              setEdited({ ...edited, role: event.target.value as rolesEnum })
            }
          >
            <MenuItem value={rolesEnum.TA}>{rolesEnum.TA}</MenuItem>
            <MenuItem value={rolesEnum.Professor}>
              {rolesEnum.Professor}
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
    </Grid>
  );
}
