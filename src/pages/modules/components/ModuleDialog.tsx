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
import { IModuleBase } from "../../../shared/types";
import { DialogStatus } from "../types";
import { useAppDispatch, useAppSelector } from "../../../app/common/hooks";
import { requestNewModule, closeDialog } from "../ModulesPage.slice";

const Form = styled("form")({
  display: "flex",
});

const NumberField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  minWidth: "11%",
  maxWidth: "13%",
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
  // for the module information on the dialog
  const [moduleInput, setModuleInput] = React.useState<IModuleBase>({
    name: "",
    number: 0,
  });

  const dispatch = useAppDispatch();
  const { open, action, module } = useAppSelector(
    (state) => state.modules.dialogState
  );

  const handleDialogSubmit = () => {
    if (action === DialogStatus.CREATE) {
      dispatch(requestNewModule(moduleInput));
    } else if (action === DialogStatus.EDIT) {
      // dispatch rename module
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
              setModuleInput({
                ...moduleInput,
                number: parseInt(event.target.value),
              });
            }}
            // TODO
            // needs to not be set when adding a new module
            defaultValue={module.number}
            fullWidth
            required
            focused
          />
          <NameTextField
            label="Module Name"
            variant="filled"
            onChange={(event) => {
              setModuleInput({
                ...moduleInput,
                name: event.target.value,
              });
            }}
            defaultValue={module.name}
            fullWidth
            required
            focused
          />

          <Footer>
            <AddButton
              onClick={() => handleDialogSubmit()}
              variant="outlined"
              type="submit"
            >
              Add module
            </AddButton>
          </Footer>
        </Form>
      </Paper>
    </Dialog>
  );
}
