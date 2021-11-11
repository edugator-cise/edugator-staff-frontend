import React from "react";
import { TextField, Typography, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DialogStatus, EmptyModule } from "../types";
import { useAppDispatch, useAppSelector } from "../../../app/common/hooks";
import {
  requestNewModule,
  requestModifyModule,
  closeDialog,
} from "../ModulesPage.slice";
import { IModuleBase } from "../../../shared/types";
import Dialog from "../../../shared/GenericDialog";

const NumberField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: "18%",
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

const NameTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  maxWidth: "70%",
  marginTop: theme.spacing(2),
}));

function isBlank(str: string) {
  return !str || /^\s*$/.test(str);
}
export function ModuleDialog() {
  const dispatch = useAppDispatch();
  const { open, action, module } = useAppSelector(
    (state) => state.modules.dialogState
  );

  const [numError, setNumError] = React.useState<boolean>(false);
  const [nameError, setNameError] = React.useState<boolean>(false);

  const [dialogInput, setDialogInput] =
    React.useState<IModuleBase>(EmptyModule);

  React.useEffect(() => {
    if (action === DialogStatus.EDIT) {
      setDialogInput(module);
    } else {
      setDialogInput(EmptyModule);
    }
  }, [action, module]);

  const handleDialogSubmit = () => {
    if (
      numError ||
      nameError ||
      isBlank(dialogInput.name) ||
      isNaN(dialogInput.number)
    ) {
      return;
    }
    if (action === DialogStatus.CREATE) {
      dispatch(requestNewModule(dialogInput));
    } else if (action === DialogStatus.EDIT) {
      dispatch(requestModifyModule(dialogInput));
    }
  };

  const FooterButtons = [
    {
      label: "Cancel",
      onClick: () => dispatch(closeDialog()),
      variant: "contained",
      color: "error",
    },
    {
      label: action === DialogStatus.CREATE ? "Add Module" : "Edit Module",
      onClick: () => handleDialogSubmit(),
      variant: "contained",
    },
  ];

  const DialogTitle = (status: DialogStatus) => {
    if (status === DialogStatus.CREATE) {
      let display = {
        number: dialogInput.number !== -1 ? dialogInput.number : "",
        name: dialogInput.name ? dialogInput.name : "",
      };

      let newModuleTitle: string;

      if (display.name && display.number) {
        newModuleTitle = `Module ${display.number} - ${display.name}`;
      } else {
        newModuleTitle = "New Module";
      }

      return (
        <>
          <Typography variant="button" fontSize="subtitle2" color="primary">
            Creating a new module
          </Typography>

          <Typography variant="h5" component="div" fontWeight="bold">
            {newModuleTitle}
          </Typography>
        </>
      );
    } else if (status === DialogStatus.EDIT) {
      return (
        <>
          <Typography variant="button" fontSize="subtitle2" color="primary">
            Editing an existing module
          </Typography>

          <Typography variant="h5" component="div" fontWeight="bold">
            {`Module ${module.number} - ${module.name}`}
          </Typography>
        </>
      );
    } else {
      return (
        <Typography variant="h5" component="div" fontWeight="bold">
          Closing this dialog
        </Typography>
      );
    }
  };

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      title={DialogTitle(action)}
      handleClose={() => dispatch(closeDialog())}
      footerContent={FooterButtons}
    >
      <>
        <Typography>
          To add a new module, or to modify a module's name and number, please
          use the form below.
        </Typography>

        <NumberField
          error={numError}
          label="Number"
          id="standard-error-helper-text"
          variant="filled"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(event) => {
            const num = parseInt(event.target.value);
            setDialogInput({
              ...dialogInput,
              number: num,
            });
            if (isNaN(num) || num < 0 || num > 1000000) setNumError(true);
            else setNumError(false);
          }}
          defaultValue={
            action === DialogStatus.EDIT ? module.number : undefined
          }
          fullWidth
          required
          focused
        />

        <NameTextField
          error={nameError}
          label="Module Name"
          id="standard-error-helper-text"
          variant="filled"
          onChange={(event) => {
            setDialogInput({
              ...dialogInput,
              name: event.target.value,
            });
            if (isBlank(event.target.value)) setNameError(true);
            else setNameError(false);
          }}
          defaultValue={action === DialogStatus.EDIT ? module.name : undefined}
          fullWidth
          required
          focused
        />
      </>
    </Dialog>
  );
}
