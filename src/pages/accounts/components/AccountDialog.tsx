import React from "react";
import {
  Icon,
  Stack,
  Button,
  MenuItem,
  TextField,
  IconButton,
  Typography,
  TextFieldProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { /*useAppDispatch,*/ useAppSelector } from "../../../app/common/hooks";
import Dialog from "../../../shared/GenericDialog";
import { rolesEnum } from "../types";

const SpacedTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  margin: theme.spacing(1),
  maxWidth: "45%",
}));

interface AccountDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function AccountDialog({ open, handleClose }: AccountDialogProps) {
  //const dispatch = useAppDispatch();

  const account = useAppSelector(
    (state) => state.adminDashboard.selectedAccount
  );

  const [editMode, setEditMode] = React.useState<boolean>(false);

  const FooterButtons = [
    {
      label: "Close",
      onClick: () => handleClose(),
      color: "error",
    },
    {
      label: "Edit",
      onClick: () => setEditMode(true),
      variant: "contained",
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

  const getAccountDialogTitle = (editing: boolean) => {
    if (!editing) {
      return "Account Information: <Insert Name>";
    } else {
      return "Editing Account: <Insert Name>";
    }
  };

  const onCopyClick = () => {};

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      title={getAccountDialogTitle(editMode)}
      handleClose={handleClose}
      footerContent={!editMode ? FooterButtons : EditFooterButtons}
    >
      <Stack spacing={1} sx={{ display: "block" }}>
        {!editMode ? (
          <>
            {account?.phone || true ? (
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
            )}
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
          </>
        ) : (
          <Stack sx={{ display: "block" }}>
            <Typography>
              After editing the information, click save to send it to the
              database.
            </Typography>

            <SpacedTextField
              required
              label="Name"
              onChange={() => {}}
              helperText="Firstname and lastname"
            />
            <SpacedTextField
              required
              type="email" // maybe?
              label="Username"
              helperText="Usually an email"
              onChange={() => {}}
            />
            <SpacedTextField
              type="tel"
              label="Phone number (optional)"
              helperText="Contact information for this account"
              onChange={() => {}}
            />
            <SpacedTextField
              select
              label="Role"
              value={rolesEnum.TA}
              helperText="Permissions"
              required
              onChange={() => {}}
            >
              <MenuItem value={rolesEnum.TA}>{rolesEnum.TA}</MenuItem>
              <MenuItem value={rolesEnum.Professor}>
                {rolesEnum.Professor}
              </MenuItem>
            </SpacedTextField>
          </Stack>
        )}
      </Stack>
    </Dialog>
  );
}
