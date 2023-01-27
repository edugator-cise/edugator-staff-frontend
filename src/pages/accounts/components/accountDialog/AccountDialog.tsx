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
import { useAppSelector, useAppDispatch } from "../../../../../lib/store/hooks";
import { requestModifyAccount } from "../../AdminAccountsPage.slice";
import { AccountEditForm, AccountInfo, AdminActions } from "../";
import Dialog from "../../../../shared/GenericDialog";
import { IAccount, rolesEnum } from "../../types";

const TitleButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(3),
}));

interface AccountDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function AccountDialog({ open, handleClose }: AccountDialogProps) {
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = React.useState<boolean>(false);

  const { selectedAccount } = useAppSelector((state) => state.accountManager);

  // https://www.letmegooglethat.com/?q=js+%3F%3F+operator
  const unedited: IAccount = {
    role: selectedAccount?.role ?? rolesEnum.TA,
    username: selectedAccount?.username ?? "",
    name: selectedAccount?.name ?? "",
    ...selectedAccount,
  };

  // for edit mode dialog
  const [edited, setEdited] = React.useState<IAccount>(unedited);

  // username & name validation
  const [nameError, setNameError] = React.useState<boolean>(false);

  // email textfiel ref & validation
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const validEmail = emailInputRef.current?.validity.valid;

  // to keep dialog updated
  React.useEffect(() => {
    if (selectedAccount) {
      setEdited(selectedAccount as IAccount);
    }
  }, [selectedAccount, editMode]);

  const handleEdit = (property: string, newValue: string) => {
    if (property === "username") {
      setEdited({ ...edited, username: newValue });
    } else if (property === "name") {
      setEdited({ ...edited, name: newValue });
    } else if (property === "role") {
      setEdited({ ...edited, role: newValue as rolesEnum });
    } else if (property === "phone") {
      setEdited({ ...edited, phone: newValue });
    }
  };

  const handleEditSubmit = (edited: IAccount) => {
    if (!nameError && validEmail) {
      dispatch(requestModifyAccount(edited));
      setEditMode(false);
    }
  };

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
      onClick: () => handleEditSubmit(edited),
      variant: "contained",
      disabled: edited === selectedAccount,
    },
  ];

  const DialogTitle = (
    <Grid container direction="row" justifyContent="space-between">
      <Grid item>
        <Typography variant="button" fontSize="subtitle2" color="primary">
          Account Information
        </Typography>

        <Typography variant="h5" component="div" fontWeight="bold">
          {edited.name}{" "}
          <Chip
            label={edited.role}
            color={edited.role === "Professor" ? "primary" : undefined}
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
          <AccountEditForm
            handleEdit={handleEdit}
            emailInputRef={emailInputRef}
            nameError={nameError}
            setNameError={setNameError}
            validEmail={Boolean(validEmail)}
          />
        )}
      </>
    </Dialog>
  );
}
