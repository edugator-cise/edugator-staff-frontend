import { useState, useRef, useEffect } from "react";
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
import { requestModifyAccountEnd } from "state/AdminAccountsPage.slice";
import { AccountEditForm } from "./AccountInfoEdit";
import { AccountInfo } from "./AccountInfo";
import { AdminActions } from "./AdminActions";
import Dialog from "components/shared/GenericDialog";
import { IAccount, rolesEnum } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import apiClient from "lib/api/apiClient";
import { apiRoutes } from "constants/apiRoutes";
import toast from "react-hot-toast";

const TitleButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(3),
}));

interface AccountDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function AccountDialog({ open, handleClose }: AccountDialogProps) {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState<boolean>(false);

  const { selectedAccount } = useSelector(
    (state: RootState) => state.accountManager
  );

  // https://www.letmegooglethat.com/?q=js+%3F%3F+operator
  const unedited: IAccount = {
    role: selectedAccount?.role ?? rolesEnum.TA,
    username: selectedAccount?.username ?? "",
    name: selectedAccount?.name ?? "",
    ...selectedAccount,
  };

  // for edit mode dialog
  const [edited, setEdited] = useState<IAccount>(unedited);

  // username & name validation
  const [nameError, setNameError] = useState<boolean>(false);

  // email textfiel ref & validation
  const emailInputRef = useRef<HTMLInputElement>(null);
  const validEmail = emailInputRef.current?.validity.valid;

  // to keep dialog updated
  useEffect(() => {
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

  const handleModifyAccountRequest = async (payload: IAccount) => {
    const body: IAccount = {
      name: payload.name,
      role: payload.role,
      username: payload.username,
      _id: payload._id,
    };
    try {
      const { data }: { data: IAccount } = await apiClient.put(
        apiRoutes.admin.updateUser,
        body
      );
      dispatch(requestModifyAccountEnd(data));
      toast.success("User is modified");
    } catch (e) {
      toast.error("User failed to update");
    }
  };

  const handleEditSubmit = (edited: IAccount) => {
    if (!nameError && validEmail) {
      handleModifyAccountRequest(edited);
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
