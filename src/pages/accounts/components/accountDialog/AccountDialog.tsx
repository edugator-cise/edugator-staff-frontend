import React from "react";
import { styled } from "@mui/material/styles";
import {
  Icon,
  Grid,
  Chip,
  Stack,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../../app/common/hooks";
import { AccountEditForm, AccountInfo, AdminActions } from "../";
import Dialog from "../../../../shared/GenericDialog";

const TitleButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(3),
}));

interface AccountDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function AccountDialog({ open, handleClose }: AccountDialogProps) {
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const { selectedAccount } = useAppSelector((state) => state.accountManager);

  const handleDialogClose = () => {
    setEditMode(false);
    handleClose();
  };

  const FooterButtons = [
    {
      label: "Close",
      onClick: handleDialogClose,
      color: "inherit",
      variant: "outlined",
    },
  ];

  const EditFooterButtons = [
    {
      label: "Save",
      onClick: () => {},
      variant: "contained",
    },
  ];

  const DialogTitle = (
    <Grid container direction="row" justifyContent="space-between">
      <Grid item>
        <Typography variant="button" fontSize="subtitle2" color="primary">
          Account Information
        </Typography>

        <Typography variant="h5" component="div" fontWeight="bold">
          {selectedAccount?.name}{" "}
          <Chip
            label={selectedAccount?.role}
            color={
              selectedAccount?.role === "Professor" ? "primary" : undefined
            }
          />
        </Typography>
      </Grid>

      <Grid item>
        {!editMode ? (
          <TitleButton
            variant="outlined"
            onClick={() => setEditMode(true)}
            startIcon={<Icon>edit</Icon>}
          >
            Edit Account
          </TitleButton>
        ) : (
          <TitleButton
            color="error"
            variant="outlined"
            onClick={() => setEditMode(false)}
            startIcon={<Icon>edit</Icon>}
          >
            Cancel
          </TitleButton>
        )}
      </Grid>
    </Grid>
  );

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      handleClose={handleDialogClose}
      title={DialogTitle}
      footerContent={!editMode ? FooterButtons : EditFooterButtons}
    >
      <>
        {!editMode ? (
          <Stack spacing={2}>
            <AccountInfo />

            <Divider />

            <AdminActions />
          </Stack>
        ) : (
          <AccountEditForm />
        )}
      </>
    </Dialog>
  );
}
