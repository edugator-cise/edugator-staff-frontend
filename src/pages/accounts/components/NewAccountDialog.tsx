import React from "react";
import { Grid, Chip, Typography, TextField, MenuItem } from "@mui/material";
//import { /*useAppDispatch*/ useAppSelector } from "../../../app/common/hooks";
import { INewAccount, rolesEnum } from "../types";
import Dialog from "../../../shared/GenericDialog";

// remember to refactor this file later

interface NewAccountDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function NewAccountDialog({ open, handleClose }: NewAccountDialogProps) {
  //const dispatch = useAppDispatch();

  const [newAccount, setNewAccount] = React.useState<INewAccount>({
    role: rolesEnum.TA,
    username: "",
    password: "",
  });

  const DialogTitle = (
    <>
      <Typography variant="button" fontSize="subtitle2" color="primary">
        Creating New Account
      </Typography>
      <Typography variant="h5" component="div" fontWeight="bold">
        {newAccount.name ? newAccount.name : "No name"}{" "}
        <Chip
          label={newAccount.role}
          color={newAccount.role === "Professor" ? "primary" : undefined}
        />
      </Typography>
    </>
  );

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
      title={DialogTitle}
      handleClose={handleClose}
      footerContent={FooterButtons}
    >
      <Grid container>
        <Typography>
          After filling the account information, click save to send it to the
          database.
        </Typography>

        <Grid item xs={12}>
          <TextField
            label="Name"
            required
            fullWidth
            margin="dense"
            value={newAccount.name}
            helperText="Firstname and lastname"
            onChange={(event) =>
              setNewAccount({ ...newAccount, name: event.target.value })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="email"
            label="Email"
            required
            fullWidth
            margin="dense"
            value={newAccount.username}
            helperText="Used as the username"
            onChange={(event) =>
              setNewAccount({ ...newAccount, username: event.target.value })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="password"
            label="Password"
            required
            fullWidth
            margin="dense"
            value={newAccount.password}
            helperText="Used as the username"
            onChange={(event) =>
              setNewAccount({ ...newAccount, password: event.target.value })
            }
          />
        </Grid>

        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={6}>
            <TextField
              type="tel"
              label="Phone number (optional)"
              margin="dense"
              value={newAccount.phone}
              helperText="Contact information for this account"
              onChange={(event) =>
                setNewAccount({ ...newAccount, phone: event.target.value })
              }
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              select
              label="Role"
              required
              fullWidth
              margin="dense"
              value={newAccount.role}
              helperText="Permissions"
              onChange={(event) =>
                setNewAccount({
                  ...newAccount,
                  role: event.target.value as rolesEnum,
                })
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
    </Dialog>
  );
}
