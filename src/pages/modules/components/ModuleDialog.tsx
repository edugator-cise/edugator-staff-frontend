import React from "react";
import {
  Button,
  TextField,
  TextFieldProps,
  DialogTitle,
  Dialog,
  Paper,
  Divider,
  DialogContentText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DialogStatus } from "../types";
import { useAppDispatch, useAppSelector } from "../../../app/common/hooks";
import {
  requestNewModule,
  requestModifyModule,
  closeDialog,
} from "../ModulesPage.slice";
import { IModuleBase } from "../../../shared/types";

const Form = styled("form")({
  display: "block",
});

const NumberField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  width: "12%",
  margin: theme.spacing(1),
  marginLeft: theme.spacing(3),
}));

const NameTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  margin: theme.spacing(1),
  maxWidth: "70%",
}));

const DialogContent = styled(DialogContentText)(({ theme }) => ({
  margin: theme.spacing(1),
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
}));

const AddButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Footer = styled("div")({
  float: "right",
});

const newModule: IModuleBase = { name: "", number: 0 };

const dialogTitle = (status: DialogStatus) => {
  if (status === DialogStatus.CREATE) {
    return "Creating a new module";
  } else if (status === DialogStatus.EDIT) {
    return "Editing an existing module";
  } else {
    return "Closing this dialog";
  }
};

export function ModuleDialog() {
  const dispatch = useAppDispatch();
  const { open, action, module } = useAppSelector(
    (state) => state.modules.dialogState
  );

  const [dialogInput, setDialogInput] = React.useState<IModuleBase>(newModule);

  React.useEffect(() => {
    // when the dialog loads,
    // update the input fields
    // to have the values of the values of the dialog to be edited
    if (action === DialogStatus.EDIT) {
      setDialogInput(module);
    } else {
      setDialogInput(newModule);
    }
  }, [action, module]);

  const handleDialogSubmit = () => {
    if (action === DialogStatus.CREATE) {
      dispatch(requestNewModule(dialogInput));
    } else if (action === DialogStatus.EDIT) {
      dispatch(requestModifyModule(dialogInput));
    }

    // TODO:
    //  dont close before checking
    //  if action was successful
    dispatch(closeDialog());
    // make sure feedback is visible
    // when the dialog is open
  };

  return (
    <Dialog
      onClose={() => dispatch(closeDialog())}
      open={open}
      maxWidth="sm"
      fullWidth
    >
      <Paper elevation={3}>
        <DialogTitle id="module-title-dialog">
          {dialogTitle(action)}
        </DialogTitle>
        <Divider />

        <DialogContent>
          To add a new module, or to modify a module's name and number, please
          use the form below.
        </DialogContent>

        <Form>
          <NumberField
            label="Number"
            variant="filled"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            onChange={(event) => {
              setDialogInput({
                ...dialogInput,
                number: parseInt(event.target.value),
              });
            }}
            defaultValue={
              action === DialogStatus.EDIT ? module.number : undefined
            }
            fullWidth
            required
            focused
          />
          <NameTextField
            label="Module Name"
            variant="filled"
            onChange={(event) => {
              setDialogInput({
                ...dialogInput,
                name: event.target.value,
              });
            }}
            defaultValue={
              action === DialogStatus.EDIT ? module.name : undefined
            }
            fullWidth
            required
            focused
          />

          <Footer>
            <AddButton
              onClick={(event) => {
                // disables html5 validation & refresh
                // TODO search how to keep validation
                event.preventDefault();
                // handle submit
                handleDialogSubmit();
              }}
              variant="outlined"
              type="submit"
            >
              {action === DialogStatus.CREATE ? "Add Module" : "Edit Module"}
            </AddButton>
          </Footer>
        </Form>
      </Paper>
    </Dialog>
  );
}
